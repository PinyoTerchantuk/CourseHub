import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar"; // นำเข้า Component Navbar ที่เราเพิ่งสร้าง
import AIChatbot from "../components/AIChatbot"; // 🌟 Import เข้ามา

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "CourseHub | Online Learning",
    description: "Final Project E-Learning",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-gray-50 min-h-screen text-gray-900 flex flex-col`}>
                {/* เรียกใช้งาน Navbar */}
                <Navbar />

                {/* เนื้อหาหลักของหน้าเว็บ */}
                <div className="grow">
                    {children}
                </div>
                <AIChatbot /> {/* 🌟 วางไว้ตรงนี้ครับ */}
            </body>
        </html>
    );
}