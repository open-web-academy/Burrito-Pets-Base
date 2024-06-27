'use client';
import { useAccount } from 'wagmi';
import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import React from "react";

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function HomePage() {
  const account = useAccount();

  return (
    <>
      <Header />
      <main className="container mx-auto flex flex-col px-8 py-16">
        <div style={{ textAlign: "center" }}>
          <img src="https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/banner.webp" /><br />
          <h1 style={{ fontSize: "40px", marginTop:"50px" }}>🌯Meet your ultimate virtual companion in Burrito Pets!</h1>
          <br />
        </div>        
      </main>
      <Footer />
    </>
  );
}
