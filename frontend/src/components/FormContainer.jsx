

const FormContainer = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-14rem)]  px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
