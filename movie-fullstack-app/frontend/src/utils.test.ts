import debounced from './utils';

jest.useFakeTimers();

describe('debounced', () => {
	it('should debounce function calls', () => {
		const fn = jest.fn();
		const delayedFn = debounced(fn, 100);

		delayedFn();
		jest.advanceTimersByTime(50);

		expect(fn).not.toHaveBeenCalled();

		jest.advanceTimersByTime(50);

		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('should call the function only after the specified delay', () => {
		const fn = jest.fn();
		const delayedFn = debounced(fn, 100);

		delayedFn();
		jest.advanceTimersByTime(99);

		expect(fn).not.toHaveBeenCalled();

		jest.advanceTimersByTime(1);

		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('should handle multiple invocations within the delay period', () => {
		const fn = jest.fn();
		const delayedFn = debounced(fn, 100);

		delayedFn();
		delayedFn();
		delayedFn();
		jest.advanceTimersByTime(100);

		expect(fn).toHaveBeenCalledTimes(1);
	});
});
