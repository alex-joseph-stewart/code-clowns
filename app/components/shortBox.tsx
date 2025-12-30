export default function ShortBox({
  signedUrl,
  descript,
  shortTitle,
}: {
  signedUrl: string;
  descript: string;
  shortTitle: string;
}) {
  return (
    <figure className="inline-flex flex-col justify-center items-center">
      <video
        src={signedUrl}
        width={200}
        className="rounded-lg border-2 border-white"
        controls
      ></video>
      <h2 className="textBlockFont">{shortTitle}</h2>
      <figcaption className="text-shadow-white font-serif">
        {descript}
      </figcaption>
    </figure>
  );
}
