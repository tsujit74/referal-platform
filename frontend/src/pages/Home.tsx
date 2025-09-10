import { Link } from "react-router-dom";
import { Users, Sun, CheckCircle, Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen font-sans">
      {/* Hero Section */}
      <div className="bg-indigo-600 text-white p-10 md:p-20 rounded-b-3xl shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Referral Platform</h1>
            <p className="text-lg md:text-xl opacity-90 mb-6">
              Create, manage, and share job referrals easily. Track your candidates
              and stay updated.
            </p>
            <div className="flex justify-center md:justify-start gap-4 flex-wrap">
              <Link
                to="/dashboard"
                className="px-8 py-3 bg-white text-indigo-700 font-bold rounded-full shadow hover:bg-gray-100 transition"
              >
                Go to Dashboard
              </Link>
              <Link
                to="/public-feed"
                className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-indigo-700 transition"
              >
                Explore Referrals
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 text-center mt-8 md:mt-0">
            <img
              src="/images/Referral.png"
              alt="Referral illustration"
              className="rounded-2xl shadow-md max-h-80 mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border">
            <Users size={32} className="text-indigo-600" />
            <div>
              <h3 className="font-bold text-lg mb-1">Manage Referrals</h3>
              <p className="text-gray-500">Create and track referrals for any company easily.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border">
            <Sun size={32} className="text-green-600" />
            <div>
              <h3 className="font-bold text-lg mb-1">Clean Interface</h3>
              <p className="text-gray-500">Simple, distraction-free layout for quick actions.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border">
            <CheckCircle size={32} className="text-yellow-600" />
            <div>
              <h3 className="font-bold text-lg mb-1">Track Status</h3>
              <p className="text-gray-500">Monitor pending, accepted, or closed referrals.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border">
            <Mail size={32} className="text-red-600" />
            <div>
              <h3 className="font-bold text-lg mb-1">Stay Updated</h3>
              <p className="text-gray-500">Get notifications about referral activity and candidates.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-indigo-600 text-white p-12 rounded-xl shadow-md border border-indigo-400">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to start referring?</h3>
          <p className="mb-6">Join now and manage your referrals efficiently.</p>
          <Link
            to="/dashboard"
            className="px-10 py-3 bg-white text-indigo-700 font-bold rounded-full shadow hover:bg-gray-100 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
