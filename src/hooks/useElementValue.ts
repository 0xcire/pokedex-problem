import { useEffect, RefObject } from 'react';

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
