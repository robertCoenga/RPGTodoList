import {
  createContext,
  useContext,
  useState,
  type JSX,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Button } from "../Button";

const ModalContext = createContext<{ close: () => void } | null>(null);

type ModalProps = {
  btnClassName: string;
  btnIcon?: JSX.Element;
  btnLabel?: string;
  modalId?: string;
  modalClassName?: string;
  children: ReactNode;
};

type childrenProps = {
  className?: string;
  children: ReactNode;
};

type ModalFooterProps = {
  className?: string;
  children: ReactNode;
};

export function ModalBody({ className, children }: childrenProps) {
  return <div className={className}>{children}</div>;
}

export function ModalFooter({ className, children }: ModalFooterProps) {
  const context = useContext(ModalContext);
  return (
    <div className={className}>
      <Button
        label="Cancelar"
        className="rounded-xl bg-red-500 w-20 h-7"
        onClick={() => context?.close()}
      />
      {children}
    </div>
  );
}

export function Modal({
  btnLabel,
  btnIcon,
  btnClassName,
  modalId,
  modalClassName,
  children,
}: ModalProps) {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <Button
        icon={btnIcon}
        label={btnLabel}
        className={btnClassName}
        onClick={() => setShowModal(true)}
      />
      {showModal &&
        createPortal(
          <ModalContext.Provider value={{ close: closeModal }}>
            <div
              id={modalId}
              className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
              onClick={() => setShowModal(false)} // fecha ao clicar fora
            >
              <div
                className={`${modalClassName} relative p-6 rounded-2xl shadow-xl max-w-md w-[90%]`}
                onClick={(e) => e.stopPropagation()} // evita fechar ao clicar dentro
              >
                {children}
              </div>
            </div>
          </ModalContext.Provider>,
          document.body
        )}
    </>
  );
}
