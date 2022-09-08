# babel-plugin-react-native-style-adaptation

Add device-appropriate handlers to stylesheets so you don't have to manually add them during development

Before using this plugin, you must need to write the stylesheet like this:

```ts
const styles = StyleSheet.create({
  container: {
    margin: scaleSize(10),
    padding: scaleSize(5),
  },
  text: {
    fontSize: scaleSize(16),
  },
});
```

After using the plugin in your project, you don't need to write **scaleSize**：

```ts
const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 5,
  },
  text: {
    fontSize: 16,
  },
});
```

## Install

```sh
npm i babel-plugin-react-native-style-adaptation --save-dev
```

## How to use

### example:

```ts
// bable.config.js
import { properties State } from 'babel-plugin-react-native-style-adaptation';
module.exports = {
  plugins: [
    [
      'react-native-style-adaptation',
      {
        configs: [
          {
            properties: properties.distance,
            module: 'scaleSize',
            source: 'react-native-style-adaptation-runtime',
          },
          {
            properties: properties.font,
            module: 'scaleFont',
            source: 'otherModule', // This is just an example, to be configured as a real repository
          },
        ],
        ignore: (filename: string, state: State) => {
          // This way the file path contains "test" characters will not be processed by the plugin
          return filename.includes('test');
        },
      },
    ],
  ],
};
```

### configure

As in the example above, you need to configure the plugin in babel's configuration file. For more detailed configuration methods, please refer to the [official babel documentation](https://babeljs.io/docs/en/config-files).

The plugin provides two configuration items, as shown in the following table:

|  name  |                             type                              |                               default                                |
| :----: | :-----------------------------------------------------------: | :------------------------------------------------------------------: |
| config | Array<{ properties: string[];module: string;source: string;}> |                                 null                                 |
| ignore |       ignore(filename: string, state: State): boolean;        | (filename: string, state: State) => filename.include('node_modules') |

### configuration item - config

Configuration requires some Stylesheet properties for adaptation processing

|    name    |   type   |
| :--------: | :------: |
| properties | string[] |
|   module   |  string  |
|   source   |  string  |

#### properties

The StyleSheet properties that need to be processed, we have built-in collections of properties that you can import and use as in the example above.

```ts
// built-in properties
export const width = ['width', 'maxWidth', 'minWidth'];

export const height = ['height', 'maxHeight', 'minHeight'];

export const border = [
  'borderWidth',
  'borderTopWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderRightWidth',
  'borderStartWidth',
  'borderEndWidth',
];

export const position = ['top', 'bottom', 'left', 'right', 'start', 'end'];

export const margin = [
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginStart',
  'marginEnd',
  'marginHorizontal',
  'marginVertical',
];

export const padding = [
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingStart',
  'paddingEnd',
  'paddingHorizontal',
  'paddingVertical',
];

export const font = ['fontSize'];

export const distance = [...width, ...height, ...border, ...position, ...margin, ...padding];

export default [...distance, ...font];
```

#### module

Runtime handler function name for handling style adaptation.We provide a default adaptation function, but in another npm package, it needs to be installed and used.

```sh
npm i react-native-style-adaptation-runtime --save-dev
```

After installation, follow the above example to configure.During the processing of the plugin, the configuration module will be automatically imported, so make sure that the module actually exists.

According to the above configuration example, the plugin will process the code as follows:

```ts
// Before processing
const styles = StyleSheet.create({
  margin: 10,
  padding: 20,
  fontSize: 30,
});
```

```ts
// After processing
import { scaleSize } from 'react-native-style-adaptation-runtime';
import { scaleFont } from 'otherModule';
const styles = StyleSheet.create({
  margin: scaleSize(10),
  padding: scaleSize(20),
  fontSize: scaleFont(30),
});
```

scaleSize implementations in the react-native-style-adaptation-runtime

```ts
// react-native-style-adaptation-runtime
import { Dimensions } from 'react-native';
const WINDOW_WIDTH = Dimensions.get('window').width;
function scaleSize(size: number) {
  if (typeof size !== 'number') {
    return size;
  }
  return size * (WINDOW_WIDTH / designDraftWidth);
}
```

From the example above, you can see that the calculation includes the **designDraftWidth** variable, which represents the original Width of the design Draft, with a default value of 375.

If your draft is not 375, you can use the following Settings in the entry file in your project.

```ts
import init from 'react-native-style-adaptation-runtime';
init({
  designDraftWidth: 400,
});
```

If this doesn't work for you, you'll have to define your own adaptors. It's important to note that adaptors cannot be the default export for a module, because plugins will default to a named export when processing.

Finally, if the code already contains a module with the same name as the configuration module, the module may not come from the configured source, but the plugin will still use the module instead of deleting and re-importing it.

#### source

The path where the adaptation function is located, or the npm package.

Note:
The plugin doesn't do any additional processing of the source, so make sure the build tools can find the module.

### configuration item - ignore

You can pass a function to override the default, which ignores processing modules in node_modules by default.
