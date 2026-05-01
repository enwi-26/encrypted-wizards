import Link from "next/link";
import { ArrowRight, Shield, Zap, Code2, Cpu, Globe, Target, CheckCircle2, Star, Quote } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-[#00f0ff]/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-[#b026ff]/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-[#ffffff]/5 rounded-full px-4 py-2 mb-8 border border-[#00f0ff]/30 backdrop-blur-sm">
            <Zap className="w-4 h-4 text-[#00f0ff]" />
            <span className="text-sm font-medium text-[#00f0ff] uppercase tracking-wider">The Future of IT is Here</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
            Conjuring Digital <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#b026ff]">
              Excellence
            </span>
          </h1>

          <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            We are Encrypted Wizards. We build secure, scalable, and spellbinding digital solutions for startups and enterprises ready to disrupt the market.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/what-we-do"
              className="px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-[#00f0ff] to-[#b026ff] hover:opacity-90 box-glow-blue transition-all duration-300 flex items-center group"
            >
              Explore Our Magic
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/connect"
              className="px-8 py-4 rounded-full font-bold text-white border border-gray-600 hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 transition-all duration-300"
            >
              Consult a Wizard
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Who We Are (Preview) */}
      <section className="py-24 relative bg-[#050310] border-t border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00f0ff] to-[#b026ff] rounded-2xl blur opacity-30"></div>
              <div className="relative bg-[#030014] p-8 rounded-2xl border border-gray-800 h-full flex flex-col justify-center min-h-[400px]">
                {/* Abstract geometric illustration instead of image */}
                <div className="absolute top-10 right-10 w-32 h-32 border border-[#00f0ff]/50 rounded-full animate-pulse"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 border border-[#b026ff]/50 rounded-lg rotate-45"></div>
                <Target className="w-24 h-24 text-gray-700 mx-auto opacity-50" />
              </div>
            </div>

            <div>
              <h2 className="text-[#00f0ff] font-semibold tracking-wide uppercase text-sm mb-3">Who We Are</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Masters of the Digital Realm</h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Founded by a coven of tech veterans, Encrypted Wizards blends cutting-edge technology with creative problem-solving. We don't just write code; we craft secure ecosystems that empower businesses to thrive in the digital age.
              </p>
              <ul className="space-y-4 mb-8">
                {['Innovative Approach', 'Uncompromising Security', 'Scalable Architecture'].map((item) => (
                  <li key={item} className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-6 h-6 text-[#b026ff] mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/who-we-are" className="inline-flex items-center text-[#00f0ff] hover:text-glow-blue font-semibold transition-all">
                Read our story <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What We Do (Preview) */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#b026ff] font-semibold tracking-wide uppercase text-sm mb-3">What We Do</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Arcane Arts</h3>
            <p className="text-gray-400 text-lg">
              We provide end-to-end IT services designed to transform your operations, secure your data, and accelerate growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Code2, title: 'Web & App Dev', desc: 'Custom, high-performance applications tailored to your unique business needs.' },
              { icon: Shield, title: 'Cybersecurity', desc: 'Impenetrable defenses protecting your most valuable data and assets.' },
              { icon: Cpu, title: 'AI Solutions', desc: 'Intelligent automation and machine learning models that give you the edge.' }
            ].map((service, idx) => (
              <div key={idx} className="bg-[#ffffff]/5 border border-gray-800 hover:border-[#00f0ff]/50 p-8 rounded-2xl transition-all duration-300 group hover:-translate-y-2">
                <div className="w-14 h-14 bg-[#00f0ff]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#00f0ff]/20 transition-colors">
                  <service.icon className="w-8 h-8 text-[#00f0ff]" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
                <p className="text-gray-400 mb-6">{service.desc}</p>
                <Link href="/what-we-do" className="text-sm font-semibold text-gray-300 group-hover:text-white flex items-center">
                  Learn more <ArrowRight className="ml-1 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Partners / Tech Stack */}
      <section className="py-16 bg-[#00f0ff]/5 border-y border-[#00f0ff]/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">Trusted by & Powered by</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Tech stack placeholders since logos aren't provided */}
            <span className="text-2xl font-bold text-white flex items-center"><Globe className="mr-2" /> Next.js</span>
            <span className="text-2xl font-bold text-white">AWS</span>
            <span className="text-2xl font-bold text-white">Google Cloud</span>
            <span className="text-2xl font-bold text-white">Vercel</span>
            <span className="text-2xl font-bold text-white">Stripe</span>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Partner With The Wizards?</h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                In a crowded market of IT agencies, we stand out by acting as true technical co-founders. We don't just execute tickets; we architect solutions that scale.
              </p>

              <div className="space-y-6">
                {[
                  { title: 'Lightning Fast Delivery', desc: 'Agile sprints that get your product to market faster without sacrificing quality.' },
                  { title: 'Zero Compromise Security', desc: 'Military-grade encryption and security audits come standard with every build.' },
                  { title: 'Transparent Communication', desc: 'Direct access to senior developers. No middle-men, no black boxes.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-[#b026ff]/20 flex items-center justify-center border border-[#b026ff]/50">
                        <span className="text-[#b026ff] font-bold text-sm">{idx + 1}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-white">{item.title}</h4>
                      <p className="mt-1 text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats/Visual Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#ffffff]/5 p-8 rounded-2xl border border-gray-800 text-center flex flex-col justify-center">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#00f0ff] to-[#b026ff] mb-2">100%</span>
                <span className="text-gray-400 font-medium">Uptime Guarantee</span>
              </div>
              <div className="bg-[#ffffff]/5 p-8 rounded-2xl border border-gray-800 text-center flex flex-col justify-center translate-y-8">
                <span className="text-5xl font-black text-white mb-2">6</span>
                <span className="text-gray-400 font-medium">Projects Shipped</span>
              </div>
              <div className="bg-[#ffffff]/5 p-8 rounded-2xl border border-gray-800 text-center flex flex-col justify-center">
                <span className="text-5xl font-black text-white mb-2">24/7</span>
                <span className="text-gray-400 font-medium">Support Available</span>
              </div>
              <div className="bg-[#ffffff]/5 p-8 rounded-2xl border border-[#00f0ff]/30 box-glow-blue text-center flex flex-col justify-center translate-y-8">
                <span className="text-5xl font-black text-white mb-2">100%</span>
                <span className="text-gray-400 font-medium">Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-24 relative bg-[#050310] border-t border-gray-800">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#00f0ff] font-semibold tracking-wide uppercase text-sm mb-3">Testimonials</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white">Words From Our Partners</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Dr. H M Shivakumar', role: 'President, MDF(R.), Sagar', text: 'ENWI successfully developed informative websites for three of our institutions, along with the official website of MDF. Each website is well-structured, easy to navigate, and effectively communicates institutional information to students, parents, and the public. Their ability to maintain consistency across multiple websites while addressing the unique needs of each institution is truly commendable.' },
              { name: 'Dr. Laxmisha A S', role: 'Principal, LBAS & SBSC College', text: 'ENWI did an excellent job in developing our college website with a clean design and well-structured content. The team clearly understood our academic requirements and delivered a user-friendly platform that effectively represents our institution. Their timely support and professional approach made the entire process smooth and satisfactory.' },
              { name: 'Mr. Sathyanarayana K C', role: 'Principal, GPUC, Sagar', text: 'ENWI has developed an informative and well-organized website for our college that effectively communicates academic activities, announcements, and student-related information. The website is easy to navigate and serves as a reliable source of information for students, parents, and the public. We appreciate the team’s understanding of institutional requirements and their prompt support.' }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-[#030014] p-8 rounded-2xl border border-gray-800 relative group hover:border-[#b026ff]/50 transition-colors">
                <Quote className="absolute top-6 right-6 w-12 h-12 text-gray-800 group-hover:text-[#b026ff]/20 transition-colors" />
                <div className="flex space-x-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300 text-lg mb-8 relative z-10 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00f0ff] to-[#b026ff] rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-white font-bold">{testimonial.name}</h5>
                    <span className="text-sm text-gray-500">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
