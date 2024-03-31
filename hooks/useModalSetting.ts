import { useCallback, useState } from "react";

export const useModalSetting = () => {
  const [show, setShow] = useState<boolean>(false);

  const modalOn = useCallback(() => {
    if (!show) {
      setShow(true);
    }
  }, [show]);

  const modalOff = useCallback(() => {
    if (show) {
      setShow(false);
    }
  }, [show]);

  return { show, modalOn, modalOff };
};
