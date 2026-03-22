import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
export const builder = imageUrlBuilder(client);
