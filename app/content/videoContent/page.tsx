import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import VidBox from '@/app/components/vidBox';
import ContentBox from '@/app/components/contentBox';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function getVideos(prefix: 'shorts' | 'longform', vidWidth: number) {
  const command = new ListObjectsV2Command({
    Bucket: process.env.S3_BUCKET_NAME,
    Prefix: prefix,
  });
  const response = await s3Client.send(command);
  console.log('Response Contents:', response.Contents);
  //first element is not an actual video object
  const vidObjects = response.Contents!.slice(1);

  //create signed URLs for each video object
  const signedUrls = await Promise.all(
    vidObjects.map(async (vidObj) => {
      //Get metadata for current object
      const headCommand = new HeadObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: vidObj.Key,
      });
      const vidMetaData = await s3Client.send(headCommand);
      console.log('Vidmetadata:', vidMetaData);
      //GetObjectCommand retrieves the object we are creating the current signed url for
      return {
        title: vidMetaData.Metadata!.title,
        descript: null,
        vidWidth: vidWidth,
        posterURL: vidMetaData.Metadata?.thumbnail
          ? await getSignedUrl(
              s3Client,
              new GetObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: vidMetaData.Metadata.thumbnail,
              }),
              { expiresIn: 3600 }
            )
          : undefined,
        signedUrl: await getSignedUrl(
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
  const shorts = await getVideos('shorts', 200);
  const longForm = await getVideos('longform', 500);

  return (
    <div>
      <h2 className="pageHeader">
        Here are some highlights from the past year...
      </h2>
      <div className="flex">
        <ContentBox contentType="Long-form" content={longForm} />
        <ContentBox contentType="Shorts" content={shorts} />;
      </div>
    </div>
  );
}
