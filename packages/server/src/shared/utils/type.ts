export type BooleanTypes = 'true' | 'false';

/**
 * String to Boolean
 * @param value
 * @returns
 */
export const parseBool = (value: BooleanTypes) => {
  if (value === 'true') {
    return true;
  }
  return false;
};
