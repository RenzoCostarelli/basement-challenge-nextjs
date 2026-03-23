"use client";
import { FooterType } from "@/types/sanity";
import FooterCopyright from "./Footer/FooterCopyright";
import FooterGroupLinks from "./Footer/FooterGroupLinks";
import FooterLogo from "./Footer/FooterLogo";

interface FooterProps {
  footerConfig: FooterType;
}

export default function Footer({ footerConfig }: FooterProps) {
  const { logo, groups, copyright, soda, sodaLogo } = footerConfig;

  return (
    <footer className="bg-black text-white py-8 text-center border-t border-basement-grey">
      <div>
        {groups && <FooterGroupLinks groups={groups} />}
        {logo && <FooterLogo logo={logo} />}
        {copyright && soda && sodaLogo && (
          <FooterCopyright
            copyright={copyright}
            soda={soda}
            sodaLogo={sodaLogo}
          />
        )}
      </div>
    </footer>
  );
}
