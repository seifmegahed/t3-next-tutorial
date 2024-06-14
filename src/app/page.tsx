import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { getMyImages } from "~/server/db/queries";

export const dynamic = "force-dynamic";

async function GalleryBody() {
  const images = await getMyImages();
  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div className="flex w-48 h-52 flex-col justify-between" key={image.id}>
          <div className="w-full h-full flex justify-center">
            <Image
              src={image.url}
              width={480}
              height={480}
              style={{ objectFit: "cover" }}
              alt={image.name}
            />
          </div>
          <div className="h-4">{image.name}</div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="">
      <SignedIn>
        <GalleryBody />
      </SignedIn>
      <SignedOut>
        <div className="text-center">
          <p>Please sign in to view your images.</p>
        </div>
      </SignedOut>
    </main>
  );
}
