import ContentOpt from '../components/contentOpt';
import { contentOptions } from './data';

export default function ContentLanding() {
  return (
    <main>
      <h2 className="font-display text-center text-secondary text-4xl mt-10">
        What are you interested in checking out?
      </h2>
      <div className="flex justify-center gap-20 mt-10">
        <ContentOpt
          img={contentOptions.writtenContent.img}
          optMsg={contentOptions.writtenContent.optMsg}
          href="placeholder"
        />
        <ContentOpt
          img={contentOptions.videoContent.img}
          optMsg={contentOptions.videoContent.optMsg}
          href="/content/videoContent"
        />
      </div>
    </main>
  );
}
