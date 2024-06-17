"use client";

import { useRouter } from "next/navigation";
import { useUploadThing } from "~/utils/uploadthing";
import UploadSVG from "../_icons/UploadSVG";
import { toast } from "sonner";
import Loading from "./Loading";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

export default function SimpleUploadButton() {
  const router = useRouter();
  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin() {
      toast(
        <div className="flex items-center gap-2">
          <Loading />
          <span className="text-lg">Uploading...</span>
        </div>,
        {
          duration: 100000,
          id: "upload-begin",
        },
      );
    },
    onUploadError(error) {
      toast.dismiss("upload-begin");
      toast(<span className="text-lg">Upload failed: {error.message}</span>);
    },
    onClientUploadComplete() {
      toast.dismiss("upload-begin");
      toast(<span className="text-lg">Upload complete!</span>);
      router.refresh();
    },
  });
  return (
    <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-white/20">
      <label htmlFor="upload-button" className="cursor-pointer">
        <UploadSVG />
      </label>
      <input
        id="upload-button"
        type="file"
        className="sr-only"
        {...inputProps}
      />
    </div>
  );
}
