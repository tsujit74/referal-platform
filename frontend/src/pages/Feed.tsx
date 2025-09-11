// src/pages/Feed.tsx
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { RefreshCcw, Search } from "lucide-react";
import api from "../api/api";
import { useError } from "../context/ErrorContext";

interface Referral {
  _id: string;
  userId: { name: string; email: string };
  title: string;
  company: string;
  description: string;
  status: string;
  createdAt: string;
}

export default function Feed() {
  const { setErrors } = useError();

  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Search & Filter
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Debounce search (wait 500ms after typing)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim().toLowerCase());
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchReferrals = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await api.get("/referral");
      setReferrals(res.data || []);
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to load feed";
      setErrorMsg(msg);
      setErrors([msg]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchReferrals();
    }, 2000);
  }, []);

  // Filter + Search logic
  const filteredReferrals = useMemo(() => {
    return referrals.filter((ref) => {
      const matchesSearch =
        ref.title.toLowerCase().includes(debouncedSearch) ||
        ref.company.toLowerCase().includes(debouncedSearch) ||
        ref.userId?.name?.toLowerCase().includes(debouncedSearch);

      const matchesStatus =
        statusFilter === "all" || ref.status.toLowerCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [referrals, debouncedSearch, statusFilter]);

  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 animate-pulse">
      <div className="h-5 w-40 bg-gray-200 rounded mb-3"></div>
      <div className="h-4 w-60 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-32 bg-gray-200 rounded"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        {[...Array(3)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-red-600 font-medium mb-4">{errorMsg}</p>
        <button
          onClick={fetchReferrals}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <RefreshCcw size={18} className="mr-2" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Public Referrals Feed</h1>

      {/* Search + Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        {/* Search Bar */}
        <div className="relative w-full md:w-2/3">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, company, or name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Filter Dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Referrals List */}
      {filteredReferrals.length === 0 ? (
        <div className="text-center text-gray-600 py-12">
          No referrals match your search/filter.
        </div>
      ) : (
        filteredReferrals.map((ref) => (
          <motion.div
            key={ref._id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-md border border-gray-100 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {ref.title}
            </h2>
            <p className="text-gray-600 mb-2">Company: {ref.company}</p>
            <p className="text-gray-700 mb-4">{ref.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>
                By {ref.userId?.name} ·{" "}
                {new Date(ref.createdAt).toLocaleDateString()} ·{" "}
                <span className="font-medium text-indigo-600">{ref.status}</span>
              </span>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}
