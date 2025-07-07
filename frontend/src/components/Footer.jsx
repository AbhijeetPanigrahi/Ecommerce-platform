import React from "react";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#212121] text-[#D1D5DB] py-10 mt-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">MyShop</h3>
          <p className="text-sm leading-relaxed">
            Discover curated collections of high-quality fashion, electronics,
            and lifestyle essentials. Designed with simplicity & soul.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-md font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
          </ul>
        </div>

        <div>
          <h4 className="text-md font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">
              Terms of Service
            </li>
            <li className="hover:text-white cursor-pointer">Shipping Info</li>
            <li className="hover:text-white cursor-pointer">Returns</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-md font-semibold mb-3">Subscribe</h4>
          <p className="text-sm mb-3">
            Get the latest updates, offers & trends delivered to your inbox.
          </p>
          <form className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-3 py-2 rounded-xl border border-gray-400 focus:outline-none text-[#212121]"
            />
            <button
              type="submit"
              className="bg-[#20B2AA] hover:bg-[#199a96] text-white px-4 py-2 rounded-xl text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-xs">
        <p>© 2025 MyShop. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Facebook className="hover:text-white cursor-pointer" size={18} />
          <Twitter className="hover:text-white cursor-pointer" size={18} />
          <Instagram className="hover:text-white cursor-pointer" size={18} />
          <Mail className="hover:text-white cursor-pointer" size={18} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
