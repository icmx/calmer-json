import { EntryMapper } from '../types/EntryMapper';
import { createDefaultReplacer } from './createDefaultReplacer';

describe('createDefaultReplacer utility function', () => {
  let replacer: EntryMapper;

  beforeEach(() => {
    replacer = createDefaultReplacer();
  });

  it('Should replace BigInt values by undefined', () => {
    const value = BigInt('1');
    const replaced = replacer('', value);

    expect(replaced).toBe(undefined);
  });

  it('Should replace same object references by undefined', () => {
    const value = {};
    const replaced1 = replacer('', value);
    const replaced2 = replacer('', value);
    const replaced3 = replacer('', value);

    expect(replaced1).toBe(value);
    expect(replaced2).toBe(undefined);
    expect(replaced3).toBe(undefined);
  });

  it('Should just pass through all JSON serializable values', () => {
    const serializable = [null, false, true, 0, 1, 3, 5, 'foo', 'bar'];

    serializable.forEach((value, index) => {
      const source = replacer('', value);
      const target = serializable.at(index);

      expect(source).toBe(target);
    });
  });
});
