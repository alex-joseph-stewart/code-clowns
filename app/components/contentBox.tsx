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
    <div>
      <div>{contentType}</div>
      {content.map((item, index) => {
        return (
          <VidBox
            key={index}
            title={item.title}
            descript={item.descript}
            signedUrl={item.signedUrl}
          />
        );
      })}
    </div>
  );
}
