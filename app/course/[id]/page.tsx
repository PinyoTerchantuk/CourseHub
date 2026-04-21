"use client";
import { useEffect, useState, use } from "react";
import { Course } from "../../../types";
import { useProgress } from "../../../hooks/useProgress";
import Link from "next/link";
import { motion } from "framer-motion"; // 🌟 นำเข้า Framer Motion (คุณใส่ไว้ถูกแล้วครับ)

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;

    const [course, setCourse] = useState<Course | null>(null);
    const [currentVideo, setCurrentVideo] = useState<string>("");
    const [activeLectureId, setActiveLectureId] = useState<string>("");
    const { completedLectures, markAsCompleted, isLoaded } = useProgress();

    useEffect(() => {
        const fetchCourse = async () => {
            const res = await fetch("http://localhost:3005/courses");
            const data = await res.json();
            const found = data.find((c: Course) => String(c.id) === String(id));

            if (found) {
                setCourse(found);
                if (found.coursesDtl?.length > 0) {
                    setCurrentVideo("https://www.w3schools.com/html/mov_bbb.mp4"); // วิดีโอจำลอง
                    setActiveLectureId(found.coursesDtl[0].id);
                }
            }
        };
        fetchCourse();
    }, [id]);

    // หน้า Loading ระหว่างรอข้อมูล (จะโชว์แป๊บเดียว)
    if (!course || !isLoaded) return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 font-medium animate-pulse">Loading course data...</p>
        </div>
    );

    return (
        <main className="max-w-5xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Link href="/" className="text-sm font-bold text-gray-500 hover:text-black mb-4 flex items-center gap-2 transition-colors">
                    ← Back to Courses
                </Link>

                {/* 🌟 โซนพระเอก: กล่องวิดีโอที่มีเอฟเฟกต์ Morphing & Ambient Mode */}
                <div className="bg-black aspect-video rounded-2xl overflow-hidden mb-6 shadow-2xl relative">

                    {/* 🌟 1. รูปภาพที่จะ "ขยายร่าง" มาจากหน้าแรก (เป็นฉากหลังเบลอๆ) */}
                    <motion.img
                        layoutId={`course-img-${course.id}`} // ต้องตรงกับที่หน้าแรกส่งมา!
                        src={course.image}
                        alt={course.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-50 blur-md scale-110"
                    />

                    {/* 🌟 2. ตัวเล่นวิดีโอ ซ้อนอยู่ด้านหน้า */}
                    <div className="relative z-10 w-full h-full bg-black/40 backdrop-blur-sm">
                        {currentVideo ? (
                            <video key={currentVideo} src={currentVideo} controls className="w-full h-full object-contain" autoPlay />
                        ) : (
                            <div className="flex items-center justify-center h-full text-white font-bold">No video selected</div>
                        )}
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
                <p className="text-gray-600 mb-4 leading-relaxed">{course.description}</p>
            </div>

            <div className="bg-white border rounded-2xl p-5 shadow-sm h-fit sticky top-24">
                <h2 className="text-xl font-bold mb-4 flex justify-between items-center">
                    Course Content
                    <span className="text-sm font-medium bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                        {course.coursesDtl?.length} Lessons
                    </span>
                </h2>

                <div className="space-y-3">
                    {course.coursesDtl?.map((lecture, index) => {
                        const isCompleted = completedLectures.includes(String(lecture.id));
                        const isActive = activeLectureId === lecture.id;

                        return (
                            <div
                                key={lecture.id}
                                className={`p-4 rounded-xl border transition-all ${isActive ? "border-yellow-400 bg-yellow-50 shadow-sm scale-[1.02]" : "border-gray-100 bg-gray-50 hover:border-gray-300 hover:bg-white"
                                    }`}
                            >
                                <div
                                    className="flex items-start justify-between cursor-pointer"
                                    onClick={() => setActiveLectureId(lecture.id)}
                                >
                                    <div className="flex-1 pr-4">
                                        <p className={`font-semibold ${isActive ? "text-black" : "text-gray-700"}`}>
                                            {index + 1}. {lecture.title}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">{lecture.duration}</p>
                                    </div>

                                    {isCompleted ? (
                                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                                            ✓ Done
                                        </div>
                                    ) : (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                markAsCompleted(String(lecture.id));
                                            }}
                                            className="bg-black text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-yellow-400 hover:text-black transition-colors shadow-sm"
                                        >
                                            Mark Done
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}