import { createDefaultErrorHandler } from './createDefaultErrorHandler';

describe('createDefaultErrorHandler utility function', () => {
  it('Should throw exactly the same error occured', () => {
    const first = new Error('First error');
    const second = new Error('Second error');

    const handler = createDefaultErrorHandler();

    expect(() => handler(first)).toThrow(first);
    expect(() => handler(first)).not.toThrow(second);
  });
});
