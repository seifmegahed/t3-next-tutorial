/* eslint-disable @next/next/no-img-element */
import { SignedIn } from "@clerk/nextjs";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        <SignedIn>
          {images.map((image) => (
            <div className="flex w-48 flex-col justify-end" key={image.id}>
              <div className="flex justify-center rounded-lg bg-white">
                <img className="rounded-lg" src={image.url} alt={image.name} />
              </div>
              <div>{image.name}</div>
            </div>
          ))}
        </SignedIn>
      </div>
    </main>
  );
}
