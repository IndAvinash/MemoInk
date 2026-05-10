"use client";

import { UserModel } from "@/types/user";
import { Pen, X } from "lucide-react";
import { useState, useEffect } from "react";

function fetchProfileData() {
  return fetch("/api/profile", {
    method: "GET",
    credentials: "include",
  }).then((res) => res.json());
}

async function updateProfileSettings(updates: Partial<UserModel>) {
  const res = await fetch("/api/profile", {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return res.json();
}

export default function Profile() {
  const dummyData: UserModel = {
    username: "",
    email: "",
    password_hash: "",
    diary_name: "",
    profile: {
      display_name: "",
      avatar_url: "",
    },
    settings: {
      theme: "light",
      daily_reminder_time: "",
      is_private: false,
    },
    created_at: new Date(),
  };

  const [data, setData] = useState<UserModel>(dummyData);
  const [isPrivate, setIsPrivate] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ [key: string]: string }>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfileData()
      .then((data) => {
        setData(data);
        setIsPrivate(data.settings?.is_private || false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, []);

  const handleEdit = (field: string, value: string) => {
    setEditingField(field);
    setEditValues({ ...editValues, [field]: value });
  };

  const handleSave = async (field: string) => {
    setSaving(true);
    try {
      const updates: any = {};
      if (field === "diary_name") {
        updates.diary_name = editValues.diary_name;
      } else if (field === "daily_reminder_time") {
        updates.settings = { ...data.settings, daily_reminder_time: editValues.daily_reminder_time };
      }

      const result = await updateProfileSettings(updates);
      if (result.success || result._id) {
        setData({ ...data, ...result });
        setEditingField(null);
      }
    } catch (err) {
      console.error("Error saving profile:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePrivate = async () => {
    setSaving(true);
    try {
      const newPrivacy = !isPrivate;
      const result = await updateProfileSettings({
        settings: { ...data.settings, is_private: newPrivacy },
      });
      if (result.success || result._id) {
        setData({ ...data, ...result });
        setIsPrivate(newPrivacy);
      }
    } catch (err) {
      console.error("Error updating privacy:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-diary-background">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-diary-primary mb-8">Profile Settings</h1>

        {/* Profile Card */}
        <div className="diary-card mb-6">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl">
              {data.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-diary-primary">{data.username}</h2>
              <p className="text-gray-600">{data.email}</p>
            </div>
          </div>
        </div>

        {/* Settings Card */}
        <div className="diary-card space-y-4">
          <h3 className="text-xl font-semibold text-diary-primary mb-6">Diary Settings</h3>

          {/* Diary Name */}
          <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Diary Name</p>
              <p className="text-lg font-medium text-gray-800">{data.diary_name || "Not set"}</p>
            </div>
            <button
              onClick={() => handleEdit("diary_name", data.diary_name || "")}
              className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <Pen size={18} className="text-diary-primary" />
            </button>
          </div>

          {editingField === "diary_name" && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold">Edit Diary Name</h4>
                  <button onClick={() => setEditingField(null)} className="p-1 hover:bg-gray-100 rounded">
                    <X size={20} />
                  </button>
                </div>
                <input
                  type="text"
                  value={editValues.diary_name || ""}
                  onChange={(e) => setEditValues({ ...editValues, diary_name: e.target.value })}
                  className="diary-input mb-4"
                  placeholder="Enter diary name"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave("diary_name")}
                    disabled={saving}
                    className="flex-1 diary-button py-2 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button onClick={() => setEditingField(null)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="border-t border-gray-200"></div>

          {/* Daily Reminder Time */}
          <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Daily Reminder Time</p>
              <p className="text-lg font-medium text-gray-800">{data.settings?.daily_reminder_time || "Not set"}</p>
            </div>
            <button
              onClick={() => handleEdit("daily_reminder_time", data.settings?.daily_reminder_time || "")}
              className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <Pen size={18} className="text-diary-primary" />
            </button>
          </div>

          {editingField === "daily_reminder_time" && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold">Edit Reminder Time</h4>
                  <button onClick={() => setEditingField(null)} className="p-1 hover:bg-gray-100 rounded">
                    <X size={20} />
                  </button>
                </div>
                <input
                  type="time"
                  value={editValues.daily_reminder_time || ""}
                  onChange={(e) => setEditValues({ ...editValues, daily_reminder_time: e.target.value })}
                  className="diary-input mb-4"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave("daily_reminder_time")}
                    disabled={saving}
                    className="flex-1 diary-button py-2 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button onClick={() => setEditingField(null)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="border-t border-gray-200"></div>

          {/* Is Private Toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition">
            <div>
              <p className="text-sm text-gray-500 mb-1">Privacy</p>
              <p className="text-lg font-medium text-gray-800">{isPrivate ? "Private" : "Public"}</p>
            </div>
            <button
              onClick={handleTogglePrivate}
              disabled={saving}
              className={`ml-4 relative w-12 h-6 rounded-full transition ${isPrivate ? "bg-diary-primary" : "bg-gray-300"}`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition transform ${isPrivate ? "translate-x-6" : ""}`}></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
