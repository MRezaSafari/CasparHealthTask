import debounce from "./debounce";

const WAIT_TIME = 100;

describe("debounce", () => {
  jest.useFakeTimers();

  it("should delay the callback invocation by specified wait time", () => {
    const callback = jest.fn();
    const debouncedFn = debounce(callback, WAIT_TIME);

    debouncedFn();

    // No callback should be invoked yet
    expect(callback).not.toHaveBeenCalled();

    // Fast-forward until the wait time has elapsed
    jest.advanceTimersByTime(WAIT_TIME);
    expect(callback).toHaveBeenCalled();
  });

  it("should call the callback only once for multiple invocations within the wait time", () => {
    const callback = jest.fn();
    const debouncedFn = debounce(callback, WAIT_TIME);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    // Fast-forward until the wait time has elapsed
    jest.advanceTimersByTime(WAIT_TIME);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should call the callback with the latest arguments of the last invocation", () => {
    const callback = jest.fn();
    const debouncedFn = debounce(callback, WAIT_TIME);

    debouncedFn("first call");
    debouncedFn("second call");
    debouncedFn("third call");

    // Fast-forward until the wait time has elapsed
    jest.advanceTimersByTime(WAIT_TIME);
    expect(callback).toHaveBeenCalledWith("third call");
  });

  it("should use the default wait time if none is provided", () => {
    const callback = jest.fn();
    const debouncedFn = debounce(callback); // Default wait time is 20ms

    debouncedFn();

    // No callback should be invoked yet
    expect(callback).not.toHaveBeenCalled();

    // Fast-forward 10ms - still should not be called
    jest.advanceTimersByTime(10);
    expect(callback).not.toHaveBeenCalled();

    // Fast-forward another 10ms to hit the 20ms mark
    jest.advanceTimersByTime(10);
    expect(callback).toHaveBeenCalled();
  });

  it("should handle calls correctly spaced out beyond the wait time", () => {
    const callback = jest.fn();
    const debouncedFn = debounce(callback, WAIT_TIME);

    debouncedFn("first call");
    jest.advanceTimersByTime(WAIT_TIME + 50); // Let's wait beyond the debounce time
    expect(callback).toHaveBeenCalledWith("first call");

    debouncedFn("second call");
    jest.advanceTimersByTime(WAIT_TIME + 50); // Wait beyond the debounce time again
    expect(callback).toHaveBeenCalledWith("second call");
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
});
