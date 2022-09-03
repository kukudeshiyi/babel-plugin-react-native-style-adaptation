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
