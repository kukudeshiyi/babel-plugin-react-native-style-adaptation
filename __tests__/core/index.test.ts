import test from 'babel-plugin-tester';
import plugin, { PLUGIN_NAME } from '../../packages/core/src/index';
import allProperties from '../../packages/core/src/properties';

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
      code: `
          const styles = StyleSheet.create({
            margin:10,
            padding:20,
            fontSize:30
          })
        `,
      output: `
          import { scaleSize } from 'react-native-style-adaptation-runtime';
          const styles = StyleSheet.create({
            margin: scaleSize(10),
            padding: scaleSize(20),
            fontSize: scaleSize(30),
          });
        `,
    },
    // have other property not in config
    {
      code: `
          const styles = StyleSheet.create({
            margin: 10,
            padding: 20,
            fontSize: 30,
            flex: 10
          })
        `,
      output: `
          import { scaleSize } from 'react-native-style-adaptation-runtime';
          const styles = StyleSheet.create({
            margin: scaleSize(10),
            padding: scaleSize(20),
            fontSize: scaleSize(30),
            flex: 10,
          });
        `,
    },
    // already import module
    {
      code: `
          import { scaleSize } from 'react-native-style-adaptation-runtime';
          const styles = StyleSheet.create({
            margin: 10,
            padding: 20,
            fontSize: 30,
          })
        `,
      output: `
          import { scaleSize } from 'react-native-style-adaptation-runtime';
          const styles = StyleSheet.create({
            margin: scaleSize(10),
            padding: scaleSize(20),
            fontSize: scaleSize(30),
          });
        `,
    },
    // already import other module in the same file
    {
      code: `
          import { scaleFont } from 'react-native-style-adaptation-runtime';
          const styles = StyleSheet.create({
            margin: 10,
            padding: 20,
            fontSize: 30,
          })
        `,
      output: `
          import { scaleFont, scaleSize } from 'react-native-style-adaptation-runtime';
          const styles = StyleSheet.create({
            margin: scaleSize(10),
            padding: scaleSize(20),
            fontSize: scaleSize(30),
          });
        `,
    },
    // already import other default module in the same file
    {
      code: `
          import scaleFont from 'react-native-style-adaptation-runtime';
          const styles = StyleSheet.create({
            margin: 10,
            padding: 20,
            fontSize: 30,
          })
        `,
      output: `
          import scaleFont, { scaleSize } from 'react-native-style-adaptation-runtime';
          const styles = StyleSheet.create({
            margin: scaleSize(10),
            padding: scaleSize(20),
            fontSize: scaleSize(30),
          });
        `,
    },
    // already import other module in the other file
    {
      code: `
          import scaleFont, { Test } from 'otherModule';
          const styles = StyleSheet.create({
            margin: 10,
            padding: 20,
            fontSize: 30,
          })
        `,
      output: `
          import scaleFont, { Test } from 'otherModule';
          import { scaleSize } from 'react-native-style-adaptation-runtime';
          const styles = StyleSheet.create({
            margin: scaleSize(10),
            padding: scaleSize(20),
            fontSize: scaleSize(30),
          });
        `,
    },
  ],
});
