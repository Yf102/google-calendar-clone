import { createPortal } from "react-dom";
import { useEffect, ReactNode, useRef, useLayoutEffect, useState } from "react";
import cn from "classnames";

export type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
};
const Modal = ({ children, onClose, isOpen }: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const prevIsOpen = useRef<boolean>();

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape" && typeof onClose === "function") onClose();
    }

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  useLayoutEffect(() => {
    if (!isOpen && prevIsOpen.current) {
      setIsClosing(true);
    }

    prevIsOpen.current = isOpen;
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return createPortal(
    <div
      className={cn("modal", { closing: isClosing })}
      onAnimationEnd={() => setIsClosing(false)}
    >
      <div className="overlay" onClick={onClose}></div>
      <div className="modal-body">{children}</div>
    </div>,
    document.getElementById("modal-root") as HTMLElement,
  );
};

export default Modal;
