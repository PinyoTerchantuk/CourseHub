"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 🌟 เพิ่ม State เช็กสถานะล็อกอิน
    const [isLoaded, setIsLoaded] = useState(false); // ป้องกัน Error ตอนโหลดหน้าเว็บ
    const dropdownRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // 🌟 เช็กว่ามีใครล็อกอินอยู่ไหมใน localStorage
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            setUserEmail(storedUser);
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        setIsLoaded(true);

        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [pathname]);

    if (pathname === "/login" || pathname === "/signup") {
        return null;
    }

    const initial = userEmail ? userEmail.charAt(0).toUpperCase() : "U";

    return (
        <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-black tracking-tighter">
                    Course<span className="text-yellow-500">Hub</span>
                </Link>

                <div className="flex items-center gap-4 relative" ref={dropdownRef}>
                    {/* 🌟 ถ้ายังโหลดข้อมูลไม่เสร็จ ไม่ต้องโชว์อะไร */}
                    {!isLoaded ? null : isLoggedIn ? (
                        // 🌟 ถ้าล็อกอินแล้ว โชว์รูปโปรไฟล์
                        <>
                            <span className="text-sm font-medium text-gray-600 hidden sm:block">Hello, Student!</span>

                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="w-10 h-10 rounded-full bg-yellow-100 border-2 border-yellow-400 flex items-center justify-center font-bold text-yellow-700 shadow-sm hover:bg-yellow-200 hover:scale-105 transition-all focus:outline-none"
                            >
                                {initial}
                            </button>

                            {isProfileOpen && (
                                <div className="absolute right-0 top-14 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200">
                                    <div className="px-4 py-3 border-b border-gray-50 mb-1">
                                        <p className="text-sm font-semibold text-gray-800">Student Profile</p>
                                        <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                                    </div>

                                    <Link href="/" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors">
                                        📚 My Learning
                                    </Link>
                                    <Link href="/" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors">
                                        ⚙️ Settings
                                    </Link>

                                    <div className="border-t border-gray-50 my-1"></div>

                                    <button
                                        onClick={() => {
                                            localStorage.removeItem("currentUser");
                                            setIsLoggedIn(false);
                                            setIsProfileOpen(false);
                                            router.push("/login");
                                        }}
                                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-bold"
                                    >
                                        🚪 Logout
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        // 🌟 ถ้ายังไม่ล็อกอิน โชว์ปุ่ม Sign In แทน
                        <Link
                            href="/login"
                            className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-yellow-400 hover:text-black transition-colors shadow-sm"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}