import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    modal.showModal();

    const handleCancel = (event) => {
      event.preventDefault();
      onClose();
    };
    modal.addEventListener("cancel", handleCancel);

    return () => {
      modal.removeEventListener("cancel", handleCancel);
      modal.close();
    };
  }, [onClose]);

  return createPortal(
    <>
      <div className="fixed inset-0 bg-black bg-opacity-75 z-[99]" />
      <dialog
        className="m-0 p-8 fixed overflow-y-auto top-[10vh] left-[calc(50%-15rem)] w-[30rem] max-h-[90vh] bg-[#f3f3f5] border-none rounded-[6px] z-[100] shadow-[0_2px_8px_rgba(0,0,0,0.26)] flex flex-col justify-between animate-slide-down-fade-in"
        ref={dialog}
      >
        {children}
      </dialog>
    </>,
    document.getElementById("modal")
  );
}
