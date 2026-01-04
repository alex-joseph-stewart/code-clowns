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
      <div className="flex justify-center flex-wrap">
        {content.map((item, index) => {
          return (
            <VidBox
              key={index}
              title={item.title}
              descript={item.descript}
              signedUrl={item.signedUrl}
              vidWidth={item.vidWidth}
              posterURL={item.posterURL}
            />
          );
        })}
      </div>
    </div>
  );
}
