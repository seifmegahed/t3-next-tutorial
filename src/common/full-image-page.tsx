/* eslint-disable @next/next/no-img-element */
import { getImage } from "~/server/db/queries";
import { clerkClient } from "@clerk/nextjs/server";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);

  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink flex-grow justify-center">
        <img src={image.url} alt={image.name} className={"flex-shrink object-contain"} />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col border-1"> 
        <div className="border-b p-2 text-center text-lg">{image.name}</div>
        <div className="flex flex-col p-2">
          <span>Uploaded By:</span>
          <span>{uploaderInfo.fullName}</span>
        </div>
        <div className="flex flex-col p-2">
          <span>Created On:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
