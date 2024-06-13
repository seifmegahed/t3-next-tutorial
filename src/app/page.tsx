/* eslint-disable @next/next/no-img-element */
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/db/queries";

export const dynamic = "force-dynamic";

async function GalleryBody() {
  const images = await getMyImages();
  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div className="flex w-48 flex-col justify-end" key={image.id}>
          <div className="flex justify-center rounded-lg bg-white">
            <img className="rounded-lg" src={image.url} alt={image.name} />
          </div>
          <div>{image.name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
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
