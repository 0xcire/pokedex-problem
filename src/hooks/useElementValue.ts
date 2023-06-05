import { useEffect, RefObject } from 'react';

// TODO: HTMLElement does not ensure value exists. is this best solution?
type HTMLElementWithValue = HTMLElement & { value: unknown };

export function useElementValue<T extends HTMLElementWithValue>(
  ref: RefObject<T>,
  value: string
) {
  useEffect(() => {
    if (ref.current) {
      ref.current.value = value;
    }
  }, [ref, value]);
}
