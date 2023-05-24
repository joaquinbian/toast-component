import { useEffect } from "react";

export default function useEscapeKey(cb) {
  useEffect(() => {
    window.addEventListener("keydown", cb);

    return () => {
      window.removeEventListener("keydown", cb);
    };
  }, [cb]);
}
