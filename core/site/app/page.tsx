import { ArtefactCatalogue } from "./sections/artefact-catalogue";
import { Footer } from "./sections/footer";
import { Hero } from "./sections/hero";
import { HowClaraThinks } from "./sections/how-clara-thinks";
import { QuickStart } from "./sections/quick-start";
import { TopNav } from "./sections/top-nav";
import { WhereClaraEarns } from "./sections/where-clara-earns";

export default function Home() {
  return (
    <>
      <TopNav />
      <main>
        <Hero />
        <HowClaraThinks />
        <WhereClaraEarns />
        <ArtefactCatalogue />
        <QuickStart />
      </main>
      <Footer />
    </>
  );
}
