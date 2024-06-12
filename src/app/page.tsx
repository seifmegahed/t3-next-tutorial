import { db } from "~/server/db";

/* eslint-disable @next/next/no-img-element */
const mockUrls = [
  "https://utfs.io/f/df53d63f-fd2a-4b4d-89d5-3f36634c5175-7grfis.png",
  "https://utfs.io/f/35699ca4-1ca0-44d6-9202-f2031652da3f-7grfit.png",
  "https://utfs.io/f/5d688fab-6f9b-42c1-b7c7-60a45d646fc8-7grfir.png",
  "https://utfs.io/f/a04731db-eabd-475b-a78f-f3769e2fb640-7grfiq.png",
  "https://utfs.io/f/1a6e3c7a-8458-4118-a9a4-4deb329e230f-7grfip.png",
  "https://utfs.io/f/26ae160b-5953-4ef1-b103-1e6f5f7ed718-a8b5fc.png",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>
            {post.name}
          </div>
        ))}
        {[...mockImages, ...mockImages].map((image, index) => (
          <div key={"image-" + image.id + index} className="w-48">
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
      Hello (Gallery in Progress)
    </main>
  );
}
