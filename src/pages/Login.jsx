import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Mail, Lock, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@temi.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all credentials.");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      toast.success("Successfully logged in!");
      navigate("/");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-4 transition-colors duration-300">
      {/* Background radial effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.06),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(236,72,153,0.06),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_bottom_left,rgba(236,72,153,0.1),transparent_50%)]" />

      <Card className="w-full max-w-md relative z-10 border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl overflow-hidden rounded-2xl">
        {/* Animated header stripe */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-pink-500 to-amber-500" />
        
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-tr from-pink-500 to-blue-500 text-white shadow-md mb-4">
              <Sparkles size={24} />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
              Welcome back
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1.5">
              Access your beauty operations console
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-400 pointer-events-none">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-neutral-800 dark:bg-neutral-900/50 dark:focus:bg-neutral-900 text-sm transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-400 pointer-events-none">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-neutral-800 dark:bg-neutral-900/50 dark:focus:bg-neutral-900 text-sm transition-all"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-2.5 text-sm font-semibold mt-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-none cursor-pointer"
              isLoading={loading}
            >
              Sign In
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Don't have a partner account?{" "}
              <Link to="/register" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                Create one now
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 text-center">
            <p className="text-[10px] text-neutral-400">
              By signing in you agree to our Terms of Service & Privacy Policy.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
