import { Role, User, ClassSession, AttendanceRecord, GradeRecord, Assignment, Transaction, AttendanceStatus, PaymentStatus } from './types';

export const MOCK_USERS: User[] = [
  { id: 'u1', name: '张小明', role: Role.STUDENT, grade: '五年级', school: '实验小学', avatar: 'https://picsum.photos/100/100?random=1', relatedUserIds: ['u3'] },
  { id: 'u2', name: '李华', role: Role.STUDENT, grade: '初二', school: '附中', avatar: 'https://picsum.photos/100/100?random=2', relatedUserIds: ['u4'] },
  { id: 'u3', name: '张爸爸', role: Role.PARENT, phone: '13800138000', avatar: 'https://picsum.photos/100/100?random=3', relatedUserIds: ['u1'] },
  { id: 'u4', name: '李妈妈', role: Role.PARENT, phone: '13900139000', avatar: 'https://picsum.photos/100/100?random=4', relatedUserIds: ['u2'] },
  { id: 'u5', name: '王老师', role: Role.TEACHER, subject: '数学', avatar: 'https://picsum.photos/100/100?random=5' },
  { id: 'u6', name: '赵老师', role: Role.TEACHER, subject: '英语', avatar: 'https://picsum.photos/100/100?random=6' },
  { id: 'u7', name: '管理员', role: Role.ADMIN, avatar: 'https://picsum.photos/100/100?random=7' },
];

export const MOCK_SESSIONS: ClassSession[] = [
  { id: 's1', courseName: '奥数竞赛班', teacherId: 'u5', teacherName: '王老师', room: '101教室', startTime: new Date(new Date().setHours(14,0,0,0)).toISOString(), endTime: new Date(new Date().setHours(15,30,0,0)).toISOString(), students: ['u1', 'u2'] },
  { id: 's2', courseName: '新概念英语', teacherId: 'u6', teacherName: '赵老师', room: '102教室', startTime: new Date(new Date().setHours(16,0,0,0)).toISOString(), endTime: new Date(new Date().setHours(17,30,0,0)).toISOString(), students: ['u1', 'u2'] },
  { id: 's3', courseName: '初二物理强化', teacherId: 'u5', teacherName: '王老师', room: '103教室', startTime: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), endTime: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), students: ['u2'] },
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: 'a1', sessionId: 's1', studentId: 'u1', studentName: '张小明', status: AttendanceStatus.PRESENT },
  { id: 'a2', sessionId: 's1', studentId: 'u2', studentName: '李华', status: AttendanceStatus.LATE, remark: '迟到10分钟' },
];

export const MOCK_GRADES: GradeRecord[] = [
  { id: 'g1', studentId: 'u1', examName: '第一次月考', subject: '数学', score: 95, totalScore: 100, date: '2023-10-01', classAverage: 88 },
  { id: 'g2', studentId: 'u1', examName: '期中考试', subject: '数学', score: 92, totalScore: 100, date: '2023-11-15', classAverage: 85 },
  { id: 'g3', studentId: 'u1', examName: '期末模拟', subject: '数学', score: 98, totalScore: 100, date: '2023-12-20', classAverage: 89 },
  { id: 'g4', studentId: 'u2', examName: '第一次月考', subject: '数学', score: 78, totalScore: 100, date: '2023-10-01', classAverage: 88 },
  { id: 'g5', studentId: 'u2', examName: '期中考试', subject: '数学', score: 85, totalScore: 100, date: '2023-11-15', classAverage: 85 },
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
  { id: 'hw1', title: '完成练习册P30-32', description: '重点是最后两道应用题，需要写出过程。', dueDate: '2023-10-25', classId: 's1', status: 'PENDING' },
  { id: 'hw2', title: '背诵课文 Unit 3', description: '下节课抽查', dueDate: '2023-10-26', classId: 's2', status: 'SUBMITTED', score: 90 },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', type: 'TUITION', amount: 3000, date: '2023-09-01', userId: 'u3', status: PaymentStatus.PAID, description: '秋季班学费' },
  { id: 't2', type: 'WAGE', amount: 5000, date: '2023-10-05', userId: 'u5', status: PaymentStatus.PAID, description: '9月课时费' },
  { id: 't3', type: 'TUITION', amount: 1200, date: '2023-10-10', userId: 'u4', status: PaymentStatus.UNPAID, description: '一对一补课费' },
];

export const CHART_DATA_U1 = [
  { name: '月考', score: 95, avg: 88 },
  { name: '期中', score: 92, avg: 85 },
  { name: '期末', score: 98, avg: 89 },
];
