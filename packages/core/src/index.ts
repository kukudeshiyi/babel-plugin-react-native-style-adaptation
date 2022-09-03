import { PluginObj } from '@babel/core';
import { NodePath } from '@babel/core';
import * as t from '@babel/types';
export { distance, font } from './properties';

export const PLUGIN_NAME = 'babel-plugin-react-native-style-adaptation';
const validateStatus = Symbol(PLUGIN_NAME);

interface Config {
  properties: string[];
  module: string;
  source: string;
}

interface State {
  [validateStatus]: boolean;
  opts: { configs: Config[] };
}

export default (): PluginObj<State> => {
  return {
    name: PLUGIN_NAME,
    pre() {
      this[validateStatus] = validate(this.opts?.configs || []);
    },
    visitor: {
      ObjectProperty(path, state) {
        normalTransform(path, state);
      },
    },
  };
};

function normalTransform(path: NodePath<t.ObjectProperty>, state: State) {
  if (!state[validateStatus] || !t.isIdentifier(path.node.key)) {
    return;
  }

  const configs = state.opts.configs;
  const propertyName = path.node.key.name || '';
  const config = configs.find((config) => config.properties.includes(propertyName));
  if (!config) {
    return;
  }

  const propertyValue = path.node.value;
  if (!t.isStringLiteral(propertyValue) && !t.isNumericLiteral(propertyValue)) {
    return;
  }

  const module = config.module;
  const source = config.source;

  const node = addAdaptation(propertyValue.value, module);
  path.node.value = node;
  injectImportExpression(path, module, source);
}

function injectImportExpression(
  currentPath: NodePath<t.ObjectProperty>,
  module: Config['module'],
  source: Config['source'],
) {
  const programPath = currentPath.findParent((parentNode) => t.isProgram(parentNode));

  if (!programPath) {
    return;
  }

  const find = (callback: (path: NodePath<t.Node>) => boolean) =>
    programPath.get('body').find(callback);
  const firstImportNodePath = find((nodePath) => t.isImportDeclaration(nodePath.node));

  if (!firstImportNodePath && isProgramNode(programPath.node)) {
    return programPath.node.body.unshift(createImportDeclarationNode(module, source));
  }

  // TODO：如果代码中存在 module 相同，但是 source 不同的模块，则不会再引入对应 source 的模块，而是使用现有模块

  const matchedLibraryPath = find(
    (nodePath) => t.isImportDeclaration(nodePath.node) && nodePath.node.source.value === source,
  );

  if (!matchedLibraryPath && firstImportNodePath) {
    return firstImportNodePath.replaceWithMultiple([
      firstImportNodePath.node,
      createImportDeclarationNode(module, source),
    ]);
  }

  if (matchedLibraryPath && isImportDeclarationNode(matchedLibraryPath.node)) {
    const importNode = matchedLibraryPath.node;
    if (!importNode.specifiers) {
      // TODO: error
      return;
    }

    const isModuleExist = importNode.specifiers.find((v) => v.local.name === module);
    if (isModuleExist) {
      return;
    }

    importNode.specifiers.push(t.importSpecifier(t.identifier(module), t.identifier(module)));
  }
}

function validate(configs: Config[]) {
  if (!Array.isArray(configs) || configs.length <= 0) {
    //TODO: error
    console.log('error', 1);
    return false;
  }
  for (const config of configs) {
    const { properties, module, source } = config;
    if (!Array.isArray(properties) || properties.length <= 0) {
      //TODO: error
      console.log('error', 2);
      return false;
    }
    if (typeof module !== 'string') {
      //TODO: error
      console.log('error', 3);
      return false;
    }
    if (typeof source !== 'string') {
      //TODO: error
      console.log('error', 4);
      return false;
    }
  }
  return true;
}

function addAdaptation(value: string | number, module: Config['module']) {
  return t.callExpression(t.identifier(module), [
    isString(value) ? t.stringLiteral(value) : t.numericLiteral(value),
  ]);
}

function createImportDeclarationNode(module: Config['module'], source: Config['source']) {
  return t.importDeclaration(
    [t.importSpecifier(t.identifier(module), t.identifier(module))],
    t.stringLiteral(source),
  );
}

function isString(value: any): value is string {
  return typeof value === 'string';
}

function isProgramNode(node: any): node is t.Program {
  return t.isProgram(node);
}

function isImportDeclarationNode(node: any): node is t.ImportDeclaration {
  return t.isImportDeclaration(node);
}
