import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import ShortBox from '@/app/components/shortBox';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function getVideos() {
  const command = new ListObjectsV2Command({
    Bucket: process.env.S3_BUCKET_NAME,
    Prefix: 'shorts/',
  });
  const response = await s3Client.send(command);
  console.log('Response Contents:', response.Contents);
  //first element is not an actual video object
  const vidObjects = response.Contents!.slice(1);

  //create signed URLs for each video object
  const signedUrls = await Promise.all(
    vidObjects.map(async (vidObj) => {
      //GetObjectCommand retrieves the object we are creating the current signed url for
      return {
        key: vidObj.Key,
        url: await getSignedUrl(
          s3Client,
          new GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: vidObj.Key,
          }),
          { expiresIn: 3600 }
        ),
      };
    })
  );
  return signedUrls;
}

export default async function VideoContent() {
  const videos = await getVideos();

  return (
    <div>
      {videos?.map((vid) => {
        return (
          <ShortBox
            key={vid.key}
            signedUrl={vid.url}
            descript="A brief description about this video!"
            shortTitle="A Short Title"
          />
        );
      })}
    </div>
  );
}
