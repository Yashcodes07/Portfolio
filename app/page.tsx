import Header from '@/components/Header';
import Hero from '@/components/Hero';
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
      <TechStack />
      <Achievements />
      <Projects />
      <Blogs />
      <Footer />
    </main>
  );
}
