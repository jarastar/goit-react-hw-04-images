import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

const Modal = ({ closeModal, children }) => {
  const close = useCallback(
    ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', close);

    return () => document.removeEventListener('keydown', close);
  }, [close]);

  useEffect(() => {
    const modalElement = modalRoot.querySelector(`.${styles.modal}`);
    if (!document.body.contains(modalElement)) {
      document.body.appendChild(modalRoot);
    }

    return () => {
      if (document.body.contains(modalElement)) {
        document.body.removeChild(modalRoot);
      }
    };
  }, []);

  return createPortal(
    <div className={styles.overlay} onClick={close}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
