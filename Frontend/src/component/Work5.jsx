import React from 'react'

function Work5() {
  return (
    <div>
        <section id="security" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 animate__animated animate__fadeIn">
        <h2 class="text-4xl font-bold text-neutral-900 mb-4">Bank-Grade Security</h2>
        <p class="text-lg text-gray-600">Your trust and security are our top priorities</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="space-y-8 animate__animated animate__fadeInLeft">
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold text-neutral-900 mb-2">Blockchain Technology</h3>
              <p class="text-gray-600">Immutable transaction records and smart contracts ensure complete transparency and security of funds.</p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold text-neutral-900 mb-2">Hospital Verification</h3>
              <p class="text-gray-600">Multi-level verification process with authorized hospitals to prevent fraudulent campaigns.</p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold text-neutral-900 mb-2">Transparent Tracking</h3>
              <p class="text-gray-600">Real-time tracking of donations and fund utilization with blockchain verification.</p>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 p-8 rounded-2xl animate__animated animate__fadeInRight">
          <div class="bg-neutral-800 p-6 rounded-xl">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <span class="text-white font-medium">Live Transaction</span>
              </div>
              <span class="text-gray-400 text-sm">Now</span>
            </div>
            
            <div class="space-y-4">
              <div class="bg-neutral-700 p-4 rounded-lg">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-gray-300">Transaction Hash</span>
                  <span class="text-blue-400">#8a4d2...</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-300">Status</span>
                  <span class="text-green-500">Verified</span>
                </div>
              </div>

              <div class="bg-neutral-700 p-4 rounded-lg">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-gray-300">Smart Contract</span>
                  <span class="text-blue-400">#2b9e7...</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-300">Status</span>
                  <span class="text-green-500">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16 text-center animate__animated animate__fadeIn">
        <div class="inline-flex items-center px-6 py-3 border border-gray-200 rounded-lg">
          <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span class="text-neutral-900">SSL Encrypted | PCI Compliant | Smart Contract Verified</span>
        </div>
      </div>
    </div>
  </section>
  </div>
  )
}

export default Work5