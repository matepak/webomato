require('../js/timer');

describe('Timer module', () => {
  it('should return "59"', () => {
    const watch = Timer(10);

    watch.tick();

    expect(watch.getSeconds()).toEqual('59');
  });
});
