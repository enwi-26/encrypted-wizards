import {
  CheckCircle,
  User,
  Hash,
  GraduationCap,
  Briefcase,
  BookOpen,
  Clock,
  CheckCircle2,
  Calendar,
  Award,
  XCircle
} from "lucide-react";
import internsData from "@/data/interns.json";

export async function generateStaticParams() {
  return internsData.map((intern) => ({
    id: intern.id,
  }));
}

export default async function VerifyPage({ params }) {
  const { id } = await params;
  const intern = internsData.find((i) => i.id === id);

  if (!intern) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <XCircle className="w-24 h-24 text-red-500 mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">Invalid Certificate</h1>
        <p className="text-gray-400 text-center max-w-md">
          The verification ID provided does not exist in our records. Please check the ID and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-36 bg-[#030014]">

      {/* Title Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide mb-3">
          Certificate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#b026ff]">Verification</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Official Encrypted Wizards Credential Validation
        </p>
      </div>

      {/* Main Card */}
      <div className="max-w-4xl w-full bg-[#0a0a0e] rounded-2xl border border-gray-800 shadow-2xl overflow-hidden relative">

        {/* Glow Effects behind the card borders */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none border border-transparent shadow-[0_0_15px_rgba(0,240,255,0.1)]"></div>

        {/* Card Header */}
        <div className="relative p-6 md:p-8 border-b border-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden">
          {/* Subtle gradient background for header */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff]/10 to-[#b026ff]/10 pointer-events-none"></div>

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-full border-2 border-[#00f0ff] flex items-center justify-center bg-[#00f0ff]/10 shrink-0">
              <CheckCircle className="w-7 h-7 text-[#00f0ff]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Verified Credential</h2>
              <p className="text-[#00f0ff] font-medium mt-1">ID: {intern.id}</p>
            </div>
          </div>

          <div className="text-left md:text-right relative z-10">
            <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Status</p>
            <p className="text-green-400 font-bold text-xl">Active & Valid</p>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 relative z-10">

          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2 text-gray-400">
                <User className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Candidate Name</span>
              </div>
              <p className="text-2xl font-bold text-white">{intern.name}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2 text-gray-400">
                <Hash className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">UUCMS Number</span>
              </div>
              <p className="text-lg text-white font-mono">{intern.uucms_number}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2 text-gray-400">
                <GraduationCap className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">College Name</span>
              </div>
              <p className="text-lg text-white font-medium">{intern.college_name}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2 text-gray-400">
                <Briefcase className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Domain</span>
              </div>
              <p className="text-lg text-white font-medium">{intern.domain}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2 text-gray-400">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Project Title</span>
              </div>
              <p className="text-xl font-bold text-[#b026ff]">{intern.project_title}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Duration</span>
                </div>
                <p className="text-lg text-white font-medium">{intern.duration}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Status</span>
                </div>
                <p className="text-lg text-white font-medium">{intern.status}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Start Date</span>
                </div>
                <p className="text-base text-gray-300">{intern.start_date}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">End Date</span>
                </div>
                <p className="text-base text-gray-300">{intern.end_date}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2 text-gray-400">
                <Award className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Certificate ID</span>
              </div>
              <div className="inline-block bg-[#16161e] border border-gray-800 rounded px-4 py-2">
                <p className="text-gray-400 font-mono">{intern.id}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Card Footer */}
        <div className="bg-[#0e0e14] py-4 text-center border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            This is an officially verified document by Encrypted Wizards.
          </p>
        </div>
      </div>
    </div>
  );
}
