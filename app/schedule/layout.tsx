import Footer from '@/components/Navigation/Footer';
import Navbar from '@/components/Navigation/Navbar';

export default function ScheduleLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
