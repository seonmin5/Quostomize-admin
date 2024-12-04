export const LoadingModal = ({message, isOpen}) => {

  if (!isOpen) {
    return <></>;
  } 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 shadow-xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-4"></div>
            <p className="text-gray-600">{message}</p>
        </div>
    </div>
  );
}


export default LoadingModal;
