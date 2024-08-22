import Footer from '@/components/Navigation/Footer';
import Navbar from '@/components/Navigation/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

export default function ScheduleLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {/* <QueryClientProvider client={queryClient}> */}

      {children}
      {/* </QueryClientProvider> */}
      <Footer />
    </>
  );
}
