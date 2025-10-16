'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomeContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
                  Digital Display Format{' '}
                  <span className="text-primary">Layouts</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
                  Your comprehensive dashboard for managing and organizing digital signage layouts across 
                  multiple formats. Access specifications, dimensions, and vendor information all in one place.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/ddf"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Browse Layouts
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right Visual Element */}
            <div className="relative">
              <div className="bg-gradient-to-br from-green-600 to-blue-700 rounded-2xl p-8 text-white shadow-2xl">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">Digital Signage Solutions</h3>
                    <p className="text-green-100">Optimize your display content</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-2xl font-bold">16:9 Format</div>
                      <div className="text-sm text-green-100">Standard</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-2xl font-bold">4:3 Format</div>
                      <div className="text-sm text-green-100">Classic</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-2xl font-bold">9:16 Format</div>
                      <div className="text-sm text-green-100">Portrait</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-2xl font-bold">Custom Format</div>
                      <div className="text-sm text-green-100">Flexible</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Layout Management */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Layout Management</h3>
              <p className="text-gray-600">
                Browse and filter layouts across different formats including DDF, Electronics, Promos, and Exclusive Promos with detailed specifications.
              </p>
            </div>

            {/* Search & Filter */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Search & Filter</h3>
              <p className="text-gray-600">
                Quickly find layouts with our global search functionality and column visibility controls for customized views.
              </p>
            </div>

            {/* Vendor Coordination */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Vendor Coordination</h3>
              <p className="text-gray-600">
                Access vendor information and manage categories to streamline your digital signage operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Layout Types Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Layout Types</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* DDF */}
            <Link href="/ddf" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-center">
                  <h3 className="text-xl font-bold text-white">DDF</h3>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Digital Display Format</h4>
                  <p className="text-gray-600 text-sm">
                    Standard digital signage layouts with detailed specifications.
                  </p>
                </div>
              </div>
            </Link>

            {/* Promos */}
            <Link href="/promos" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-center">
                  <h3 className="text-xl font-bold text-white">Promos</h3>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Promotional Layouts</h4>
                  <p className="text-gray-600 text-sm">
                    Special promotional display formats for marketing campaigns.
                  </p>
                </div>
              </div>
            </Link>

            {/* Exclusive Promos */}
            <Link href="/exclusive-promos" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-center">
                  <h3 className="text-xl font-bold text-white">Exclusive Promos</h3>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Premium Promotions</h4>
                  <p className="text-gray-600 text-sm">
                    High-impact exclusive promotional display formats.
                  </p>
                </div>
              </div>
            </Link>

            {/* Electronics */}
            <Link href="/categories" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-center">
                  <h3 className="text-xl font-bold text-white">Electronics</h3>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Electronic Formats</h4>
                  <p className="text-gray-600 text-sm">
                    Specialized layouts for electronic displays and digital signage.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Explore?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover our comprehensive collection of digital display formats and optimize your signage strategy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/ddf"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Browse Layouts
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-600 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
