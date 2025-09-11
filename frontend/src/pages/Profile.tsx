// src/pages/Profile.tsx
import { useEffect, useState } from "react";
import api from "../api/api";
import { Loader2, Plus, Trash2, RefreshCcw } from "lucide-react";
import { useError } from "../context/ErrorContext";
import { useSuccess } from "../context/SuccessContext";

interface Education {
  degree: string;
  university: string;
}
interface Employment {
  company: string;
  role: string;
  experience: number;
}
interface ProfileData {
  name: string;
  email: string;
  phone?: string;
  education?: Education[];
  employment?: Employment[];
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { setErrors } = useError();
  const { addMessage } = useSuccess();

  const fetchProfile = async () => {
  try {
    setLoading(true);
    setErrorMsg(null);
    const res = await api.get("/profile");

    // Fake 3s delay before showing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = res.data;
    setProfile({
      ...data,
      education: data.education || [],
      employment: data.employment || [],
    });
  } catch (err: any) {
    const msg = err?.response?.data?.message || "Failed to load profile";
    setErrorMsg(msg);
    setErrors([msg]);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profile) return;
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleEducationChange = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    if (!profile) return;
    const updated = [...(profile.education || [])];
    updated[index] = { ...updated[index], [field]: value };
    setProfile({ ...profile, education: updated });
  };

  const handleEmploymentChange = (
    index: number,
    field: keyof Employment,
    value: string | number
  ) => {
    if (!profile) return;
    const updated = [...(profile.employment || [])];
    updated[index] = { ...updated[index], [field]: value };
    setProfile({ ...profile, employment: updated });
  };

  const addEducation = () => {
    if (!profile) return;
    setProfile({
      ...profile,
      education: [...(profile.education || []), { degree: "", university: "" }],
    });
  };

  const removeEducation = (index: number) => {
    if (!profile) return;
    const updated = [...(profile.education || [])];
    updated.splice(index, 1);
    setProfile({ ...profile, education: updated });
  };

  const addEmployment = () => {
    if (!profile) return;
    setProfile({
      ...profile,
      employment: [
        ...(profile.employment || []),
        { company: "", role: "", experience: 0 },
      ],
    });
  };

  const removeEmployment = (index: number) => {
    if (!profile) return;
    const updated = [...(profile.employment || [])];
    updated.splice(index, 1);
    setProfile({ ...profile, employment: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    // simple validation
    if (!profile.name.trim()) {
      setErrors(["Name is required"]);
      return;
    }
    if (profile.phone && !/^\d{10}$/.test(profile.phone)) {
      setErrors(["Phone must be a valid 10-digit number"]);
      return;
    }

    try {
      setSaving(true);
      await api.post("/profile", profile);
      addMessage("Profile updated successfully!");
      fetchProfile();
    } catch (err: any) {
      setErrors([err?.response?.data?.message || "Failed to update profile"]);
    } finally {
      setSaving(false);
    }
  };

  // Skeleton Loader
  const SkeletonBox = ({ w }: { w: string }) => (
    <div className={`h-4 ${w} bg-gray-200 rounded animate-pulse mb-2`} />
  );

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left skeleton */}
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
            <SkeletonBox w="w-32" />
            <SkeletonBox w="w-48" />
            <SkeletonBox w="w-24" />
            <SkeletonBox w="w-40" />
          </div>
          {/* Right skeleton */}
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
            <SkeletonBox w="w-56" />
            <SkeletonBox w="w-64" />
            <SkeletonBox w="w-40" />
            <SkeletonBox w="w-28" />
          </div>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-red-600 font-medium mb-4">{errorMsg}</p>
        <button
          onClick={fetchProfile}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <RefreshCcw size={18} className="mr-2" />
          Retry
        </button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Could not load profile. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto p-6 min-h-[calc(100vh-160px)]">
      {/* Left side - Details */}
      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Profile Details</h2>
        <p>
          <span className="font-semibold">Name:</span> {profile.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {profile.email}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {profile.phone || "—"}
        </p>

        <h3 className="mt-4 font-semibold">Education</h3>
        {profile.education && profile.education.length > 0 ? (
          <ul className="list-disc ml-5 text-gray-700">
            {profile.education.map((edu, i) => (
              <li key={i}>
                {edu.degree || "—"} @ {edu.university || "—"}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No education added</p>
        )}

        <h3 className="mt-4 font-semibold">Employment</h3>
        {profile.employment && profile.employment.length > 0 ? (
          <ul className="list-disc ml-5 text-gray-700">
            {profile.employment.map((job, i) => (
              <li key={i}>
                {job.role || "—"} at {job.company || "—"} (
                {job.experience ?? 0} yrs)
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No employment added</p>
        )}
      </div>

      {/* Right side - Form */}
      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={profile.name || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="email"
            name="email"
            value={profile.email || ""}
            disabled
            className="w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={profile.phone || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          {/* Education */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Education</h3>
            {(profile.education || []).map((edu, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) =>
                    handleEducationChange(index, "degree", e.target.value)
                  }
                  className="flex-1 p-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="University"
                  value={edu.university}
                  onChange={(e) =>
                    handleEducationChange(index, "university", e.target.value)
                  }
                  className="flex-1 p-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addEducation}
              className="flex items-center text-indigo-600 hover:text-indigo-800 mt-2"
            >
              <Plus size={18} className="mr-1" /> Add Education
            </button>
          </div>

          {/* Employment */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Employment</h3>
            {(profile.employment || []).map((job, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Company"
                  value={job.company}
                  onChange={(e) =>
                    handleEmploymentChange(index, "company", e.target.value)
                  }
                  className="p-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={job.role}
                  onChange={(e) =>
                    handleEmploymentChange(index, "role", e.target.value)
                  }
                  className="p-2 border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Years"
                  value={job.experience}
                  onChange={(e) =>
                    handleEmploymentChange(
                      index,
                      "experience",
                      Number(e.target.value)
                    )
                  }
                  className="p-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeEmployment(index)}
                  className="text-red-600 hover:text-red-800 col-span-3 text-left"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addEmployment}
              className="flex items-center text-indigo-600 hover:text-indigo-800 mt-2"
            >
              <Plus size={18} className="mr-1" /> Add Employment
            </button>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-70"
          >
            {saving ? (
              <Loader2 className="animate-spin inline mr-2" />
            ) : null}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
