'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block">
              <h3 className="text-lg font-bold mb-3 text-primary hover:text-primary/80 transition-colors">DDF Layouts</h3>
            </Link>
            <p className="text-gray-300 mb-3 text-xs leading-relaxed">
              Professional digital signage management and layout organization tools. 
              Streamline your digital media operations with our comprehensive dashboard.
            </p>
            <div className="flex flex-wrap gap-2">
              {/* Facebook */}
              <a href="#" className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-primary transition-all duration-300 transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-4 h-4 fill-white">
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                </svg>
              </a>
              {/* Twitter/X */}
              <a href="#" className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-primary transition-all duration-300 transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-white">
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-primary transition-all duration-300 transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 fill-white">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-primary transition-all duration-300 transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 fill-white">
                  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
                </svg>
              </a>
              {/* TikTok */}
              <a href="#" className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-primary transition-all duration-300 transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 fill-white">
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-primary transition-all duration-300 transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-4 h-4 fill-white">
                  <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                </svg>
              </a>
              {/* Reddit */}
              <a href="#" className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-primary transition-all duration-300 transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-white">
                  <path d="M440.3 203.5c-15 0-28.2 6.2-37.9 15.9-35.7-24.7-83.8-40.6-137.1-42.3L293 52.3l88.2 19.8c0 21.6 17.6 39.2 39.2 39.2 22 0 39.7-18.1 39.7-39.7s-17.6-39.7-39.7-39.7c-15.4 0-28.7 9.3-35.3 22l-97.4-21.6c-4.9-1.3-9.7 2.2-11 7.1L246.3 177c-52.9 2.2-100.5 18.1-136.3 42.8-9.7-10.1-23.4-16.3-38.4-16.3-55.6 0-73.8 74.6-22.9 100.1-1.8 7.9-2.6 16.3-2.6 24.7 0 83.8 94.4 151.7 210.3 151.7 116.4 0 210.8-67.9 210.8-151.7 0-8.4-.9-17.2-3.1-25.1 49.9-25.6 31.5-99.7-23.8-99.7zM129.4 308.9c0-22 17.6-39.7 39.7-39.7 21.6 0 39.2 17.6 39.2 39.7 0 21.6-17.6 39.2-39.2 39.2-22 .1-39.7-17.6-39.7-39.2zm214.3 93.5c-36.4 36.4-139.1 36.4-175.5 0-4-3.5-4-9.7 0-13.7 3.5-3.5 9.7-3.5 13.2 0 27.8 28.5 120 29 149 0 3.5-3.5 9.7-3.5 13.2 0 4.1 4 4.1 10.2.1 13.7zm-.8-54.2c-21.6 0-39.2-17.6-39.2-39.2 0-22 17.6-39.7 39.2-39.7 22 0 39.7 17.6 39.7 39.7-.1 21.5-17.7 39.2-39.7 39.2z"/>
                </svg>
              </a>
              {/* Pinterest */}
              <a href="#" className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-primary transition-all duration-300 transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4 fill-white">
                  <path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"/>
                </svg>
              </a>
              {/* Facebook Messenger */}
              <a href="#" className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-primary transition-all duration-300 transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-white">
                  <path d="M256.55 8C116.52 8 8 110.34 8 248.57c0 72.3 29.71 134.78 78.07 177.94 8.35 7.51 6.63 11.86 8.05 58.23A19.92 19.92 0 0 0 122 502.31c52.91-23.3 53.59-25.14 62.56-22.7C337.85 521.8 504 423.7 504 248.57 504 110.34 396.59 8 256.55 8zm149.24 185.13l-73 115.57a37.37 37.37 0 0 1-53.91 9.93l-58.08-43.47a15 15 0 0 0-18 0l-78.37 59.44c-10.46 7.93-24.16-4.6-17.11-15.67l73-115.57a37.36 37.36 0 0 1 53.91-9.93l58.06 43.46a15 15 0 0 0 18 0l78.41-59.38c10.44-7.98 24.14 4.54 17.09 15.62z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-base font-semibold mb-3">Navigation</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/ddf" className={`${pathname === '/ddf' ? 'text-primary' : 'text-gray-300'} hover:text-primary transition-colors`}>DDF</Link></li>
              <li><Link href="/promos" className={`${pathname === '/promos' ? 'text-primary' : 'text-gray-300'} hover:text-primary transition-colors`}>Promos</Link></li>
              <li><Link href="/exclusive-promos" className={`${pathname === '/exclusive-promos' ? 'text-primary' : 'text-gray-300'} hover:text-primary transition-colors`}>Exclusive Promos</Link></li>
              <li><Link href="/electronics" className={`${pathname === '/electronics' ? 'text-primary' : 'text-gray-300'} hover:text-primary transition-colors`}>Electronic</Link></li>
              <li><Link href="/jcd" className={`${pathname === '/jcd' ? 'text-primary' : 'text-gray-300'} hover:text-primary transition-colors`}>JCD</Link></li>
              <li><Link href="/categories" className={`${pathname === '/categories' ? 'text-primary' : 'text-gray-300'} hover:text-primary transition-colors`}>Categories</Link></li>
              <li><Link href="/vendor-list" className={`${pathname === '/vendor-list' ? 'text-primary' : 'text-gray-300'} hover:text-primary transition-colors`}>Vendor List</Link></li>
              <li><Link href="/about" className={`${pathname === '/about' ? 'text-primary' : 'text-gray-300'} hover:text-primary transition-colors`}>About</Link></li>
              <li><Link href="/contact" className={`${pathname === '/contact' ? 'text-primary' : 'text-gray-300'} hover:text-primary transition-colors`}>Contact</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-base font-semibold mb-3">Features</h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li>• Layout Management</li>
              <li>• Vendor Coordination</li>
              <li>• Interactive Floor Plans</li>
              <li>• Advanced Filtering</li>
              <li>• Real-time Analytics</li>
              <li>• Responsive Design</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-semibold mb-3">Connect</h4>
            <div className="space-y-6 text-xs text-gray-300">
              <p>Dubai, UAE</p>
              <p className="mt-2">
                <a href="mailto:khurram.saadat@yahoo.com" className="text-primary hover:text-primary/70 transition-colors">
                  khurram.saadat@yahoo.com
                </a>
              </p>
              <p className="mt-12">
                <span className="text-gray-400">For the best experience, we recommend using </span>
                <span className="text-primary font-medium">Google Chrome</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-6 pt-6 flex flex-col md:flex-row justify-center items-center">
          <div className="flex flex-wrap items-center justify-center text-xs text-gray-400 space-x-4">
            <p>&copy; {new Date().getFullYear()} DDF Layouts Dashboard</p>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</a>
        </div>
        </div>

        
      </div>
    </footer>
  );
}
