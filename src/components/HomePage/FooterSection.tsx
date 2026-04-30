import { Mail, MapPin, Phone } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FooterSection = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Smart Tax Hub</h2>
          <p className="text-sm">
            We help individuals and businesses manage taxes, stay compliant, and
            make smarter financial decisions locally and globally.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Tax Filing & Compliance</li>
            <li>Business Registration</li>
            <li>VAT & Corporate Tax Advisory</li>
            <li>International Tax Support</li>
            <li>Financial Consultation</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Lagos, Nigeria
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +234 803 519 1736
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>support@smarttaxhub.com</span>
            </li>
          </ul>

          {/* Socials */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white">
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Smart Tax Hub. All Rights Reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
