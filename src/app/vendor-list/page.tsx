import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import VendorListContent from '@/components/vendor-list-content';

export const metadata = {
  title: 'Vendor List - DDF Layouts Dashboard',
  description: 'Digital Signage Player Network - Vendor List',
};

export default function VendorListPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <VendorListContent />
      </main>
      <Footer />
    </div>
  );
}
