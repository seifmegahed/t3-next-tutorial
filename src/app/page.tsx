import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/db/queries";

export const dynamic = "force-dynamic";

async function GalleryBody() {
  const images = await getMyImages();
  return (
    <div className="flex w-full flex-wrap justify-center gap-4 p-4">
      {images.map((image) => (
        <Link key={image.id} href={`/img/${image.id}`}>
          <div className="flex h-52 w-48 flex-col justify-between">
            <div className="flex h-full w-full justify-center overflow-hidden rounded-lg bg-white">
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
        </Link>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main>
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
