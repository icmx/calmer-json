export const createDefaultReplacer = () => {
  const seen = new WeakSet();

  return (key: string, value: unknown) => {
    if (typeof value === 'bigint') {
      return undefined;
    }

    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[[Circular]]';
      }

      seen.add(value);
    }

    return value;
  };
};
