import Experience from "@/components/Experience/404";
import GoBackButton from "@/components/GoBackButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "Renzo Costarelli",
};

export default function NotFound() {
  return (
    <div className="flex justify-center pt-15">
      <div className="z-50">
        <GoBackButton />
      </div>
      <Experience />
    </div>
  );
}
