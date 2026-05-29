import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import {
  User as UserIcon,
  Mail,
  Bell,
  Trash2,
  CheckCircle,
  Eye,
  Sliders,
  Settings as SettingsIcon,
  ShieldAlert
} from "lucide-react";
import toast from "react-hot-toast";

export default function Settings() {
  const { user, updateProfile } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  // Local state for profile inputs
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  
  // Notification states
  const [emailNotify, setEmailNotify] = useState(user?.notifications?.email ?? true);
  const [pushNotify, setPushNotify] = useState(user?.notifications?.push ?? false);

  // States for sub-form logic
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPreferences, setSavingPreferences] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Name and Email cannot be empty.");
      return;
    }

    setSavingProfile(true);
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    updateProfile({
      name,
      email,
      bio
    });
    
    setSavingProfile(false);
    toast.success("Profile updated successfully!");
  };

  const handleUpdatePreferences = async () => {
    setSavingPreferences(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    updateProfile({
      notifications: { email: emailNotify, push: pushNotify }
    });

    setSavingPreferences(false);
    toast.success("Notification preferences saved!");
  };

  const handleDeleteAccount = () => {
    toast.error("This is a mock application. Account deletion is locked in diagnostic sandbox mode.");
    setConfirmDeleteOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 1. Profile Panel */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
              <UserIcon size={20} />
            </div>
            <div>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>Update your partner information and avatar summary bio</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-neutral-50 dark:bg-neutral-900/30 rounded-xl border border-neutral-100 dark:border-neutral-800/40 mb-4">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="h-16 w-16 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 shadow-sm"
              />
              <div className="text-center md:text-left">
                <p className="text-sm font-semibold">Avatar seed: "{user?.name}"</p>
                <p className="text-xs text-neutral-400 mt-1">Generated dynamically using Dicebear API</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-500 uppercase">Partner Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-500 uppercase">Billing Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-500 uppercase">Short Profile Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Share a short bio..."
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" isLoading={savingProfile} className="cursor-pointer">
                Save Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 2. Notifications & Visuals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications preferences card */}
        <Card className="flex flex-col justify-between">
          <div>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400">
                  <Bell size={20} />
                </div>
                <div>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Customize alert endpoints</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-start gap-3 p-3 rounded-lg border border-neutral-100 dark:border-neutral-800/40 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/10 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={emailNotify}
                  onChange={(e) => setEmailNotify(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-neutral-300 dark:border-neutral-800 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-sm font-semibold block">Email Invoices</span>
                  <span className="text-xs text-neutral-400">Receive receipt invoices for every subscription period</span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-lg border border-neutral-100 dark:border-neutral-800/40 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/10 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={pushNotify}
                  onChange={(e) => setPushNotify(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-neutral-300 dark:border-neutral-800 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-sm font-semibold block">API Outages</span>
                  <span className="text-xs text-neutral-400">Notify immediately when Skin Diagnostics system falls below 99% SLA</span>
                </div>
              </label>
            </CardContent>
          </div>
          <CardFooter className="justify-end">
            <Button variant="secondary" onClick={handleUpdatePreferences} isLoading={savingPreferences} className="cursor-pointer">
              Save Settings
            </Button>
          </CardFooter>
        </Card>

        {/* Global theme controls */}
        <Card className="flex flex-col justify-between">
          <div>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
                  <Sliders size={20} />
                </div>
                <div>
                  <CardTitle>Theming & Styling</CardTitle>
                  <CardDescription>Toggle console canvas mode</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                You can select your appearance preference. Select dark mode to enable high-contrast, low-emission dashboard panels.
              </p>
              
              <div className="p-4 bg-neutral-50 dark:bg-neutral-900/30 rounded-xl border border-neutral-100 dark:border-neutral-800/40 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Active Theme Mode</p>
                  <p className="text-xs text-neutral-400 mt-0.5 uppercase">{isDark ? "Dark theme active" : "Light theme active"}</p>
                </div>
                <Button variant="outline" size="sm" onClick={toggleTheme} className="cursor-pointer">
                  Toggle Theme
                </Button>
              </div>
            </CardContent>
          </div>
          <CardFooter className="justify-end border-t-0" />
        </Card>
      </div>

      {/* 3. Account Terminate (Danger Card) */}
      <Card className="border border-rose-200/60 dark:border-rose-950/40 bg-rose-50/10 dark:bg-rose-950/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400">
              <ShieldAlert size={20} />
            </div>
            <div>
              <CardTitle className="text-rose-800 dark:text-rose-400">Danger Zone</CardTitle>
              <CardDescription className="text-rose-600/80 dark:text-rose-400/60">Destructive, irreversible settings</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">Delete SaaS Partner Node</p>
              <p className="text-xs text-neutral-400 mt-0.5">
                Permanently purge all salon configurations, analytics history datasets, and diagnostic API keys.
              </p>
            </div>
            {!confirmDeleteOpen ? (
              <Button variant="danger" size="sm" onClick={() => setConfirmDeleteOpen(true)} className="cursor-pointer">
                Delete Account
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => setConfirmDeleteOpen(false)} className="cursor-pointer">
                  Cancel
                </Button>
                <Button variant="danger" size="sm" onClick={handleDeleteAccount} className="cursor-pointer">
                  Confirm
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
