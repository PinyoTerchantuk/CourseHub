"use client";
import { useState, useEffect } from "react";

export function useProgress() {
    const [completedLectures, setCompletedLectures] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // 🌟 1. เช็กว่าใครล็อกอินอยู่ (ถ้าไม่มีให้เป็นคำว่า guest)
        const currentUser = localStorage.getItem("currentUser") || "guest";

        // 🌟 2. สร้าง Key เก็บข้อมูลเฉพาะของคนนั้นๆ
        const storageKey = `completed_lectures_${currentUser}`;

        const saved = localStorage.getItem(storageKey);
        if (saved) {
            setCompletedLectures(JSON.parse(saved));
        }
        setIsLoaded(true);
    }, []);

    const markAsCompleted = (lectureId: string) => {
        setCompletedLectures((prev) => {
            if (prev.includes(lectureId)) return prev;

            const updated = [...prev, lectureId];

            // 🌟 3. เวลาบันทึก ก็บันทึกใส่กล่องเฉพาะของคนนั้นๆ
            const currentUser = localStorage.getItem("currentUser") || "guest";
            const storageKey = `completed_lectures_${currentUser}`;
            localStorage.setItem(storageKey, JSON.stringify(updated));

            return updated;
        });
    };

    return { completedLectures, markAsCompleted, isLoaded };
}