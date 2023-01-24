import { useCallback, useRef } from "react";

export function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number) {
	const timer = useRef<number>();

	const debouncedCallback = useCallback(
		(...args: any) => {
			if (timer.current) window.clearTimeout(timer.current);
			timer.current = window.setTimeout(() => callback(...args), delay);
		},
		[callback, delay]
	);

	return debouncedCallback as T;
}
