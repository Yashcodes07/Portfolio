import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MovieQuotes from '@/components/MovieQuotes';  // ← ADD THIS LINE
import TechStack from '@/components/TechStack';
import Achievements from '@/components/Achievements';
import Projects from '@/components/Projects';
import Blogs from '@/components/Blogs';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <MovieQuotes />  {/* ← ADD THIS LINE (between Hero and TechStack) */}
      <TechStack />
      <Achievements />
      <Projects />
      <Blogs />
      <Footer />
    </main>
  );
}