// import { debug } from 'console-browserify';
import Modal from 'react-modal';

const DialogBox = ({
  isOpen,
  toggleModal,
  title,
}: {
  isOpen: boolean;
  toggleModal: any;
  title: string;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      contentLabel='My dialog'
      className='mymodal'
      overlayClassName='myoverlay'
      closeTimeoutMS={500}
    >
      <div>{title}</div>
      <button onClick={() => (isOpen = false)}>Close card</button>
    </Modal>
  );
};
export default DialogBox;
