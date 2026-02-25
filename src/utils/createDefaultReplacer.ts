import { EntryMapper } from '../types/EntryMapper';

/**
 * Creates a function to replace entries while using `toJson`. By
 * default will ignore entries with BigInt values or with circular
 * references.
 */
export const createDefaultReplacer = (): EntryMapper => {
  const seen = new WeakSet();

  return (key: string, value: unknown) => {
    if (typeof value === 'bigint') {
      return undefined;
    }

    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return undefined;
      }

      seen.add(value);
    }

    return value;
  };
};
