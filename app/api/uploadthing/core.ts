import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handleAuth = () => {
    return {
        userId: 23243049304
    }
}; // Fake auth function
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUpload: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(handleAuth)
    .onUploadComplete(async ({ metadata, file }) => {

      return { uploadedBy: metadata.userId,url:file.url };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;