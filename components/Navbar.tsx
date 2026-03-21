import { NavBar } from "@/types/sanity";
import { Button } from "./ui/Button";
import { builder } from "@/lib/image-builder";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavbarProps {
  navBarConfig: NavBar;
}

export default async function Navbar({ navBarConfig }: NavbarProps) {
  const { navigationItems, cta, logo } = navBarConfig;
  return (
    <div className="fixed top-2 w-full z-50 font-sans">
      <div className="container mx-auto">
        <div className="flex justify-between pl-4 pr-2 py-1 items-center shadow-[-1px_-1px_0.5px_0px_rgba(255,255,255,0.25),1px_1px_0.5px_0px_rgba(255,255,255,0.25)] bg-[linear-gradient(175deg,#4a4a4a14,#99999924)] backdrop-blur-2xl rounded-[10px] ">
          {logo && (
            <Link href={"/"} className="relative w-32">
              <Image
                src={builder.image(logo).url()}
                width={1300}
                height={500}
                alt="Basement image"
                className="w-full h-full object-cover"
              />
            </Link>
          )}
          <nav>
            <ul className="flex gap-6" tabIndex={0}>
              {navigationItems?.map((item, index) => (
                <li key={index}>
                  {item.href && item.label && (
                    <Link
                      className={cn(
                        "hover:text-basement-orange",
                        item.label === "Blog" && "text-basement-orange",
                      )}
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
