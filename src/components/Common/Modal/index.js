import ReactModal from 'react-modal';

import closeImg from '../../../assets/close.svg';

ReactModal.setAppElement('#root');

export function Modal({ isOpen, onRequestClose, size = '', children }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className={`react-modal-content ${size}`}
    >
      {children}
      <button onClick={onRequestClose}>
        <img src={closeImg} alt="Fechar modal" className="react-modal-close" />
      </button>
    </ReactModal>
  );
}