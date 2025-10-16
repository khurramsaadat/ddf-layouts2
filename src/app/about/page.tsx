import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export const metadata = {
  title: 'About - DDF Layouts Dashboard',
  description: 'Learn about DDF Layouts Dashboard and our digital signage solutions',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">About DDF Layouts</h1>
            
            <div className="prose prose-base mx-auto">
              <div className="bg-primary/10 p-4 rounded-lg mb-6">
                <h2 className="text-xl font-semibold text-primary mb-3">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed text-sm">
                  DDF Layouts Dashboard is a comprehensive digital signage management platform designed to streamline 
                  the organization and deployment of digital media content across various display networks. We provide 
                  powerful tools for layout management, vendor coordination, and real-time monitoring of digital signage infrastructure.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-3 text-primary">Layout Management</h3>
                  <p className="text-gray-600 text-sm">
                    Efficiently manage and organize digital signage layouts with our intuitive dashboard. 
                    Track dimensions, specifications, and deployment status across your entire network.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-3 text-primary">Vendor Coordination</h3>
                  <p className="text-gray-600 text-sm">
                    Streamline communication and coordination with digital signage vendors through our 
                    comprehensive vendor management system with advanced filtering and search capabilities.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-3 text-primary">Floor Plan Visualization</h3>
                  <p className="text-gray-600 text-sm">
                    Interactive AutoCAD-style floor plans provide precise visualization of digital media 
                    placement throughout Terminal 2 Departure areas with technical accuracy.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-3 text-primary">Real-time Analytics</h3>
                  <p className="text-gray-600 text-sm">
                    Monitor performance, track deployment status, and generate comprehensive reports 
                    for data-driven decision making in your digital signage operations.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Key Features</h2>
                <ul className="grid md:grid-cols-2 gap-2 text-gray-700 text-sm">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span>
                    Interactive layout management
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span>
                    Advanced filtering and search
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span>
                    Vendor database management
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span>
                    Technical floor plan visualization
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span>
                    Category-based organization
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span>
                    JCD layout specifications
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span>
                    Responsive design for all devices
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span>
                    Real-time data synchronization
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
