import Link from "next/link";
import { Wand2, Mail, Phone, MapPin, Globe, Users, Link as LinkIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#030014] border-t border-[#00f0ff]/20 pt-16 pb-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#b026ff]/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <Wand2 className="w-8 h-8 text-[#00f0ff] group-hover:text-[#b026ff] transition-colors duration-300" />
              <span className="font-bold text-2xl tracking-wider text-white">
                Encrypted<span className="text-[#00f0ff]">Wizards</span>
              </span>
            </Link>
            <p className="text-gray-400 mt-4 leading-relaxed">
              Conjuring digital excellence for forward-thinking startups and enterprises. We turn complex problems into elegant, secure solutions.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="text-gray-400 hover:text-[#00f0ff] transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00f0ff] transition-colors">
                <Users className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00f0ff] transition-colors">
                <LinkIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] mr-2"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Home', 'Who We Are', 'What We Do', 'Connect With Us'].map((link) => (
                <li key={link}>
                  <Link
                    href={link === 'Home' ? '/' : `/${link.toLowerCase().replace(/ /g, '-')}`}
                    className="text-gray-400 hover:text-[#b026ff] transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-[#b026ff] transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#b026ff] mr-2"></span>
              Services
            </h3>
            <ul className="space-y-3">
              {['Web Development', 'Cybersecurity', 'Cloud Infrastructure', 'AI Solutions'].map((service) => (
                <li key={service} className="text-gray-400 cursor-default">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] mr-2"></span>
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400">
                <Mail className="w-5 h-5 text-[#00f0ff] mt-0.5" />
                <span>info@enwi.in</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400">
                <Phone className="w-5 h-5 text-[#00f0ff] mt-0.5" />
                <span>+91 6360 660 520</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-[#00f0ff] mt-0.5" />
                <span>07 Melavarige, Sagar<br />Karnataka, 577401</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Encrypted Wizards. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
