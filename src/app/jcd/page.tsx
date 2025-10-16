import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import JCDContent from '@/components/jcd-content';

export const metadata = {
  title: 'JCD Layouts - DDF Layouts Dashboard',
  description: 'JCD Layout Specifications with Dimensions',
};

export default function JCDPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <JCDContent />
      </main>
      <Footer />
    </div>
  );
}
