const AddProductModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Add Product</h2>
          {/* Your form goes here */}
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      
    );
  };

  export default AddProductModal;