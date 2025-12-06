export enum Role {
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN'
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  LATE = 'LATE',
  ABSENT = 'ABSENT',
  LEAVE = 'LEAVE', // 请假
  PENDING = 'PENDING'
}

export enum PaymentStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
  PENDING = 'PENDING'
}

export interface User {
  id: string;
  name: string;
  role: Role;
  avatar: string;
  // Relationship for parents/students
  relatedUserIds?: string[]; 
  // Info
  grade?: string;
  phone?: string;
  school?: string;
  subject?: string; // For teachers
}

export interface ClassSession {
  id: string;
  courseName: string;
  teacherId: string;
  teacherName: string;
  room: string;
  startTime: string; // ISO String
  endTime: string;   // ISO String
  students: string[]; // User IDs
}

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  studentId: string;
  studentName: string;
  status: AttendanceStatus;
  remark?: string; // e.g., "Forgot book", "Sick"
}

export interface GradeRecord {
  id: string;
  studentId: string;
  examName: string; // e.g., "Midterm", "Quiz 1"
  subject: string;
  score: number;
  totalScore: number;
  date: string;
  classAverage?: number;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  classId: string;
  status: 'PENDING' | 'SUBMITTED' | 'GRADED';
  score?: number;
}

export interface Transaction {
  id: string;
  type: 'TUITION' | 'WAGE' | 'REFUND';
  amount: number;
  date: string;
  userId: string; // Student or Teacher ID
  status: PaymentStatus;
  description: string;
}

export interface CoursePackage {
  id: string;
  name: string;
  totalHours: number;
  remainingHours: number;
}
