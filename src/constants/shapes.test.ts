import { LOCATION_SHAPE_BY_ID } from './shapes';

describe('LOCATION_SHAPE_BY_ID', () => {
  it('maps known SVG ids to filterable shapes', () => {
    expect(LOCATION_SHAPE_BY_ID.rect1408).toBe('rectangle');
    expect(LOCATION_SHAPE_BY_ID.path1585).toBe('circle');
    expect(LOCATION_SHAPE_BY_ID.path1529).toBe('star');
  });
});
