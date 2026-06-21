"use client";

import { useState } from "react";
import { 
  Lock, 
  Unlock, 
  Search, 
  FileText, 
  Mail, 
  Phone, 
  ExternalLink, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  LogOut, 
  Eye, 
  X, 
  Sparkles,
  ArrowLeft,
  Trash2
} from "lucide-react";
import Link from "next/link";

export default function AdminPortal() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApp, setSelectedApp] = useState(null); // For cover letter modal

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/admin/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAuthenticated(true);
        setApplications(data.applications || []);
      } else {
        setErrorMsg(data.error || "Access Denied. Incorrect passcode.");
      }
    } catch (error) {
      console.error("Login fetch error:", error);
      setErrorMsg("Failed to connect to the authentication portal.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setApplications([]);
    setSearchQuery("");
    setSelectedApp(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this applicant record? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/applications?id=${id}&password=${encodeURIComponent(password)}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setApplications(prev => prev.filter(app => app.id !== id));
      } else {
        alert(data.error || "Failed to delete the application.");
      }
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("An error occurred while attempting to delete the application.");
    }
  };

  // Filter candidates based on query
  const filteredApps = applications.filter((app) => {
    const query = searchQuery.toLowerCase();
    return (
      app.name.toLowerCase().includes(query) ||
      app.email.toLowerCase().includes(query) ||
      app.phone.toLowerCase().includes(query) ||
      app.role.toLowerCase().includes(query) ||
      app.coverLetter.toLowerCase().includes(query)
    );
  });

  // Calculate statistics
  const totalCount = applications.length;
  const jobsCount = applications.filter((a) => a.appType === "job").length;
  const internsCount = applications.filter((a) => a.appType === "internship").length;

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] pt-20 px-4 relative bg-[#030014]">
        {/* Glows */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#b026ff]/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#00f0ff]/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-md w-full bg-[#050310] border border-gray-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-center z-10">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00f0ff] to-[#b026ff]"></div>
          
          <div className="w-16 h-16 bg-[#b026ff]/10 border border-[#b026ff]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-[#b026ff]" />
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">Applicants Registry</h1>
          <p className="text-gray-400 text-sm mb-6">
            Enter the admin passcode to retrieve candidate applications.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-xl text-xs font-semibold">
                {errorMsg}
              </div>
            )}
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin Passcode"
              required
              className="w-full bg-[#030014] border border-gray-800 rounded-xl px-4 py-3 text-white text-center focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#00f0ff] to-[#b026ff] hover:opacity-90 box-glow-blue transition-all duration-300 flex items-center justify-center"
            >
              {loading ? "Unlocking Vault..." : "Unlock Portal"}
            </button>
          </form>

          <Link href="/careers" className="inline-flex items-center text-gray-500 hover:text-white text-xs mt-6 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] pt-28 pb-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00f0ff]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#b026ff]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-gray-800/80">
          <div>
            <div className="flex items-center space-x-2 text-[#00f0ff] text-sm font-semibold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Wizard High Council</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">Applicant Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-bold flex items-center transition-all duration-300"
            >
              <LogOut className="w-4 h-4 mr-1.5" /> Lock Portal
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#050310] border border-gray-800 rounded-2xl p-6 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Total Applications</span>
              <h3 className="text-2xl font-bold text-white mt-0.5">{totalCount}</h3>
            </div>
          </div>
          <div className="bg-[#050310] border border-gray-800 rounded-2xl p-6 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Full-Time Jobs</span>
              <h3 className="text-2xl font-bold text-white mt-0.5">{jobsCount}</h3>
            </div>
          </div>
          <div className="bg-[#050310] border border-gray-800 rounded-2xl p-6 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Internships</span>
              <h3 className="text-2xl font-bold text-white mt-0.5">{internsCount}</h3>
            </div>
          </div>
        </div>

        {/* Control and Table Section */}
        <div className="bg-[#050310] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Search bar header */}
          <div className="p-6 border-b border-gray-800/80 bg-[#030014]/50 flex items-center relative">
            <Search className="w-5 h-5 text-gray-500 absolute left-10" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, role, email, phone, or cover letter..."
              className="w-full bg-[#030014] border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all"
            />
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {filteredApps.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800/80 text-gray-400 text-xs font-bold uppercase bg-[#030014]/25">
                    <th className="px-6 py-4">Applicant</th>
                    <th className="px-6 py-4">Applied Position</th>
                    <th className="px-6 py-4">Submission Date</th>
                    <th className="px-6 py-4">Documents & Links</th>
                    <th className="px-6 py-4 text-center">Cover Letter</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60">
                  {filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-white/5 transition-colors">
                      {/* Applicant info */}
                      <td className="px-6 py-5">
                        <div className="font-bold text-white text-base">{app.name}</div>
                        <div className="flex flex-col space-y-1 mt-1.5">
                          <a href={`mailto:${app.email}`} className="text-xs text-gray-400 hover:text-[#00f0ff] flex items-center transition-colors">
                            <Mail className="w-3.5 h-3.5 mr-1 text-[#b026ff]" /> {app.email}
                          </a>
                          <a href={`tel:${app.phone}`} className="text-xs text-gray-400 hover:text-[#00f0ff] flex items-center transition-colors">
                            <Phone className="w-3.5 h-3.5 mr-1 text-[#00f0ff]" /> {app.phone}
                          </a>
                        </div>
                      </td>

                      {/* Position */}
                      <td className="px-6 py-5">
                        <div className="font-semibold text-white text-sm">{app.role}</div>
                        <div className="mt-1">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            app.appType === "job" 
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" 
                              : "bg-green-500/10 text-green-400 border border-green-500/20"
                          }`}>
                            {app.appType === "job" ? "Job" : "Internship"}
                          </span>
                        </div>
                      </td>

                      {/* Submitted At */}
                      <td className="px-6 py-5 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                          <div>
                            <div>{new Date(app.submittedAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}</div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {new Date(app.submittedAt).toLocaleTimeString(undefined, { timeStyle: 'short' })}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Documents / Links */}
                      <td className="px-6 py-5">
                        <div className="flex flex-col space-y-2">
                          {/* Resume Download */}
                          <a
                            href={`/api/admin/resumes?filename=${encodeURIComponent(app.resumeFilename)}&originalname=${encodeURIComponent(app.resumeOriginalName)}&password=${encodeURIComponent(password)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs text-[#00f0ff] hover:underline"
                          >
                            <FileText className="w-3.5 h-3.5 mr-1.5" />
                            {app.resumeOriginalName || "Download Resume"}
                          </a>
                          
                          {/* Portfolio */}
                          {app.portfolio ? (
                            <a
                              href={app.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-xs text-[#b026ff] hover:underline"
                            >
                              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                              View Portfolio
                            </a>
                          ) : (
                            <span className="text-xs text-gray-600 italic">No portfolio provided</span>
                          )}
                        </div>
                      </td>

                      {/* Cover Letter Expander */}
                      <td className="px-6 py-5 text-center">
                        {app.coverLetter ? (
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="p-2 bg-[#ffffff]/5 hover:bg-[#b026ff]/10 text-gray-300 hover:text-white rounded-xl border border-gray-800 hover:border-[#b026ff]/30 transition-all inline-flex items-center justify-center"
                          >
                            <Eye className="w-4 h-4 mr-1.5" /> Read
                          </button>
                        ) : (
                          <span className="text-xs text-gray-600 italic">None</span>
                        )}
                      </td>

                      {/* Delete Action */}
                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 rounded-xl transition-all inline-flex items-center justify-center"
                          title="Delete Applicant"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center text-gray-500">
                <FileText className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                <p className="text-base font-semibold text-gray-400">No applicants found</p>
                <p className="text-xs text-gray-500 mt-1">
                  Try adjusting your search query or verify your passcode credentials.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cover Letter Modal Popup */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030014]/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#050310] border border-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Gradient border top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00f0ff] to-[#b026ff]"></div>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800/80 bg-[#030014]/50">
              <div>
                <span className="text-xs font-semibold text-[#b026ff] uppercase tracking-wider">Candidate Pitch</span>
                <h4 className="text-lg font-bold text-white mt-0.5">{selectedApp.name}</h4>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white bg-[#ffffff]/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 max-h-[60vh] overflow-y-auto">
              <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line font-medium bg-[#030014] p-6 rounded-2xl border border-gray-850">
                {selectedApp.coverLetter}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end px-6 py-4 border-t border-gray-800/85 bg-[#030014]/50">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-5 py-2.5 bg-gradient-to-r from-[#00f0ff] to-[#b026ff] hover:opacity-90 rounded-xl font-bold text-xs text-white box-glow-blue transition-all"
              >
                Close Scroll
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
