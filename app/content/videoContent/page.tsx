import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function getVideos() {
  console.log('Bucket:', process.env.S3_BUCKET_NAME);
  console.log('Fetching videos...');

  const command = new ListObjectsV2Command({
    Bucket: process.env.S3_BUCKET_NAME,
    Prefix: 'shorts/',
  });
  const response = await s3Client.send(command);

  console.log('Response Contents:', response.Contents);
  console.log('Number of items:', response.Contents?.length ?? 0);

  return response.Contents;
}

export default async function VideoContent() {
  const videos = await getVideos();

  return (
    <div>
      {videos?.map((vid) => {
        console.log('HELLO');
        return <div key={vid.Key}>{vid.Key}</div>;
      })}
    </div>
  );
}
