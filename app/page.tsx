import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import FeaturedJobs from "@/components/FeaturedJobs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Header />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Features />
        <FeaturedJobs />
      </main>
      <Footer />
    </div>
  );
}

