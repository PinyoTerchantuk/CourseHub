"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Course } from "../types";
// 🌟 นำเข้า Framer Motion
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch("http://localhost:3005/courses");
                const data = await res.json();
                setCourses(data);
                setFilteredCourses(data);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    useEffect(() => {
        let result = courses;
        if (selectedCategory !== "All") {
            result = result.filter(c => c.category === selectedCategory);
        }
        if (searchQuery.trim() !== "") {
            result = result.filter(c =>
                c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        setFilteredCourses(result);
    }, [selectedCategory, searchQuery, courses]);

    if (loading) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 font-medium animate-pulse">Loading amazing courses...</p>
        </div>
    );

    const categories = ["All", "Programming", "Design", "Data Science", "Marketing"];

    return (
        <main className="max-w-6xl mx-auto p-6 overflow-hidden">

            {/* 🌟 1. HERO SECTION (ส่วนแนะนำเว็บไซต์แบบล้ำๆ) 🌟 */}
            <section className="relative py-16 px-8 md:px-12 mb-16 overflow-hidden rounded-[3rem] bg-slate-950 text-white shadow-2xl">
                {/* Background Glows */}
                <div className="absolute top-0 -left-20 w-80 h-80 bg-purple-600/30 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-0 -right-20 w-80 h-80 bg-cyan-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>

                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                    {/* Left Side: Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 border border-white/20 text-cyan-400 text-xs font-black tracking-widest uppercase">
                                🚀 Next-Gen Learning Platform
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tighter">
                                Unlock Your Potential <br />
                                with <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-500">CourseHub</span>
                            </h1>
                            <p className="text-lg text-slate-400 mb-10 max-w-xl font-medium leading-relaxed mx-auto lg:mx-0">
                                เรียนรู้ทักษะแห่งอนาคตและสร้างแอปพลิเคชันในฝันของคุณ
                                ด้วยหลักสูตรที่เจาะลึกจากผู้เชี่ยวชาญระดับมืออาชีพ พร้อมโปรเจกต์จริงที่ใช้ได้ในสายงาน
                            </p>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                {/* 🌟 ลิงก์เพื่อให้ Scroll ลงไปที่ id="course-section" ด้านล่าง */}
                                <a href="login" className="px-8 py-4 bg-linear-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold text-white hover:scale-105 transition-all shadow-lg shadow-cyan-500/25">
                                    เริ่มเรียนเลยวันนี้
                                </a>
                                <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-white hover:bg-white/10 transition-all backdrop-blur-md">
                                    ดูรายละเอียดบริการ
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Video/Image */}
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="flex-1 w-full max-w-lg">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                            <div className="relative bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800" alt="Learning Platform" className="w-full h-auto object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 cursor-pointer hover:scale-110 transition-transform shadow-lg">
                                        <div className="w-0 h-0 border-t-10 border-t-transparent border-l-18 border-l-white border-b-10 border-b-transparent ml-2"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
            {/* 🌟 จบ HERO SECTION 🌟 */}


            {/* 🌟 2. COURSE SECTION (ส่วนค้นหาและแสดงคอร์สเดิมของคุณ) 🌟 */}
            {/* เพิ่ม id="course-section" เพื่อให้ปุ่มด้านบนเลื่อนลงมาหาตรงนี้ได้ */}
            <div id="course-section" className="scroll-mt-24 mb-8 md:flex md:items-end md:justify-between gap-4 pt-4">
                <div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight">What do you want to learn?</h1>
                    <p className="text-gray-500">Explore our premium courses and boost your skills.</p>
                </div>
                <div className="mt-6 md:mt-0 w-full md:w-80 relative">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent shadow-sm transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 font-bold"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all whitespace-nowrap ${selectedCategory === cat
                            ? "bg-black text-white shadow-md scale-105"
                            : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {filteredCourses.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                    <p className="text-xl text-gray-500 font-medium">No courses found matching "{searchQuery}"</p>
                    <button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }} className="mt-4 text-yellow-600 font-bold hover:underline">
                        Clear Filters
                    </button>
                </div>
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredCourses.map(course => {
                            const mockStudents = (Number(course.id) * 1423) % 15000 + 2500;
                            const mockRating = (4.5 + (Number(course.id) % 5) * 0.1).toFixed(1);
                            const isHot = Number(course.id) <= 2;

                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: -20, filter: "blur(5px)" }}
                                    transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                                    key={course.id}
                                    className="h-full"
                                >
                                    <Link href={`/course/${course.id}`} className="group flex flex-col h-full bg-white rounded-3xl p-4 shadow-sm border border-gray-100 hover:shadow-xl hover:border-yellow-300 transition-all duration-300 relative">

                                        {isHot && (
                                            <div className="absolute -top-3 -right-3 bg-linear-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10 animate-bounce">
                                                🔥 Bestseller
                                            </div>
                                        )}

                                        <div className="aspect-video bg-gray-100 rounded-2xl mb-4 overflow-hidden relative">
                                            <motion.img
                                                layoutId={`course-img-${course.id}`}
                                                src={course.image}
                                                alt={course.name}
                                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                                onError={(e) => e.currentTarget.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400"}
                                            />
                                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                                                {course.category}
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold mb-2 leading-tight group-hover:text-yellow-600 transition-colors line-clamp-1">{course.name}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 mb-3 grow">{course.description}</p>

                                        <div className="flex items-center gap-3 mb-4 text-sm font-medium">
                                            <div className="flex items-center text-orange-400">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                {mockRating}
                                            </div>
                                            <div className="flex items-center text-gray-400">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                                {mockStudents.toLocaleString()} students
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <span className="text-sm font-semibold text-gray-500 bg-gray-50 px-3 py-1 rounded-lg">
                                                {course.coursesDtl?.length || 0} Lessons
                                            </span>
                                            <div className="bg-black text-white px-5 py-2.5 rounded-xl font-medium text-sm group-hover:bg-yellow-400 group-hover:text-black transition-colors shadow-sm">
                                                Enroll Now
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            )}
        </main>
    );
}