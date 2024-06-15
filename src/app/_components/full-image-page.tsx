/* eslint-disable @next/next/no-img-element */
import { getImage } from "~/server/db/queries";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);
  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex-shrink flex justify-center">
        <img src={image.url} alt={image.name} className={"object-contain"} />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col">
        <div className="text-2xl font-bold">{image.name}</div>
      </div>
    </div>
  );
}
