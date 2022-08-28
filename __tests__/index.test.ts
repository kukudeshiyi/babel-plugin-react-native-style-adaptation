import test from 'babel-plugin-tester';
import plugin, { PLUGIN_NAME } from '../packages/core/src/index';
import { distance, font } from '../packages/core/src/properties';

test({
  plugin,
  pluginOptions: {
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
  pluginName: PLUGIN_NAME,
  tests: [
    {
      code: `
          const styles = StyleSheet.create({
            margin:10,
            padding:20
          })
        `,
      snapshot: true,
    },
  ],
});
