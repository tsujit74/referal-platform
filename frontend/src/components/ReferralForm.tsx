import { useState, useEffect } from "react";
import api from "../api/api";
import { useError } from "../context/ErrorContext";
import { useSuccess } from "../context/SuccessContext";

interface Referral {
  _id?: string;
  title: string;
  company: string;
  description: string;
  status: string;
}

interface ReferralFormProps {
  existingReferral?: Referral | null;
  onSuccess: () => void;
}

export default function ReferralForm({ existingReferral, onSuccess }: ReferralFormProps) {
  const isEditing = !!existingReferral;

  const [form, setForm] = useState<Referral>({
    title: "",
    company: "",
    description: "",
    status: "Pending",
  });

  const [loading, setLoading] = useState(false);
  const { setErrors, clearErrors } = useError();
  const { addMessage, clearMessages } = useSuccess();

  useEffect(() => {
    if (existingReferral) {
      setForm(existingReferral);
    }
  }, [existingReferral]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    clearMessages();
    setLoading(true);

    try {
      if (isEditing && existingReferral?._id) {
        await api.put(`/referral/${existingReferral._id}`, form);
        addMessage("Referral updated successfully!");
      } else {
        await api.post("/referral", form);
        addMessage("Referral added successfully!");
      }
      onSuccess();
    } catch (err: any) {
      setErrors([err?.response?.data?.message || "Failed to save referral"]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-bold mb-4">
        {isEditing ? "Edit Referral ✏️" : "Add New Referral ➕"}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          placeholder="Enter referral title"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          placeholder="Enter company name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          placeholder="Enter referral details"
          required
        />
      </div>

      {isEditing && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {loading ? "Saving..." : isEditing ? "Update Referral" : "Add Referral"}
      </button>
    </form>
  );
}
