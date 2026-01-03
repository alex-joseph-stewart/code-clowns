export type ContentProps = {
  signedUrl: string;
  descript: string | null;
  title: string;
};

export default function VidBox({ signedUrl, descript, title }: ContentProps) {
  return (
    <figure className="inline-flex flex-col justify-center items-center">
      <video
        src={signedUrl}
        width={200}
        className="rounded-lg border-2 border-white"
        controls
      ></video>
      <h2 className="textBlockFont">{title}</h2>
      <figcaption className="text-shadow-white font-serif">
        {descript}
      </figcaption>
    </figure>
  );
}
