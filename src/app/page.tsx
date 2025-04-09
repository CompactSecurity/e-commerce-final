'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import TrustSection from '@/components/TrustSection';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedProducts from '@/components/FeaturedProducts';
import BrandsSection from '@/components/BrandsSection';
import DownloadCatalog from '@/components/DownloadCatalog';
import YoutubeSection from '@/components/YoutubeSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <CategoryGrid />
        <BrandsSection />
        <DownloadCatalog />
        <FeaturedProducts />
        <YoutubeSection />
      </main>
      <Footer />
    </>
  );
}
