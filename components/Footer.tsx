import { builder } from "@/lib/image-builder";
import { FooterType } from "@/types/sanity";
import Image from "next/image";

interface FooterProps {
  footerConfig: FooterType;
}

export default function Footer({ footerConfig }: FooterProps) {
  const { logo, groups, copyright, soda, sodaLogo } = footerConfig;

  return (
    <footer className="bg-black text-white py-8 text-center border-t border-basement-grey">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 mb-4">
          {groups?.map((group, index) => (
            <div className="col-span-2 text-left" key={index}>
              <div>
                <h4 className="text-f-t mb-4 text-basement-orange">
                  {group.title}
                </h4>
                <nav>
                  <ul className="space-y-2">
                    {group.links
                      .filter((link) => link.href)
                      .map((link, linkIndex) => (
                        <li
                          key={linkIndex}
                          className="text-basement-white text-f-neutral font-sans"
                        >
                          {link.href && (
                            <a
                              href={link.href}
                              target={link.external ? "_blank" : "_self"}
                              rel={
                                link.external
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className="hover:underline"
                            >
                              {link.label}
                            </a>
                          )}
                        </li>
                      ))}
                  </ul>
                </nav>
              </div>
            </div>
          ))}
        </div>
        {logo && (
          <Image
            src={builder.image(logo).url()}
            width={1399}
            height={214}
            alt={"Basement logo"}
            aria-hidden="true"
            className="w-full h-auto"
          />
        )}
        <div className="flex items-center justify-between text-basement-grey font-mono mt-5">
          <p>{copyright}</p>
          <div className="flex items-center gap-2">
            <p className="text-nowrap">{soda}</p>
            {sodaLogo && (
              <div className="w-6 h-6">
                <Image
                  src={builder.image(sodaLogo).url()}
                  width={21}
                  height={24}
                  alt={"Soda logo"}
                  aria-hidden="true"
                  className="w-auto h-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
