const Footer = () => {
  return (
    <footer  >
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 text-white">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center sm:justify-start">
            <svg
              className="h-8"
              viewBox="0 0 118 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG paths */}
            </svg>
          </div>
        </div>
        <div className="mt-4 border-t pt-5 sm:pt-4">
          <p className="text-center">© All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6 sm:mt-0 sm:justify-end">
            {/* Social media icons or links can be added here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
