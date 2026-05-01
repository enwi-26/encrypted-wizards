"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Connect() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", company: "", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex flex-col w-full overflow-hidden pt-20">
      <section className="py-24 relative bg-[#030014]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00f0ff]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#b026ff]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#b026ff]">Connect</span> With Us
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ready to conjure digital excellence? Drop us a line and let's start building something extraordinary together.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 bg-[#050310] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* Contact Info */}
            <div className="lg:col-span-2 bg-[#ffffff]/5 p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00f0ff] to-[#b026ff]"></div>

              <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
              <p className="text-gray-400 mb-10 leading-relaxed">
                Fill out the form and our team will get back to you within 24 hours. We're excited to hear about your project!
              </p>

              <div className="space-y-8">
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-[#00f0ff] mr-4 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold">Email Us</h4>
                    <p className="text-gray-400">info@enwi.in</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-[#b026ff] mr-4 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold">Call Us</h4>
                    <p className="text-gray-400">+91 6360 660 520</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-[#00f0ff] mr-4 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold">Headquarters</h4>
                    <p className="text-gray-400">07 Melavarige, Sagar<br />Karnataka, 577401</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#030014] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#030014] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#b026ff] focus:ring-1 focus:ring-[#b026ff] transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-2">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-[#030014] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-colors"
                    placeholder="Your Company Inc."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#030014] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#b026ff] focus:ring-1 focus:ring-[#b026ff] transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-lg font-bold text-white flex items-center justify-center transition-all duration-300 ${isSuccess
                      ? 'bg-green-500'
                      : 'bg-gradient-to-r from-[#00f0ff] to-[#b026ff] hover:opacity-90 box-glow-blue'
                    }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">Sending Magic...</span>
                  ) : isSuccess ? (
                    <span className="flex items-center">Message Sent Successfully!</span>
                  ) : (
                    <span className="flex items-center">
                      Send Message <Send className="ml-2 w-5 h-5" />
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
