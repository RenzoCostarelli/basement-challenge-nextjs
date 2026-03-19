import { NavBar } from "@/types/sanity";
import { Button } from "./ui/Button";
import { builder } from "@/lib/image-builder";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  navBarConfig: NavBar;
}

export default async function Navbar({ navBarConfig }: NavbarProps) {
  const { navigationItems, cta, logo } = navBarConfig;
  return (
    <div className="fixed top-2 w-full z-50">
      <div className="container mx-auto">
        <div className="flex justify-between pl-4 pr-2 py-2 items-center  shadow-[#1212120D] shadow-inner bg-linear-to-r from-[#4a4a4a]/30 to-[#999999]/20 backdrop-blur-2xl rounded-[10px] ">
          {logo && (
            <div className="relative w-32">
              <Image
                src={builder.image(logo).url()}
                width={1300}
                height={500}
                alt="Basement image"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <nav>
            <ul className="flex gap-6" tabIndex={0}>
              {navigationItems?.map((item, index) => (
                <li key={index}>
                  {item.href && item.label && (
                    <Link
                      className="hover:text-basement-orange"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <Button variant="primary" size="md">
            {cta?.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
