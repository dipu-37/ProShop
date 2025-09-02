

const FormContainer = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-14rem)]">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
