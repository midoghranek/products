import { useState } from "react";

type ToggleReturn = readonly [boolean, () => void];

const useToggleValue = (): ToggleReturn => {
  const [state, setState] = useState(false);
  const toggle = () => setState((prev) => !prev);
  return [state, toggle];
};

export default useToggleValue;
