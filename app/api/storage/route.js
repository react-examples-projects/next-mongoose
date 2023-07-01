import { Storage } from "@google-cloud/storage";
import path from "path";
const storage = new Storage({
  keyFilename: path.join(
    process.cwd(),
    "/app/api/cogent-spring-386518-b896180ca467.json"
  ),
});

const bucket = storage.bucket("file_storage_bucket");

export const createWriteStream = (filename, contentType) => {
  const ref = bucket.file(filename);

  const stream = ref.createWriteStream({
    gzip: true,
    contentType: contentType,
  });

  return stream;
};

// storage
//   .getBuckets()
//   .then((results) => {
//     const buckets = results[0];

//     console.log("Buckets:");
//     buckets.forEach((bucket) => {
//       console.log(bucket.name);
//     });
//   })
//   .catch((err) => {
//     console.error("ERROR:", err);
//   });

export async function GET(request = Request.prototype) {
  bucket.upload(
    path.join(process.cwd(), "/app/api/storage/test.png"),
    {
      destination: `files/image_to_upload.jpeg`,
    },
    function (err, file) {
      if (err) {
        console.error(`Error uploading image image_to_upload.jpeg: ${err}`);
        return new Response(JSON.stringify(err), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        console.log(`Image image_to_upload.jpeg uploaded to bucket.`);
        // Making file public to the internet
        file.makePublic(async function (err) {
          if (err) {
            console.error(`Error making file public: ${err}`);
          } else {
            console.log(`File ${file.name} is now public.`);
            const publicUrl = file.publicUrl();

            console.log(`Public URL for ${file.name}: ${publicUrl}`);
            return new Response(JSON.stringify({ url: publicUrl }), {
              status: 201,
              headers: { "Content-Type": "application/json" },
            });
          }
        });
      }
    }
  );
}
