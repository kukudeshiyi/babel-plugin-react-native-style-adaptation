import { WINDOW_WIDTH, DEFAULT_DESIGN_DRAFT_WIDTH } from './constans';
import { InitParams } from './types';

export { WINDOW_WIDTH, DEFAULT_DESIGN_DRAFT_WIDTH } from './constans';
export { InitParams } from './types';

export let designDraftWidth: InitParams['designDraftWidth'] = DEFAULT_DESIGN_DRAFT_WIDTH;

export function scaleSize(size: number) {
  return size * (WINDOW_WIDTH / designDraftWidth);
}

export default function init(params: InitParams) {
  const { designDraftWidth: customDesignDraftWidth = DEFAULT_DESIGN_DRAFT_WIDTH } = params;
  if (typeof customDesignDraftWidth === 'number') {
    designDraftWidth = customDesignDraftWidth;
  }
}
