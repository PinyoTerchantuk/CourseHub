"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMsg("");

        const formData = new FormData(e.currentTarget);
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setErrorMsg("Security keys do not match. Try again.");
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            alert("Registration successful! Welcome to the Hub.");
            router.push("/login");
        }, 1500);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden px-4 py-10">

            {/* เอฟเฟกต์แสงออร่าด้านหลัง */}
            <div className="absolute -top-20 right-10 w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-[120px] opacity-50 animate-pulse"></div>
            <div className="absolute top-1/3 -left-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse" style={{ animationDelay: "2s" }}></div>
            <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-[120px] opacity-50 animate-pulse" style={{ animationDelay: "4s" }}></div>

            {/* กล่อง Form แบบ Glassmorphism */}
            <div className="relative max-w-md w-full bg-white/10 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/20 z-10">

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black tracking-tighter mb-2 text-white">
                        Course<span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400">Hub</span>
                    </h1>
                    <p className="text-slate-300 font-medium">Create your profile to explore.</p>
                </div>

                {errorMsg && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-200 text-sm font-bold rounded-2xl text-center backdrop-blur-md">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-300 mb-1.5">Commander Name</label>
                        <input
                            type="text"
                            name="fullName"
                            required
                            placeholder="John Doe"
                            className="w-full px-5 py-3 rounded-2xl bg-slate-900/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-300 mb-1.5">Email Space</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="student@coursehub.com"
                            className="w-full px-5 py-3 rounded-2xl bg-slate-900/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-300 mb-1.5">Secret Key</label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Create a strong key"
                            minLength={6}
                            className="w-full px-5 py-3 rounded-2xl bg-slate-900/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-300 mb-1.5">Confirm Secret Key</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            placeholder="Confirm your key"
                            className="w-full px-5 py-3 rounded-2xl bg-slate-900/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-linear-to-r from-pink-500 to-purple-600 text-white font-bold py-4 rounded-2xl hover:from-pink-400 hover:to-purple-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all duration-300 flex justify-center items-center mt-6"
                    >
                        {isLoading ? "Generating Profile..." : "Create Account 🚀"}
                    </button>
                </form>

                <p className="text-center mt-8 text-sm text-slate-400 font-medium">
                    Already a member?{" "}
                    <Link href="/login" className="text-white font-bold hover:text-pink-400 transition-colors">
                        Return to Login
                    </Link>
                </p>
            </div>
        </div>
    );
}