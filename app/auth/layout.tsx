import Footer from '@/components/Navigation/Footer';
import Navbar from '@/components/Navigation/Navbar';

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <section className="flex h-screen flex-col items-center justify-center">
        {children}
      </section>
      <Footer />
    </>
  );
}
