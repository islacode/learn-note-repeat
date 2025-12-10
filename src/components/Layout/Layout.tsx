import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import NavBar from './NavBar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-(--bg) text-(--text)">
      <Header />
      <NavBar />
      <main className="mx-auto flex-1 max-w-5xl px-4 py-7">{children}</main>
      <Footer />
    </div>
  );
}
