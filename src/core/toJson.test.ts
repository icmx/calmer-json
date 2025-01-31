import { toJson } from './toJson';

describe('toJson function', () => {
  it('Should never throw on circular references, but ignore them', () => {
    const sample = {
      ref: {},
      nested: {
        a: {
          b: {
            c: {
              circular: null,
              array: [],
            },
          },
        },
      },
    };

    // @ts-ignore
    sample.nested.a.b.c.circular = sample.ref;

    // @ts-ignore
    sample.nested.a.b.c.array.push(sample.ref);

    const text = toJson(sample);
    const json = JSON.parse(text);

    expect(json.nested.a.b.c.circular).toBe(undefined);
    expect(json.nested.a.b.c.array.at(0)).toBe(null);
  });

  it('Should never throw on BigInt values, but ignore them', () => {
    const sample = {
      int: BigInt('1'),
      nested: {
        a: {
          b: {
            c: {
              int: BigInt('2'),
              array: [],
            },
          },
        },
      },
    };

    // @ts-ignore
    sample.nested.a.b.c.array.push(BigInt('3'));

    const text = toJson(sample);
    const json = JSON.parse(text);

    expect(json.int).toBe(undefined);
    expect(json.nested.a.b.c.int).toBe(undefined);
    expect(json.nested.a.b.c.array.at(0)).toBe(null);
  });

  it('Should do the same as JSON.stringify in basic serialization', () => {
    const sample = {
      undefined: undefined,
      null: null,
      booleans: [false, true],
      numbers: [0, 1, 1000, 99_999_999],
      strings: ['hello', 'world'],
      array: [[[[[0]]]]],
      object: { a: { b: { c: 0 } } },
    };

    const source = toJson(sample);
    const target = JSON.stringify(sample);

    expect(source).toBe(target);
  });

  it('Should apply replacer option exactly as JSON.stringify', () => {
    const sample = {
      undefined: undefined,
      null: null,
      booleans: [false, true],
      numbers: [0, 1, 1000, 99_999_999],
      strings: ['hello', 'world'],
      array: [[[[[0]]]]],
      object: { a: { b: { c: 0 } } },
    };

    const replacer = (key: string, value: unknown) =>
      typeof value === 'object' ? value : `${key}:${value}`;

    const source = toJson(sample, { replacer });
    const target = JSON.stringify(sample, replacer);

    expect(source).toBe(target);
  });

  it('Should apply space option exactly as JSON.stringify', () => {
    const sample = {
      undefined: undefined,
      null: null,
      booleans: [false, true],
      numbers: [0, 1, 1000, 99_999_999],
      strings: ['hello', 'world'],
      array: [[[[[0]]]]],
      object: { a: { b: { c: 0 } } },
    };

    const stringSpace = '\t';
    const stringSource = toJson(sample, { space: stringSpace });
    const stringTarget = JSON.stringify(sample, undefined, stringSpace);

    expect(stringSource).toBe(stringTarget);

    const numberSpace = 5;
    const numberSource = toJson(sample, { space: numberSpace });
    const numberTarget = JSON.stringify(sample, undefined, numberSpace);

    expect(numberSource).toBe(numberTarget);
  });

  it('Should throw errors if onError is not set', () => {
    const sample = { foo: 'bar' };
    const replacer = (key: string, value: unknown) => ({
      $key: key,
      $value: value,
    });

    expect(() => toJson(sample, { replacer }));
  });

  it('Should return a fallback value if onError returns it', () => {
    const sample = { foo: 'bar' };
    const replacer = (key: string, value: unknown) => ({
      $key: key,
      $value: value,
    });

    const fallback = '{"success":false}';
    const source = toJson(sample, {
      replacer,
      onError: () => fallback,
    });

    expect(source).toBe(fallback);
  });
});
