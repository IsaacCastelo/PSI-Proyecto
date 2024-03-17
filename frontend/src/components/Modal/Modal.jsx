import PropTypes from 'prop-types';

export default function Modal({ open, onClose, children }) {
  Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center
         items-center transition-colors bg-black bg-opacity-50 ${
           open ? 'block' : 'invisible'
         }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`justify-around bg-white rounded-xl p-6 transition-all ${
          open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        }`}
      >
        <button
          onClick={onClose}
          className='absolute top-2 right-2 p-1 rounded-lg
           text-gray-400 bg-white
            hover:bg-gray-50 hover:text-gray-600'
        >
          <span className='material-icons'>close</span>
        </button>
        {children}
      </div>
    </div>
  );
}
