import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import Image from "next/image";

const builder = imageUrlBuilder(client);
interface HeroProps {
  title: string;
  image: {
    asset: {
      url: string;
    };
  };
}

export default function Hero({ title, image }: HeroProps) {
  return (
    <div className="relative w-full h-96">
      <Image
        src={builder.image(image).url()}
        width={300}
        height={500}
        alt={title}
        className="w-full h-full object-contain"
      />
      <h1 className="absolute bottom-4 left-4 text-white text-3xl font-bold">
        {title}
      </h1>
    </div>
  );
}
