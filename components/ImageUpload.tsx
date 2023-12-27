"use client";
 
import { UploadButton, UploadDropzone } from "@/libs/uploadthing";
import Image from "next/image";

interface ImageUploadProps{
    onComlete:(url:string) => void,
}
 
export default function ImageUpload({onComlete}:ImageUploadProps) {
  return (
    <main className=" p-8">
      <UploadDropzone
        endpoint="imageUpload"
        onClientUploadComplete={(res) => onComlete(res[0].url)}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}