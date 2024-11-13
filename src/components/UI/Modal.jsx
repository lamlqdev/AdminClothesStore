import { useEffect } from "react";
import { useRef } from "react";

export default function Modal({ children, onClose }) {
  const dialog = useRef();
  useEffect(() => {
    const modal = dialog.current;
    modal.showModal();

    return () => {
      modal.close();
    };
  }, []);
  return (
    <dialog
      className="m-0 p-8 fixed top-[10vh] left-[calc(50%-15rem)] w-[30rem] max-h-[80vh] bg-[#e2e5eb] border-none rounded-[6px] z-[100] shadow-[0_2px_8px_rgba(0,0,0,0.26)] flex flex-col justify-between animate-slide-down-fade-in"
      ref={dialog}
      onClose={onClose}
    >
      {children}
    </dialog>
  );
}
