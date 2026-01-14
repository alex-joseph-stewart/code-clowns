import AboutMeOpt from '../components/aboutMeOpt';
import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  HeadObjectCommandInput,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import AboutClient from './AboutClient';
import { loadBio, type Slug, type Bio } from '@/lib/loadBio';

const client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

type Person = { slug: Slug; name: string; key: string };

const codeClowns: Person[] = [
  { slug: 'alex', name: 'Alex Stewart', key: 'headshots/alexTechHeadshot.jpg' },
  { slug: 'sam', name: 'Sam LaRiviere', key: 'headshots/samtechheadshot.jpeg' },
];

const bios = {
  alex: loadBio('alex'),
  sam: loadBio('sam'),
};

async function getPhotos() {
  //grab signedURL for each object
  const signedImgUrls = await Promise.all(
    codeClowns.map(async (img) => {
      return {
        slug: img.slug,
        name: img.name,
        key: img.key,
        signedUrl: await getSignedUrl(
          client,
          new GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: img.key,
          }),
          { expiresIn: 3600 }
        ),
      };
    })
  );
  return signedImgUrls;
}

export default async function About() {
  const photos = await getPhotos();
  return <AboutClient photos={photos} bios={bios} />;
}
