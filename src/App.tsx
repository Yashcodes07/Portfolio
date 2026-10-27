import Header from "./sections/Header";
import Hero from "./sections/Hero";
import WhatIDo from "./sections/WhatIDo";
import SelectedWork from "./sections/SelectedWork";
import Stats from "./sections/Stats";
import Process from "./sections/Process";
import Quotes from "./sections/Quotes";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <main className="bg-(--color-canvas) text-(--color-ink)">
      <Header />
      <Hero />
      <WhatIDo />
      <SelectedWork />
      <Stats />
      <Process />
      <Quotes />
      <Contact />
    </main>
  );
}
