import { Code2, Shield, Cpu, Database, Cloud, Smartphone } from "lucide-react";

export default function WhatWeDo() {
  const services = [
    {
      icon: Code2,
      title: "Custom Web Development",
      desc: "We build highly responsive, scalable, and visually stunning web applications using modern frameworks like Next.js and React. From simple marketing sites to complex SaaS platforms, we deliver excellence."
    },
    {
      icon: Shield,
      title: "Cybersecurity Audits",
      desc: "Protect your business from emerging threats. Our experts conduct thorough penetration testing, code reviews, and infrastructure audits to ensure your data remains impenetrable."
    },
    {
      icon: Cpu,
      title: "AI & Machine Learning",
      desc: "Harness the power of AI to automate processes, gain actionable insights, and create personalized user experiences. We integrate LLMs and custom models directly into your workflows."
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      desc: "Scale infinitely with our cloud architecture services. We design, deploy, and manage robust AWS and Google Cloud environments optimized for performance and cost-efficiency."
    },
    {
      icon: Database,
      title: "Data Engineering",
      desc: "Turn your raw data into a strategic asset. We build robust data pipelines, data warehouses, and analytics dashboards that empower data-driven decision making."
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      desc: "Reach your users everywhere. We build cross-platform and native mobile applications that offer seamless experiences on iOS and Android devices."
    }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden pt-20">
      {/* Header Section */}
      <section className="py-24 relative bg-[#030014]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00f0ff]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#b026ff]">Services</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive digital solutions designed to propel your business forward. We blend technical mastery with strategic vision.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-[#050310] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div 
                key={idx} 
                className="bg-[#030014] border border-gray-800 hover:border-[#00f0ff]/50 p-8 rounded-2xl transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00f0ff] to-[#b026ff] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="w-16 h-16 bg-[#00f0ff]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00f0ff]/20 transition-colors">
                  <service.icon className="w-8 h-8 text-[#00f0ff]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to start your digital transformation?</h2>
          <p className="text-gray-400 mb-10 text-lg">Let's discuss how our technical expertise can solve your most complex business challenges.</p>
          <a 
            href="/connect" 
            className="inline-block px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-[#00f0ff] to-[#b026ff] hover:opacity-90 box-glow-blue transition-all duration-300"
          >
            Start a Project
          </a>
        </div>
      </section>
    </div>
  );
}
