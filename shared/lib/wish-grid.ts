import { spacing } from '@/constants';

export const WISH_GRID_GAP = spacing[2];
export const WISH_GRID_COLUMNS = 2;

export function getWishCardWidth(screenWidth: number): number {
  const horizontalPadding = spacing[4] * 2;
  return (screenWidth - horizontalPadding - WISH_GRID_GAP * (WISH_GRID_COLUMNS - 1)) / WISH_GRID_COLUMNS;
}
