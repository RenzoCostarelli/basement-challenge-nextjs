export default function Navbar() {
  return (
    <div className="fixed top-2 w-full z-50">
      <div className="container mx-auto">
        <div className="flex justify-between pl-4 pr-2 py-2 items-center shadow-[#1212120D] shadow-md bg-linear-to-b from-[#4a4a4a]/50 to-[#999999]/50 backdrop-blur-lg rounded-[10px]">
          <div>LOGO</div>
          <nav>
            <ul className="flex gap-6">
              <li>SHOWCASE</li>
              <li>SERVICES</li>
              <li>PEOPLE</li>
              <li>LABORATORY</li>
              <li>BLOG</li>
              <li>VENTURES</li>
            </ul>
          </nav>
          <div>cta</div>
        </div>
      </div>
    </div>
  );
}
