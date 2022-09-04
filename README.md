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

example:

```ts
// bable.config.js
import { distance, font } from 'babel-plugin-react-native-style-adaptation';
module.exports = {
  plugins: [
    [
      'react-native-style-adaptation',
      {
        configs: [
          {
            properties: distance,
            module: 'scaleSize',
            source: 'scaleSizeLib',
          },
          {
            properties: font,
            module: 'scaleFont',
            source: 'scaleFontLib',
          },
        ],
      },
    ],
  ],
};
```
