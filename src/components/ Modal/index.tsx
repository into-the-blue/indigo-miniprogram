import React from 'react';
import { inject, observer } from 'mobx-react';
import { AtModal } from 'taro-ui';
import { ModalStore } from '@/store';

const Modal = ({ modalStore }: { modalStore?: ModalStore }) => {
  const {
    title,
    cancelText,
    confirmText,
    content,
    onCancel,
    onClose,
    onConfirm,
    isOpen,
    dismisModal,
  } = modalStore!;
  console.warn('is open', isOpen);
  return (
    <AtModal
      title={title}
      isOpened={isOpen}
      cancelText={cancelText}
      confirmText={confirmText}
      content={content}
      onCancel={() => dismisModal(onCancel)}
      onClose={() => dismisModal(onClose)}
      onConfirm={() => dismisModal(onConfirm)}
    ></AtModal>
  );
};

export default inject('modalStore')(observer(Modal));
