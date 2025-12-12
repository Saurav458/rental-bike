import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      {/* Top CTA Section */}
      <div className="bg-gradient-to-r from-black-500 to-cyan-400 text-white py-12 px-6 mb-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-3xl font-bold mb-2">Grow your business with Raj Motors.</h3>
            <p className="text-lg">List your bike and become a member of Raj Motors family.</p>
          </div>
          {/* <button className="bg-primary text-black font-bold px-8 py-3 rounded-lg hover:opacity-90 transition mt-4 md:mt-0">
            🔒 Dealer Login
          </button> */}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-primary">About Raj Motors</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-primary transition">About Raj Motors</a></li>
              <li><a href="#" className="hover:text-primary transition">Why Raj Motors?</a></li>
              <li><a href="#" className="hover:text-primary transition">How Raj Motors Works</a></li>
              <li><a href="#" className="hover:text-primary transition">Payment and Security</a></li>
              <li><a href="#" className="hover:text-primary transition">Terms and Conditions</a></li>
              <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 2 - Support */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-primary">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-primary transition">Customer Testimonials</a></li>
              <li><a href="#" className="hover:text-primary transition">Partner with Us</a></li>
              <li><a href="#" className="hover:text-primary transition">Terms of Use</a></li>
              <li><a href="#" className="hover:text-primary transition">Safety</a></li>
              <li><a href="#" className="hover:text-primary transition">Discount Coupons</a></li>
              <li><a href="#" className="hover:text-primary transition">Support</a></li>
              <li><a href="#" className="hover:text-primary transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-primary">📧 Email Us</h4>
            <p className="text-gray-400 mb-4">Have questions? We'd love to hear from you.</p>
            <a href="mailto:info@rajmotors.com" className="text-primary font-bold hover:underline">
              info@rajmotors.com
            </a>
            <h4 className="text-lg font-bold mb-4 mt-8 text-primary">📞 Call Us</h4>
            <a href="tel:+919876543210" className="text-primary font-bold text-2xl hover:underline">
              +91 98765 43210
            </a>
          </div>

          {/* Column 4 - App & Social */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-primary">Download the Raj Motors App</h4>
            <div className="space-y-3 mb-8">
              <a href="#" className="flex items-center gap-2 hover:opacity-80 transition">
                <span>🟢</span>
                <span>Google Play</span>
              </a>
              <a href="#" className="flex items-center gap-2 hover:opacity-80 transition">
                <span>⬛</span>
                <span>App Store</span>
              </a>
            </div>
            <h4 className="text-lg font-bold mb-4 text-primary">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border-2 border-primary rounded-lg flex items-center justify-center hover:bg-primary hover:text-black transition">
                f
              </a>
              <a href="#" className="w-10 h-10 border-2 border-primary rounded-lg flex items-center justify-center hover:bg-primary hover:text-black transition">
                𝕏
              </a>
              <a href="#" className="w-10 h-10 border-2 border-primary rounded-lg flex items-center justify-center hover:bg-primary hover:text-black transition">
                📷
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 bg-cyan-400 text-black font-bold px-6 py-3 rounded-full shadow-lg hover:bg-cyan-500 transition cursor-pointer">
        💬 Chat with Raj Motors
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 pt-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; 2025 Raj Motors Services Pvt Ltd. All rights reserved.</p>
          {/* <p>Powered by <span className="text-primary">Raj Motors</span></p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;