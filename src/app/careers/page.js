"use client";

import { useState, useRef } from "react";
import {
  Briefcase,
  GraduationCap,
  UploadCloud,
  Check,
  FileText,
  Sparkles,
  Send,
  ArrowRight,
  Lock,
  Cpu,
  ChevronRight,
  Wand2,
  Trash2,
  Clock,
  MapPin
} from "lucide-react";

export default function Careers() {
  // Roles Data
  const fullTimeRoles = [];

  const internshipRoles = [
    {
      id: "full-stack-intern",
      title: "Full-Stack Web Developer (Intern)",
      type: "Internship (6 Months)",
      department: "Engineering",
      location: "Remote / Sagar, KA",
      icon: Wand2,
      duration: "6 Months",
      color: "text-[#00f0ff] border-[#00f0ff]/20 bg-[#00f0ff]/5 hover:border-[#00f0ff]/50",
      description: "Hone your full-stack engineering spells by building real-world digital applications. Work with Next.js, Node.js, and Tailwind CSS under the mentorship of veteran wizards.",
      requirements: [
        "Familiarity with HTML, CSS, JavaScript, and React",
        "Basic understanding of databases and REST APIs",
        "Eager to learn and collaborate with a coven of senior wizards"
      ]
    }
  ];

  // Perks List
  const perks = [
    { title: "Remote-First", desc: "Work from the comfort of your wizard tower or anywhere in the world.", icon: Briefcase },
    { title: "Cutting Edge Tech", desc: "Cast spells with Next.js, LLMs, Vector Databases, and Kubernetes.", icon: Cpu },
    { title: "Mentorship & Growth", desc: "Learn directly from senior wizards who have built massive platforms.", icon: Sparkles },
    { title: "Secure Mindset", desc: "Incorporate security directly into coding. Become a guardian of code.", icon: Lock }
  ];

  // Component States
  const [activeTab, setActiveTab] = useState("internship"); // Land on "internship" as it has active roles
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      question: "Who can apply for the internship?",
      answer: "Any student or self-taught developer looking to gain real-world project experience. Basic knowledge of HTML, CSS, JS, and React is expected."
    },
    {
      question: "Is the internship remote or on-site?",
      answer: "We operate remote-first, allowing you to work from anywhere."
    },
    {
      question: "What is the selection process?",
      answer: "After you submit your application scroll, our wizards will review your portfolio. Selected apprentices are invited for a technical chat and code review."
    },
    {
      question: "Is this a paid internship?",
      answer: "Yes, all our apprenticeships are stipend-based, accompanied by certification and letters of recommendation upon completion."
    },
    {
      question: "What technologies will I work with?",
      answer: "You will be working with React, Next.js, Node.js, Tailwind CSS, and various AI integrations."
    }
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    appType: "internship", // Default to internship since only internship is active
    role: "Full-Stack Web Developer (Intern)",
    portfolio: "",
    coverLetter: ""
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [appId, setAppId] = useState("");

  const fileInputRef = useRef(null);
  const formSectionRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Automatically sync role lists if the type changes
    if (name === "appType") {
      const defaultRole = value === "job"
        ? "General Application (Full-Time)"
        : "Full-Stack Web Developer (Intern)";
      setFormData(prev => ({
        ...prev,
        appType: value,
        role: defaultRole
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Drag and Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setErrorMsg("Invalid file type. Please upload a PDF or DOCX resume.");
      return;
    }

    if (file.size > maxSize) {
      setErrorMsg("File is too large. Resume must be less than 5MB.");
      return;
    }

    setResumeFile(file);
    setErrorMsg("");
  };

  const removeFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleApplyClick = (roleObj, type) => {
    setFormData(prev => ({
      ...prev,
      appType: type,
      role: roleObj.title
    }));

    // Smooth scroll to form section
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      setErrorMsg("Please upload your resume to cast your application.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("appType", formData.appType);
      data.append("role", formData.role);
      data.append("portfolio", formData.portfolio);
      data.append("coverLetter", formData.coverLetter);
      data.append("resume", resumeFile);

      const response = await fetch("/api/careers", {
        method: "POST",
        body: data,
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setIsSuccess(true);
        setAppId(resData.id);
        // Clear form
        setFormData({
          name: "",
          email: "",
          phone: "",
          appType: "job",
          role: "Full-Stack Wizard (Software Engineer)",
          portfolio: "",
          coverLetter: ""
        });
        setResumeFile(null);
      } else {
        setErrorMsg(resData.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMsg("Failed to connect to the wizard portal. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetSuccessState = () => {
    setIsSuccess(false);
    setAppId("");
  };

  return (
    <div className="flex flex-col w-full overflow-hidden pt-20">
      {/* 1. Hero Section */}
      <section className="py-24 relative bg-[#030014]">
        {/* Neon Background Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00f0ff]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#b026ff]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-[#ffffff]/5 rounded-full px-4 py-2 mb-8 border border-[#b026ff]/30 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#b026ff]" />
            <span className="text-sm font-medium text-[#b026ff] uppercase tracking-wider">Join Our Coven</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Shape the Future of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#b026ff]">
              Digital Magic
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            We are looking for brilliant engineers, cybersecurity defenders, and creative minds who want to challenge conventions and craft secure, high-octane products.
          </p>
          <button
            onClick={() => formSectionRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-[#00f0ff] to-[#b026ff] hover:opacity-90 box-glow-blue transition-all duration-300 inline-flex items-center group"
          >
            Apply Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* 2. Perks & Culture Section */}
      <section className="py-20 relative bg-[#050310] border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#00f0ff] font-semibold tracking-wide uppercase text-sm mb-3">Why Work With Us</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">Magical Benefits</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, idx) => (
              <div
                key={idx}
                className="bg-[#ffffff]/5 border border-gray-800 hover:border-[#b026ff]/30 p-8 rounded-2xl transition-all duration-300 group hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-[#b026ff]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#b026ff]/20 transition-colors">
                  <perk.icon className="w-6 h-6 text-[#b026ff]" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{perk.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Open Positions Section */}
      <section className="py-24 relative bg-[#030014]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[#b026ff] font-semibold tracking-wide uppercase text-sm mb-3">Careers</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">Open Grimoires</h3>
            <p className="text-gray-400 max-w-xl mx-auto">
              Select one of our open paths. Apply today and showcase your arcane capabilities.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-[#ffffff]/5 border border-gray-800 p-1.5 rounded-full flex space-x-2">
              <button
                onClick={() => setActiveTab("fulltime")}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 flex items-center ${activeTab === "fulltime"
                    ? "bg-gradient-to-r from-[#00f0ff] to-[#b026ff] text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                  }`}
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Full-Time Roles
              </button>
              <button
                onClick={() => setActiveTab("internship")}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 flex items-center ${activeTab === "internship"
                    ? "bg-gradient-to-r from-[#00f0ff] to-[#b026ff] text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                  }`}
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Internships
              </button>
            </div>
          </div>

          {/* Roles Cards Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {activeTab === "fulltime" ? (
              fullTimeRoles.length > 0 ? (
                fullTimeRoles.map((role) => (
                  <div
                    key={role.id}
                    className="bg-[#050310] border border-gray-800 rounded-3xl p-8 flex flex-col justify-between hover:border-gray-700 transition-all duration-300 relative group"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <span className="bg-[#00f0ff]/10 text-[#00f0ff] px-3 py-1 rounded-full text-xs font-semibold">
                          {role.department}
                        </span>
                        <span className="flex items-center text-xs text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          {role.location}
                        </span>
                      </div>

                      <h4 className="text-xl font-bold text-white mb-4 group-hover:text-[#00f0ff] transition-colors">
                        {role.title}
                      </h4>

                      <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        {role.description}
                      </p>

                      <div className="border-t border-gray-800/80 pt-6 mb-8">
                        <h5 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-3">Requirements:</h5>
                        <ul className="space-y-2.5">
                          {role.requirements.map((req, idx) => (
                            <li key={idx} className="text-gray-400 text-xs flex items-start">
                              <ChevronRight className="w-4 h-4 text-[#b026ff] flex-shrink-0 mr-1.5 mt-0.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button
                      onClick={() => handleApplyClick(role, "job")}
                      className="w-full py-3.5 rounded-xl border border-[#00f0ff]/30 text-white font-bold text-sm bg-transparent hover:bg-gradient-to-r hover:from-[#00f0ff] hover:to-[#b026ff] hover:border-transparent transition-all duration-300 flex items-center justify-center group/btn"
                    >
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-full bg-[#050310]/50 border border-gray-800 rounded-3xl p-12 text-center max-w-2xl mx-auto backdrop-blur-sm relative overflow-hidden box-glow-purple">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#b026ff]/30 to-transparent"></div>
                  <div className="w-16 h-16 bg-[#b026ff]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#b026ff]/20">
                    <Briefcase className="w-8 h-8 text-[#b026ff]" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">No Active Full-Time Openings</h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    There are no open full-time positions at this exact moment. However, we are always on the lookout for legendary wizards. You can still submit a general application below, and we will contact you when a slot opens!
                  </p>
                  <button
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        appType: "job",
                        role: "General Application (Full-Time)"
                      }));
                      formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-6 py-3 rounded-xl border border-[#b026ff]/30 hover:border-[#b026ff] hover:bg-[#b026ff]/10 text-white font-bold text-sm transition-all"
                  >
                    Submit General Application
                  </button>
                </div>
              )
            ) : (
              internshipRoles.map((role) => (
                <div
                  key={role.id}
                  className="bg-[#050310] border border-gray-800 rounded-3xl p-8 flex flex-col justify-between hover:border-gray-700 transition-all duration-300 relative group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="bg-[#b026ff]/10 text-[#b026ff] px-3 py-1 rounded-full text-xs font-semibold">
                        {role.department}
                      </span>
                      <span className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {role.duration}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-white mb-4 group-hover:text-[#b026ff] transition-colors">
                      {role.title}
                    </h4>

                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {role.description}
                    </p>

                    <div className="border-t border-gray-800/80 pt-6 mb-8">
                      <h5 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-3">Requirements:</h5>
                      <ul className="space-y-2.5">
                        {role.requirements.map((req, idx) => (
                          <li key={idx} className="text-gray-400 text-xs flex items-start">
                            <ChevronRight className="w-4 h-4 text-[#00f0ff] flex-shrink-0 mr-1.5 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => handleApplyClick(role, "internship")}
                    className="w-full py-3.5 rounded-xl border border-[#b026ff]/30 text-white font-bold text-sm bg-transparent hover:bg-gradient-to-r hover:from-[#00f0ff] hover:to-[#b026ff] hover:border-transparent transition-all duration-300 flex items-center justify-center group/btn"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 4. Application Form Section */}
      <section
        id="apply-form-section"
        ref={formSectionRef}
        className="py-24 relative bg-[#050310] border-t border-gray-850"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00f0ff] to-[#b026ff]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Cast Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#b026ff]">Application</span>
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              Ready to reveal your wizardry? Fill out the scrolls below to submit your details and resume.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start mt-16">
            {/* FAQ Accordion Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="mb-4">
                <span className="text-[#00f0ff] font-semibold tracking-wider uppercase text-xs block mb-2">FAQ</span>
                <h3 className="text-2xl font-bold text-white mb-3">Frequently Asked Questions</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Have questions about the application scroll or the apprenticeship process? We have conjured some quick answers.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="bg-[#030014] border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-700"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center text-white hover:text-[#00f0ff] transition-colors"
                      >
                        <span className="font-semibold text-sm leading-relaxed pr-4">{faq.question}</span>
                        <span className={`text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-90 text-[#00f0ff]" : ""}`}>
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </button>

                      <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[200px] border-t border-gray-800/50" : "max-h-0"
                          }`}
                      >
                        <div className="p-6 text-xs text-gray-400 leading-relaxed bg-[#050310]/50">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form Section */}
            <div className="lg:col-span-3 bg-[#030014] border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
              {isSuccess ? (
                // Success Screen
                <div className="text-center py-12 px-4 flex flex-col items-center">
                  <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-8 animate-bounce">
                    <Check className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Spell Cast Successfully!</h3>
                  <p className="text-gray-400 max-w-md mb-2 leading-relaxed">
                    Your application has been conjured into our systems. The high council of Wizards will examine your scroll shortly.
                  </p>
                  <div className="bg-[#050310] border border-gray-800 px-4 py-2.5 rounded-lg mb-8 text-xs font-mono text-gray-500">
                    Application ID: <span className="text-[#00f0ff]">{appId}</span>
                  </div>
                  <button
                    onClick={resetSuccessState}
                    className="px-6 py-3 rounded-full font-bold text-sm bg-gradient-to-r from-[#00f0ff] to-[#b026ff] text-white hover:opacity-90 box-glow-blue transition-all"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                // Form screen
                <form onSubmit={handleSubmit} className="space-y-8">
                  {errorMsg && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm font-medium">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-400 mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-[#050310] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all"
                        placeholder="Ged the Wizard"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-400 mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-[#050310] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#b026ff] focus:ring-1 focus:ring-[#b026ff] transition-all"
                        placeholder="ged@earthsea.org"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-400 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-[#050310] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    {/* Portfolio/LinkedIn Link */}
                    <div>
                      <label htmlFor="portfolio" className="block text-sm font-semibold text-gray-400 mb-2">Portfolio / LinkedIn URL</label>
                      <input
                        type="url"
                        id="portfolio"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        className="w-full bg-[#050310] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#b026ff] focus:ring-1 focus:ring-[#b026ff] transition-all"
                        placeholder="https://github.com/wizard"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* App Type */}
                    <div>
                      <label htmlFor="appType" className="block text-sm font-semibold text-gray-400 mb-2">Application Type</label>
                      <select
                        id="appType"
                        name="appType"
                        value={formData.appType}
                        onChange={handleInputChange}
                        className="w-full bg-[#050310] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all"
                      >
                        <option value="job">Full-Time Job</option>
                        <option value="internship">Internship</option>
                      </select>
                    </div>

                    {/* Role list */}
                    <div>
                      <label htmlFor="role" className="block text-sm font-semibold text-gray-400 mb-2">Position of Interest</label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full bg-[#050310] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#b026ff] focus:ring-1 focus:ring-[#b026ff] transition-all"
                      >
                        {formData.appType === "job" ? (
                          <>
                            <option value="General Application (Full-Time)">General Application (Full-Time)</option>
                          </>
                        ) : (
                          <>
                            <option value="Full-Stack Web Developer (Intern)">Full-Stack Web Developer (Intern)</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  {/* Drag and Drop Resume */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Upload Resume</label>
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${isDragging
                          ? "border-[#00f0ff] bg-[#00f0ff]/5 box-glow-blue"
                          : resumeFile
                            ? "border-green-500/50 bg-green-500/5"
                            : "border-gray-800 bg-[#050310] hover:border-gray-700"
                        }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                      />

                      {resumeFile ? (
                        <div className="flex flex-col items-center">
                          <FileText className="w-12 h-12 text-green-500 mb-3" />
                          <span className="text-white text-sm font-semibold mb-1">{resumeFile.name}</span>
                          <span className="text-gray-500 text-xs mb-4">
                            {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile();
                            }}
                            className="px-3.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-bold flex items-center transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-1" />
                            Remove Scroll
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <UploadCloud className="w-12 h-12 text-gray-500 mb-3 group-hover:text-white transition-colors" />
                          <p className="text-gray-300 text-sm font-semibold mb-1">
                            Drag and drop your resume file here
                          </p>
                          <p className="text-gray-500 text-xs">
                            Supports PDF, DOCX up to 5MB
                          </p>
                          <button
                            type="button"
                            className="mt-4 px-4 py-2 bg-[#ffffff]/5 hover:bg-[#ffffff]/10 text-white rounded-lg text-xs font-bold border border-gray-800 transition-colors"
                          >
                            Select File
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <label htmlFor="coverLetter" className="block text-sm font-semibold text-gray-400 mb-2">
                      Tell us about your "magic" (Brief introduction / Cover Letter)
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      rows="6"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      className="w-full bg-[#050310] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#b026ff] focus:ring-1 focus:ring-[#b026ff] transition-all resize-none"
                      placeholder="Describe your wizardry skills, side projects, or what gets you excited about engineering..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4.5 rounded-xl font-bold text-white flex items-center justify-center transition-all duration-300 ${isSubmitting
                        ? "bg-purple-950/50 text-gray-400 cursor-not-allowed border border-purple-900/30"
                        : "bg-gradient-to-r from-[#00f0ff] to-[#b026ff] hover:opacity-90 box-glow-blue"
                      }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <Sparkles className="w-5 h-5 mr-2 text-[#00f0ff] animate-spin" />
                        Conjuring Application...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Submit Application <Send className="ml-2 w-5 h-5" />
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
