'use client';
import dynamic from 'next/dynamic';
import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import Main from '@/components/layout/Main';
import Interact from './_components/Interact';

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function InteractPage() {
  return (
    <>
      <Header />
      <Main>
        <Interact />
      </Main>
      <Footer />
    </>
  )
}
