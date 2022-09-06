import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import aws from "aws-sdk";
import { createReadStream } from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        const s3 = new aws.S3({
          accessKeyId: process.env.ACCESSKEY_ID,
          secretAccessKey: process.env.SECRET_ACCESSKEY_ID
        });

        const stream = createReadStream(files.file.path);

        await s3
          .upload({
            Bucket: process.env.S3_BUCKET_NAME,
            key: files.file.name,
            ACL: "public-read",
            Body: stream,
          })
          .promise()
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
        console.log(files);
      });
    } catch(e) {
      console.log(e);
      res.end();
    }
  }
  res.statusCode = 400;
  return res.end();
};