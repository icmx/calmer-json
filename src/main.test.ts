import main from './main';

describe('Initial test for main function', () => {
  it('Should always log "hello world"', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    main();

    expect(consoleSpy).toHaveBeenCalledWith('hello world');
  });

  it('Should always return 0', () => {
    const result = main();

    expect(result).toBe(0);
  });
});
