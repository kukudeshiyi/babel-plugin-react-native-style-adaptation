import { WINDOW_WIDTH, DEFAULT_DESIGN_DRAFT_WIDTH } from './constants';
import { InitParams } from './types';

export { WINDOW_WIDTH, DEFAULT_DESIGN_DRAFT_WIDTH } from './constants';
export { InitParams } from './types';

export let designDraftWidth: InitParams['designDraftWidth'] = DEFAULT_DESIGN_DRAFT_WIDTH;

// TODO: 补充单侧
export function scaleSize(size: number) {
  if (typeof size !== 'number') {
    return size;
  }
  return size * (WINDOW_WIDTH / designDraftWidth);
}

export default function init(params: InitParams) {
  const { designDraftWidth: customDesignDraftWidth = DEFAULT_DESIGN_DRAFT_WIDTH } = params;
  if (typeof customDesignDraftWidth === 'number') {
    designDraftWidth = customDesignDraftWidth;
  }
}
