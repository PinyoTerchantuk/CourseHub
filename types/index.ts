export interface Course {
    id: string;
    name: string;          // ของเดิมเราใช้ title (แก้เป็น name)
    description: string;
    category: string;
    image: string;         // ของเดิมเราใช้ thumbnail (แก้เป็น image)
    coursesDtl: Lecture[]; // ของเดิมเราใช้ lectures (แก้เป็น coursesDtl)
}

export interface Lecture {
    id: string;
    title: string;
    duration: string;
}