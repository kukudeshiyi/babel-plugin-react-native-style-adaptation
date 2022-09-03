import test from 'babel-plugin-tester';
import plugin, { PLUGIN_NAME } from '../../packages/core/src/index';
import { distance, font } from '../../packages/core/src/properties';

test({
  plugin,
  pluginOptions: {
    configs: [
      {
        properties: distance,
        module: 'scaleSize',
        source: 'react-native-style-adaptation-runtime',
      },
      {
        properties: font,
        module: 'scaleFont',
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
          import { scaleSize, scaleFont } from 'react-native-style-adaptation-runtime';
          const styles = StyleSheet.create({
            margin: scaleSize(10),
            padding: scaleSize(20),
            fontSize: scaleFont(30),
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
          import { scaleSize, scaleFont } from 'react-native-style-adaptation-runtime';
          const styles = StyleSheet.create({
            margin: scaleSize(10),
            padding: scaleSize(20),
            fontSize: scaleFont(30),
            flex: 10,
          });
        `,
    },
    // already import module
    {
      code: `
          import { scaleSize, scaleFont } from 'react-native-style-adaptation-runtime';
          const styles = StyleSheet.create({
            margin: 10,
            padding: 20,
            fontSize: 30,
          })
        `,
      output: `
          import { scaleSize, scaleFont } from 'react-native-style-adaptation-runtime';
          const styles = StyleSheet.create({
            margin: scaleSize(10),
            padding: scaleSize(20),
            fontSize: scaleFont(30),
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
            fontSize: scaleFont(30),
          });
        `,
    },
    // already import other same name module in the other file
    // {
    //   code: `
    //       import scaleFont from 'otherModule';
    //       const styles = StyleSheet.create({
    //         margin: 10,
    //         padding: 20,
    //         fontSize: 30,
    //       })
    //     `,
    //   output: `
    //       import scaleFont from 'otherModule';
    //       import { scaleSize } from 'react-native-style-adaptation-runtime';
    //       const styles = StyleSheet.create({
    //         margin: scaleSize(10),
    //         padding: scaleSize(20),
    //         fontSize: scaleFont(30),
    //       });
    //     `,
    // },
  ],
});
