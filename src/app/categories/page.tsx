import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import CategoriesContent from '@/components/categories-content';

export const metadata = {
  title: 'Categories - DDF Layouts Dashboard',
  description: 'Browse layout categories and their specifications',
};

export default function CategoriesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <CategoriesContent />
      </main>
      <Footer />
    </div>
  );
}
