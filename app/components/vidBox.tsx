export type ContentProps = {
  signedUrl: string;
  descript: string | null;
  title: string;
  vidWidth: number;
  posterURL: string | undefined;
};

export default function VidBox({
  signedUrl,
  descript,
  title,
  vidWidth,
  posterURL,
}: ContentProps) {
  return (
    <figure className="inline-flex flex-col justify-center items-center">
      <video
        src={signedUrl}
        width={vidWidth}
        className="vidBox"
        poster={posterURL}
        controls
      ></video>
      <h2 className="textBlockFont text-xl">{title}</h2>
      <figcaption className="text-shadow-white font-serif">
        {descript}
      </figcaption>
    </figure>
  );
}
