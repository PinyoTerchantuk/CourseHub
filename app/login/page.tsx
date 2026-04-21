"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // ในไฟล์ app/login/page.tsx
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => { // 🌟 เติม <HTMLFormElement>
        e.preventDefault();
        setIsLoading(true);

        // 🌟 ดึงค่า Email ที่ผู้ใช้พิมพ์มาในฟอร์ม
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string || "student@coursehub.com";

        setTimeout(() => {
            // 🌟 บันทึกอีเมลนี้ลงในเครื่อง เพื่อให้ระบบรู้ว่าใครกำลังใช้งานอยู่
            localStorage.setItem("currentUser", email);
            router.push("/");
        }, 1000);
    };

    // ... เลื่อนลงมาตรง <input> ของ Email เพิ่มคำว่า name="email" เข้าไปด้วยครับ:
    // <input type="email" name="email" required ... />

    return (
        // พื้นหลังสีเข้ม และ overflow-hidden เพื่อไม่ให้แสงล้นขอบ
        <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden px-4">

            {/* เอฟเฟกต์แสงออร่าด้านหลัง (Glowing Orbs) */}
            <div className="absolute top-10 -left-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-60 animate-pulse"></div>
            <div className="absolute top-40 -right-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[120px] opacity-50 animate-pulse" style={{ animationDelay: "2s" }}></div>
            <div className="absolute -bottom-10 left-1/2 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-60 animate-pulse" style={{ animationDelay: "4s" }}></div>

            {/* กล่อง Form แบบ Glassmorphism (กระจกฝ้า) */}
            <div className="relative max-w-md w-full bg-white/10 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/20 z-10">

                {/* Logo */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black tracking-tighter mb-2 text-white">
                        Course<span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-200">Hub</span>
                    </h1>
                    <p className="text-slate-300 font-medium">Sign in to your universe of learning.</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-300 mb-2">Email Space</label>
                        <input
                            type="email"
                            required
                            defaultValue="student@coursehub.com"
                            className="w-full px-5 py-3.5 rounded-2xl bg-slate-900/50 border border-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all backdrop-blur-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-300 mb-2">Secret Key</label>
                        <input
                            type="password"
                            required
                            defaultValue="123456"
                            className="w-full px-5 py-3.5 rounded-2xl bg-slate-900/50 border border-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all backdrop-blur-sm"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm mt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded bg-slate-800 border-slate-700 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-slate-900" defaultChecked />
                            <span className="font-medium text-slate-300">Remember me</span>
                        </label>
                        <a href="#" className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors">Lost Key?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-linear-to-r from-cyan-500 to-blue-500 text-white font-bold py-4 rounded-2xl hover:from-cyan-400 hover:to-blue-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 flex justify-center items-center mt-4"
                    >
                        {isLoading ? "Authenticating..." : "Initialize Learning →"}
                    </button>
                </form>

                <p className="text-center mt-8 text-sm text-slate-400 font-medium">
                    New to the hub? <Link href="/signup" className="text-white font-bold hover:text-cyan-400 transition-colors">Join now</Link>
                </p>
            </div>
        </div>
    );
}