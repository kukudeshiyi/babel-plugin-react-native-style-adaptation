import test from 'babel-plugin-tester';
import plugin, { PLUGIN_NAME } from '../../../packages/core/src/index';
import allProperties from '../../../packages/core/src/properties';
import path from 'path';

test({
  plugin,
  pluginOptions: {
    configs: [
      {
        properties: allProperties,
        module: 'scaleSize',
        source: 'react-native-style-adaptation-runtime',
      },
    ],
  },
  pluginName: PLUGIN_NAME,
  tests: [
    // base
    {
      fixture: path.join(__dirname, './node_modules_for_test/code.ts'),
      output: `
          export const styles = {
            margin: 10,
            padding: 20,
            fontSize: 30,
          };
        `,
    },
  ],
});
