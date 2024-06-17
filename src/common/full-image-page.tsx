/* eslint-disable @next/next/no-img-element */
import { deleteImage, getImage } from "~/server/db/queries";
import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "~/components/ui/button";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);

  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink flex-grow justify-center">
        <img
          src={image.url}
          alt={image.name}
          className={"flex-shrink object-contain"}
        />
      </div>
      <div className="border-1 flex w-48 flex-shrink-0 flex-col">
        <div className="border-b p-2 text-center text-lg">{image.name}</div>
        <div className="flex flex-col p-2">
          <span>Uploaded By:</span>
          <span>{uploaderInfo.fullName}</span>
        </div>
        <div className="flex flex-col p-2">
          <span>Created On:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex flex-col p-2">
          <form action={async () => {
            "use server";
            await deleteImage(props.id);
          }}>
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
