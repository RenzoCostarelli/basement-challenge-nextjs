"use client";
import { FooterType } from "@/types/sanity";
import FooterCopyright from "@/components/Footer/FooterCopyright";
import FooterGroupLinks from "@/components/Footer/FooterGroupLinks";
import FooterLogo from "@/components/Footer/FooterLogo";

interface FooterProps {
  footerConfig: FooterType;
}

export default function Footer({ footerConfig }: FooterProps) {
  const { logo, groups, copyright, soda, sodaLogo } = footerConfig;

  return (
    <footer className="bg-black text-white py-8 text-center border-t border-basement-grey overflow-hidden">
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
