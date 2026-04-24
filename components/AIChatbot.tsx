"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Course } from "../types"; // นำเข้า Type ของคอร์ส

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [courses, setCourses] = useState<Course[]>([]); // 🌟 เก็บข้อมูลคอร์สจริงจาก API
    const [messages, setMessages] = useState([
        { role: "ai", text: "สวัสดีครับ! ผมคือ AI Tutor สามารถสอบถามข้อมูลคอร์สเรียนในระบบได้เลยครับ" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // 🌟 ดึงข้อมูลคอร์สทั้งหมดมารอไว้ตั้งแตโหลดหน้าเว็บ
    useEffect(() => {
        const fetchAllCourses = async () => {
            try {
                const res = await fetch("/api/courses");
                const data = await res.json();
                setCourses(data);
            } catch (err) {
                console.error("Chatbot fetch error:", err);
            }
        };
        fetchAllCourses();
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;
        const userMsg = { role: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            // 🌟 ระบบค้นหาคอร์สอัจฉริยะ
            const query = input.toLowerCase();

            // ค้นหาคอร์สที่ชื่อหรือคำบรรยายตรงกับที่พิมพ์
            const matchedCourses = courses.filter(c =>
                c.name.toLowerCase().includes(query) ||
                c.category.toLowerCase().includes(query) ||
                c.description.toLowerCase().includes(query)
            );

            let aiResponse = "";

            if (matchedCourses.length > 0) {
                aiResponse = `เจอคอร์สที่น่าสนใจแล้วครับ! คอร์สที่คุณอาจสนใจคือ: \n\n` +
                    matchedCourses.map(c => `- ${c.name} (${c.category})`).join("\n") +
                    `\n\nสามารถกดดูที่หน้าหลักได้เลยครับ!`;
            } else {
                aiResponse = "ขออภัยครับ ไม่พบคอร์สที่ตรงกับคำค้นหาของคุณ ลองถามหาคอร์สแนว Programming หรือ Design ดูไหมครับ?";
            }

            setMessages((prev) => [...prev, { role: "ai", text: aiResponse }]);
            setIsTyping(false);
        }, 1200);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-80 sm:w-96 h-125 bg-slate-900/80 backdrop-blur-2xl rounded-4xl border border-white/20 shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-5 border-b border-white/10 bg-linear-to-r from-cyan-500/20 to-purple-500/20 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-linear-60 from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                                <span className="text-xl">🤖</span>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm">AI Course Assistant</h3>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-[10px] text-green uppercase font-black tracking-widest text-white">Online</span>
                                </div>
                            </div>
                        </div>

                        {/* Chat Content */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
                            {messages.map((msg, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: msg.role === "ai" ? -10 : 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i}
                                    className={`flex ${msg.role === "ai" ? "justify-start" : "justify-end"}`}
                                >
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${msg.role === "ai"
                                        ? "bg-white/10 text-slate-200 rounded-tl-none border border-white/5"
                                        : "bg-cyan-500 text-white rounded-tr-none shadow-lg shadow-cyan-500/20"
                                        }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/10 bg-slate-900/40">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="พิมพ์หาคอร์ส เช่น React, Python..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white hover:bg-cyan-400 transition-colors"
                                >
                                    🚀
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-2xl transition-all duration-300 ${isOpen ? "bg-white text-slate-900 rotate-90" : "bg-linear-60 from-cyan-500 to-purple-600 text-white"
                    }`}
            >
                {isOpen ? "✕" : "🤖"}
                {!isOpen && <div className="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-20"></div>}
            </motion.button>
        </div>
    );
}