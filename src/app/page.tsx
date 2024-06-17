import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/db/queries";

export const dynamic = "force-dynamic";

async function GalleryBody() {
  const images = await getMyImages();
  return (
      <div className="flex flex-wrap gap-4 p-4 justify-center">
        {images.map((image) => (
          <Link key={image.id} href={`/img/${image.id}`}>
            <div className="flex h-52 w-48 flex-col justify-between mb-16">
              <div className="flex h-full w-full justify-center overflow-hidden rounded-lg bg-white">
                <Image
                  src={image.url}
                  width={192}
                  height={192}
                  style={{ objectFit: "contain" }}
                  alt={image.name}
                />
              </div>
              <div className="h-5">{image.name}</div>
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
