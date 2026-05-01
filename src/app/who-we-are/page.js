import { Target, Lightbulb, Users, ShieldCheck } from "lucide-react";

export default function WhoWeAre() {
  return (
    <div className="flex flex-col w-full overflow-hidden pt-20">
      {/* Header Section */}
      <section className="py-24 relative bg-[#030014]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#b026ff]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Meet The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#b026ff]">Wizards</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We are a collective of technologists, designers, and strategists bound by a single mission: to build digital solutions that defy expectations.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Genesis Story</h2>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                Encrypted Wizards was born from frustration. Our founders, having spent decades in enterprise IT, were tired of the bloated, slow, and insecure delivery models prevalent in the industry.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                We set out to create an agency that operates like a special forces unit: small, elite, fast, and utilizing the absolute best technology available. Today, we bring that startup agility and enterprise-grade security to companies around the globe.
              </p>
            </div>
            <div className="relative h-96 bg-[#ffffff]/5 border border-gray-800 rounded-3xl overflow-hidden flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/20 to-[#b026ff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Users className="w-32 h-32 text-gray-700 group-hover:text-[#00f0ff] transition-colors duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-[#050310] border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Core Tenets</h2>
            <p className="text-gray-400 text-lg">The principles that guide every line of code we write.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: "Relentless Innovation",
                desc: "We don't settle for the standard way. If there is a faster, more secure, or more elegant solution, we will find it and use it."
              },
              {
                icon: ShieldCheck,
                title: "Security by Default",
                desc: "In a hostile digital world, security is not a feature; it's the foundation. We build fortresses, not sandcastles."
              },
              {
                icon: Target,
                title: "Absolute Precision",
                desc: "Measure twice, cut once. We architect with precision so that when we scale your product, it performs flawlessly."
              }
            ].map((val, idx) => (
              <div key={idx} className="bg-[#030014] p-8 rounded-2xl border border-gray-800 hover:border-[#b026ff]/50 transition-all duration-300">
                <val.icon className="w-12 h-12 text-[#b026ff] mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                <p className="text-gray-400">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
