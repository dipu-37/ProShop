const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" ">
      <div className="container mx-auto">
        <div className="py-3 text-center">
          <p>ProShop &copy; {currentYear}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
