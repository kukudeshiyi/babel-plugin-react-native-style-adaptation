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
            height: '100%',
            padding: '20px',
            fontSize: '30awesome',
          })
        `,
      output: `
          const styles = StyleSheet.create({
            height: '100%',
            padding: '20px',
            fontSize: '30awesome',
          });
        `,
    },
  ],
});
