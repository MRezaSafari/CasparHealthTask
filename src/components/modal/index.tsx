import React, { FC } from "react";
import { ModalContainer, ModalContents, ModalHeader } from "./modal.styles";
import { IconX } from "@tabler/icons-react";
import { IModalProps } from "../../models";

const Modal: FC<IModalProps> = ({ title, children, isOpen, onClose }) => {
  if (!isOpen) return <></>;

  return (
    <ModalContainer data-testid="modal">
      <ModalContents>
        <ModalHeader>
          <p>{title}</p>
          <IconX data-testid="close-icon" onClick={onClose} color={"#000"} />
        </ModalHeader>
        <main>{children}</main>
      </ModalContents>
    </ModalContainer>
  );
};

export default Modal;
