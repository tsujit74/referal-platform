// src/pages/Dashboard.tsx
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/authContext";
import {
  Users,
  Gift,
  Star,
  Trash2,
  Edit2,
  Plus,
  RefreshCcw,
} from "lucide-react";
import api from "../api/api";
import { useError } from "../context/ErrorContext";
import { useSuccess as useSuccessMessage } from "../context/SuccessContext";
import ReferralForm from "../components/ReferralForm";

interface Referral {
  _id: string;
  title: string;
  company: string;
  description: string;
  status: string;
}

interface DashboardStats {
  referrals: number;
  rewards: number;
  rank: number;
  referralList: Referral[];
}
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const { setErrors } = useError();
  const { addMessage } = useSuccessMessage();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReferral, setEditingReferral] = useState<Referral | null>(null);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      const [referralsRes] = await Promise.all([
        api.get(`/referral/user`),
        delay(2000),
      ]);

      setStats({
        referrals: referralsRes.data.length,
        rewards: 0,
        rank: 1,
        referralList: referralsRes.data,
      });
    } catch (err: any) {
      console.error("Dashboard fetch error:", err);
      const msg = err?.response?.data?.message || "Failed to load dashboard";
      setErrorMsg(msg);
      setErrors([msg]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchDashboard();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this referral?")) return;
    try {
      await api.delete(`/referral/${id}`);
      addMessage("Referral deleted successfully!");
      fetchDashboard();
    } catch (err: any) {
      setErrors([err?.response?.data?.message || "Failed to delete referral"]);
    }
  };

  const handleEdit = (ref: Referral) => {
    setEditingReferral(ref);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingReferral(null);
    setIsModalOpen(true);
  };

  // Skeleton Loader
  const SkeletonCard = () => (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 animate-pulse">
      <div className="w-12 h-12 bg-gray-200 rounded-full mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
      <div className="h-6 bg-gray-200 rounded w-16"></div>
    </div>
  );

  const SkeletonReferral = () => (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-20 mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-40 mb-2"></div>
      <div className="h-5 bg-gray-200 rounded w-16"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 min-h-[calc(100vh-160px)]">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Loading Dashboard...
        </h1>
        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        {/* Referrals Skeleton */}
        <div className="space-y-4">
          <SkeletonReferral />
          <SkeletonReferral />
          <SkeletonReferral />
        </div>
      </div>
    );
  }

  // Error State
  if (errorMsg) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center text-center px-4">
        <p className="text-red-600 font-medium mb-4">{errorMsg}</p>
        <button
          onClick={fetchDashboard}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <RefreshCcw size={18} className="mr-2" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 min-h-[calc(100vh-160px)]">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Welcome back, {user?.name || "User"} 👋
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white rounded-2xl shadow-md flex flex-col items-center justify-center border border-gray-100"
        >
          <Users size={40} className="text-indigo-600 mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">Referrals</h3>
          <p className="text-2xl font-bold text-indigo-600">
            {stats?.referrals ?? 0}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white rounded-2xl shadow-md flex flex-col items-center justify-center border border-gray-100"
        >
          <Gift size={40} className="text-green-600 mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">Rewards</h3>
          <p className="text-2xl font-bold text-green-600">
            ₹{stats?.rewards ?? 0}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white rounded-2xl shadow-md flex flex-col items-center justify-center border border-gray-100"
        >
          <Star size={40} className="text-yellow-500 mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">Rank</h3>
          <p className="text-2xl font-bold text-yellow-600">
            #{stats?.rank ?? "--"}
          </p>
        </motion.div>
      </div>

      {/* Referral List Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">My Referrals</h2>
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus size={18} className="mr-2" />
          Add Referral
        </button>
      </div>

      {/* Referral List */}
      {!stats?.referralList || stats.referralList.length === 0 ? (
        <p className="text-gray-600">
          You have not added any referrals yet. Start by clicking{" "}
          <span className="font-medium">Add Referral</span>.
        </p>
      ) : (
        <div className="grid gap-4">
          {stats.referralList.map((ref) => (
            <div
              key={ref._id}
              className="bg-white p-4 rounded-xl shadow-md flex justify-between items-start border border-gray-100"
            >
              <div>
                <h3 className="text-lg font-bold">{ref.title}</h3>
                <p className="text-gray-600">{ref.company}</p>
                <p className="text-gray-500 text-sm">{ref.description}</p>
                <span
                  className={`mt-2 inline-block px-2 py-1 text-xs rounded-full ${
                    ref.status === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : ref.status === "Accepted"
                      ? "bg-green-200 text-green-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {ref.status}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => handleEdit(ref)}
                >
                  <Edit2 />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(ref._id)}
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <ReferralForm
              existingReferral={editingReferral}
              onSuccess={() => {
                fetchDashboard();
                setIsModalOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
