import { createBasicTextSample } from '../../test/utils/createBasicTextSample';
import { fromJson } from './fromJson';

describe('fromJson function', () => {
  it('Should do the same as JSON.parse in basic parsing', () => {
    const sample = createBasicTextSample();

    const source = fromJson(sample);
    const target = JSON.parse(sample);

    expect(source).toStrictEqual(target);
  });

  it('Should apply reviver options exactly as JSON.parse', () => {
    const sample = createBasicTextSample();

    const reviver = (key: string, value: unknown) =>
      typeof value === 'object' ? value : `value-${value}`;

    const source = JSON.parse(sample, reviver);
    const target = fromJson(sample, { reviver });

    expect(source).toStrictEqual(target);
  });

  it('Should throw errors if onError is not set', () => {
    const sample = '{invalid_json!}';

    expect(() => fromJson(sample)).toThrow();
  });

  it('Should return a fallback value if onError returns it', () => {
    const sample = '{invalid_json!}';
    const fallback = { success: false };

    const json = fromJson(sample, { onError: () => fallback });

    expect(json).toStrictEqual(fallback);
  });
});
