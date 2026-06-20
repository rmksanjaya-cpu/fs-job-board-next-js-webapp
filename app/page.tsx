import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import FeaturedJobsSkeleton from "@/components/FeaturedJobsSkeleton";

const FeaturedJobs = dynamic(() => import("@/components/FeaturedJobs"), {
  loading: () => <FeaturedJobsSkeleton />,
  ssr: true,
});

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


