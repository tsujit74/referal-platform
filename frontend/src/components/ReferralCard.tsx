import { motion } from "framer-motion";
import { Gift, Users } from "lucide-react";

interface ReferralCardProps {
  code: string;
  referrals: number;
  rewards: string;
}

export default function ReferralCard({ code, referrals, rewards }: ReferralCardProps) {
  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col gap-4 max-w-md w-full"
      whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800">Referral Program</h3>
        <Gift className="text-indigo-600" size={28} />
      </div>

      {/* Referral Code */}
      <div className="bg-gray-100 rounded-xl px-4 py-3 text-center">
        <p className="text-sm text-gray-500">Your Referral Code</p>
        <p className="text-2xl font-bold text-indigo-700">{code}</p>
      </div>

      {/* Stats */}
      <div className="flex justify-between items-center text-gray-700">
        <div className="flex items-center gap-2">
          <Users className="text-green-600" size={22} />
          <span className="font-medium">{referrals} Referrals</span>
        </div>
        <div className="text-sm font-medium text-indigo-600">{rewards}</div>
      </div>

      {/* CTA */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition-colors"
        onClick={() => navigator.clipboard.writeText(code)}
      >
        Copy Code & Share
      </motion.button>
    </motion.div>
  );
}
