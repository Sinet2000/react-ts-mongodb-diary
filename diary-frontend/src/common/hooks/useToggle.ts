import { useCallback, useState } from "react";

export const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState<boolean>(initialValue);

  const show = useCallback(() => {
    setValue(true);
  }, []);

  const hide = useCallback(() => {
    setValue(false);
  }, []);

  const toggle = useCallback(() => {
    setValue((prevValue) => !prevValue);
  }, []);

  return {
    value,
    show,
    hide,
    toggle,
  };
};