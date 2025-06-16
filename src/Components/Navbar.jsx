export default function Navbar() {
  return (
    <nav className="w-screen fixed top-0 left-0 z-50 bg-black/40 backdrop-blur-sm px-10 md:px-20 py-4 shadow-md flex justify-between items-center">
      {/* Logo */}
      <div className="text-[#f5f5dc] text-3xl font-bold tracking-tight">
        &lt;Kuri<span className="text-[#42e3f1]">Zd</span> /&gt;
      </div>

      {/* Enlaces */}
      <div className="flex space-x-8 text-lg font-semibold text-[#f5f5dc]">
        <a href="#home" className="hover:text-white">
          Home
        </a>
        <a href="#about" className="hover:text-white">
          About
        </a>
        <a href="#portfolio" className="hover:text-white">
          Portafolio
        </a>
        <a href="#contact" className="hover:text-white">
          Contact
        </a>
      </div>
    </nav>
  );
}
