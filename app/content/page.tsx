import ContentOpt from '../components/contentOpt';

export default function ContentLanding() {
  return (
    <main>
      <h2 className="font-display text-center text-secondary text-4xl mt-10">
        What are you interested in checking out?
      </h2>
      <div className="flex justify-center mt-10">
        <ContentOpt img="/book.svg" optMsg="Written content" />
        <ContentOpt img="/camera.svg" optMsg="Video content" />
      </div>
    </main>
  );
}
