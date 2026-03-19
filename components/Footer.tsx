export default function Footer() {
  return (
    <div className="bg-black text-white py-8 text-center">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-1 text-left">
            <div>WEBSITE</div>
            <ul>
              <li>LINK 1</li>
              <li>LINK 1</li>
              <li>LINK 1</li>
              <li>LINK 1</li>
            </ul>
          </div>
          <div className="col-span-1 text-left">
            <div>WEBSITE</div>
            <ul>
              <li>LINK 1</li>
              <li>LINK 1</li>
              <li>LINK 1</li>
              <li>LINK 1</li>
            </ul>
          </div>
          <div className="col-span-1 text-left">
            <div>WEBSITE</div>
            <ul>
              <li>LINK 1</li>
              <li>LINK 1</li>
              <li>LINK 1</li>
              <li>LINK 1</li>
            </ul>
          </div>
        </div>
      </div>
      <p>
        &copy; {new Date().getFullYear()} Basement Blog. All rights reserved.
      </p>
    </div>
  );
}
