export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Company Info */}
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center mr-2">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="text-lg font-semibold">VuluGO</span>
          </div>

          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            © {currentYear} VuluGO. All rights reserved.
          </div>
        </div>

        {/* Additional Footer Links */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a
                href="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/contact"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Contact Us
              </a>
            </div>
            <div className="text-gray-500 text-xs">
              Built with Next.js and Tailwind CSS
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 