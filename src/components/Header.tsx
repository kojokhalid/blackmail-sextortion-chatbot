const Header = () => {
  return (
    <header>
      {" "}
      {/* 15rem is equivalent to 60 */}
      <nav className="fixed top-4 z-20 right-10 p-1">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo positioned on the far right */}
          <a href="#" className="flex ml-auto">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              <img
                src="../../public/myimg.jpeg"
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
