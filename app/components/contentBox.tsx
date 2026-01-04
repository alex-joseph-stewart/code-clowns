import type { ContentProps } from './vidBox';
import VidBox from './vidBox';

export default function ContentBox({
  contentType,
  content,
}: {
  contentType: string;
  content: ContentProps[];
}) {
  return (
    <div className="w-[50vw]">
      <div className="redTextBlock textBlockFont mx-auto">{contentType}</div>
      {content.map((item, index) => {
        return (
          <VidBox
            key={index}
            title={item.title} //ultimately item.title
            descript={item.descript} //ultimately item.descript
            signedUrl={item.signedUrl}
            vidWidth={item.vidWidth}
          />
        );
      })}
    </div>
  );
}
