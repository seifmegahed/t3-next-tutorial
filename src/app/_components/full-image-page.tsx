/* eslint-disable @next/next/no-img-element */
import { getImage } from "~/server/db/queries";

export default async function FullPageImageView(props: {id: number}) {
  const image = await getImage(props.id);
  return <img src={image.url} alt={image.name} className={"w-96"} />;
}
