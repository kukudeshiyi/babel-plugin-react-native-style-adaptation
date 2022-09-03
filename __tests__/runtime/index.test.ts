import init, {
  scaleSize,
  designDraftWidth,
  DEFAULT_DESIGN_DRAFT_WIDTH,
  WINDOW_WIDTH,
} from '../../packages/runtime/src/index';

test('init', () => {
  const customValue = 400;
  expect(designDraftWidth).toEqual(DEFAULT_DESIGN_DRAFT_WIDTH);
  expect(WINDOW_WIDTH).toEqual(600);
  expect(scaleSize(50)).toEqual(50 * (600 / DEFAULT_DESIGN_DRAFT_WIDTH));
  init({
    designDraftWidth: customValue,
  });
  expect(designDraftWidth).toEqual(customValue);
  expect(scaleSize(50)).toEqual(50 * (600 / customValue));
});
