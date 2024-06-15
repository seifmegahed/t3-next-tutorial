import { getImage } from "~/server/db/queries";
import Image from "next/image";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: number };
}) {
  const image = await getImage(photoId);
  return (
    <div>
      <Image src={image.url} alt={image.name} width={1000} height={1000} />
    </div>
  );
}