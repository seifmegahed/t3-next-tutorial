/* eslint-disable @next/next/no-img-element */
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {images.map((image) => (
          <div key={"image-" + image.id} className="w-48">
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
      Hello (Gallery in Progress)
    </main>
  );
}
