import { useEffect } from "react";

const useEffectOnce = (effect: () => void) => {
  useEffect(() => {
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useEffectOnce;
