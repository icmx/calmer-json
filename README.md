# calmer-json

Like JSON stringify/parse, but never throws on circular references and BigInt values.

## Usage

```sh
npm install calmer-json
```

### `toJson` — stringify

```ts
const text = toJson(value, options?)
```

  - `value` Value to stringify to a JSON text
  - `options.replacer?` Function to transform value entries (if any)
  - `options.space?` String to use to ident or number of spaces for identation
  - `options.onError?` Callback to handle possible errors and provide a fallback value

Unlike JSON.stringify, `toJson` never throws on circular references or BigInt values. It just ignores them as non-serializable:

```ts
const example = {
  circular: null,
  bigint: BigInt('1'),
  foo: 'bar',
};

example.circular = example;

toJson(example); // -> '{"foo":"bar"}'
```

### `fromJson` — parse

```ts
const value = fromJson(text, options?)
```

  - `text` String to parse from JSON text to a value
  - `options.reviver?` Function to transform value entries (if any)
  - `options.onError?` Callback to handle possible errors and provide a fallback value
