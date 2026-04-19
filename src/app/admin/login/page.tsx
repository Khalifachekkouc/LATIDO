"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in!");
      router.push("/admin/dashboard");
    } catch (err: any) {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-yellow flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white border-4 border-black brut-shadow">
        {/* Header */}
        <div className="bg-black text-yellow p-6 border-b-4 border-black">
          <div className="flex items-center gap-3">
            <Lock size={24} />
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-yellow/60">ADMIN</p>
              <h1
                className="text-3xl font-black uppercase"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                LATIDO
              </h1>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block font-black uppercase text-xs mb-1 tracking-wide">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-black px-4 py-3 font-mono text-sm focus:outline-none focus:border-yellow focus:shadow-[3px_3px_0_0_#FFD400] transition-all"
              placeholder="admin@latido.ma"
            />
          </div>

          <div>
            <label className="block font-black uppercase text-xs mb-1 tracking-wide">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-black px-4 py-3 font-mono text-sm focus:outline-none focus:border-yellow focus:shadow-[3px_3px_0_0_#FFD400] transition-all pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-yellow text-black font-black uppercase py-4 border-2 border-black brut-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Logging in..." : "LOGIN →"}
          </button>
        </form>
      </div>
    </main>
  );
}
