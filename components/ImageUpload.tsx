import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@uploadthing/react";
import { XIcon } from "lucide-react";
import React from "react";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage";
}

type UploadResponse = {
  fileUrl: string;
  [key: string]: any;
};

function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
  if (value) {
    return (
      <div className="relative w-40 h-40">
        <img
          src={value}
          alt="Upload"
          className="rounded-md w-full h-full object-cover"
        />
        <button
          onClick={() => onChange("")}
          className="absolute top-1 right-1 p-1 bg-red-500 rounded-full shadow-sm"
          type="button"
          aria-label="Remove image"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-40">
      <UploadDropzone<OurFileRouter, "postImage">
        endpoint="postImage"
        onClientUploadComplete={(res) => {
          console.log("Upload response full:", res);
          if (res && res.length > 0) {
    console.log("First file object:", res[0]);
    console.log("First file keys:", Object.keys(res[0]));
  }
        }}
        onUploadError={(error: Error) => {
          alert(`Upload failed: ${error.message}`);
        }}
      />
    </div>
  );
}

export default ImageUpload;
