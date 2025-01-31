export const createBasicJsonSample = () => {
  return {
    undefined: undefined,
    null: null,
    booleans: [false, true],
    numbers: [0, 1, 1000, 99_999_999],
    strings: ['hello', 'world'],
    array: [[[[[0]]]]],
    object: { a: { b: { c: 0 } } },
  };
};
