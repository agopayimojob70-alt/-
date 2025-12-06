import React, { useState } from 'react';
import { User, Role, AttendanceStatus, ClassSession } from '../types';
import { MOCK_SESSIONS, MOCK_ATTENDANCE } from '../constants';
import { Calendar, MapPin, Users, CheckCircle, XCircle, Clock } from 'lucide-react';

interface ScheduleProps {
  user: User;
}

const Schedule: React.FC<ScheduleProps> = ({ user }) => {
  const [selectedSession, setSelectedSession] = useState<ClassSession | null>(null);

  // Filter sessions based on role
  const sessions = MOCK_SESSIONS.filter(s => {
    if (user.role === Role.ADMIN) return true;
    if (user.role === Role.TEACHER) return s.teacherId === user.id;
    if (user.role === Role.STUDENT) return s.students.includes(user.id);
    if (user.role === Role.PARENT) return user.relatedUserIds?.some(id => s.students.includes(id));
    return false;
  }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  const getStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case AttendanceStatus.PRESENT: return <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">出勤</span>;
      case AttendanceStatus.LATE: return <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">迟到</span>;
      case AttendanceStatus.ABSENT: return <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700">缺勤</span>;
      default: return <span className="px-2 py-1 text-xs rounded bg-slate-100 text-slate-700">待定</span>;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* List of Classes */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
          <Calendar className="mr-2" /> 我的课表
        </h2>
        {sessions.length === 0 ? (
           <div className="bg-white p-8 rounded-xl text-center text-slate-500">暂无课程安排</div>
        ) : (
          sessions.map(session => (
            <div 
              key={session.id} 
              onClick={() => setSelectedSession(session)}
              className={`bg-white p-5 rounded-xl shadow-sm border cursor-pointer transition hover:border-indigo-300 ${selectedSession?.id === session.id ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-slate-100'}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-slate-800">{session.courseName}</h3>
                  <div className="flex items-center text-slate-500 text-sm mt-2 space-x-4">
                    <span className="flex items-center"><Users size={14} className="mr-1"/> {session.teacherName}</span>
                    <span className="flex items-center"><MapPin size={14} className="mr-1"/> {session.room}</span>
                  </div>
                </div>
                <div className="text-right">
                   <div className="text-indigo-600 font-bold">{new Date(session.startTime).toLocaleDateString()}</div>
                   <div className="text-slate-500 text-sm">
                     {new Date(session.startTime).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})} - 
                     {new Date(session.endTime).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                   </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Class Details & Attendance */}
      <div className="lg:col-span-1">
        {selectedSession ? (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 sticky top-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">课堂详情</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-500">课程</span>
                <span className="font-medium">{selectedSession.courseName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">时间</span>
                <span className="font-medium">{new Date(selectedSession.startTime).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
              </div>
            </div>

            {/* Attendance Section */}
            <h4 className="text-md font-bold text-slate-700 mb-3">考勤状态</h4>
            
            {user.role === Role.TEACHER || user.role === Role.ADMIN ? (
              <div className="space-y-3">
                 {/* Teacher View: Mark Attendance */}
                 {selectedSession.students.map((studentId, idx) => {
                   const record = MOCK_ATTENDANCE.find(a => a.sessionId === selectedSession.id && a.studentId === studentId);
                   return (
                     <div key={idx} className="flex justify-between items-center p-2 bg-slate-50 rounded">
                        <span className="text-sm font-medium">学生ID: {studentId}</span>
                        <div className="flex space-x-2">
                           {record ? getStatusBadge(record.status) : (
                             <>
                               <button className="p-1 text-green-600 hover:bg-green-100 rounded" title="Present"><CheckCircle size={18}/></button>
                               <button className="p-1 text-yellow-600 hover:bg-yellow-100 rounded" title="Late"><Clock size={18}/></button>
                               <button className="p-1 text-red-600 hover:bg-red-100 rounded" title="Absent"><XCircle size={18}/></button>
                             </>
                           )}
                        </div>
                     </div>
                   );
                 })}
                 <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">提交考勤</button>
              </div>
            ) : (
              // Student/Parent View: Show my status
              <div>
                {(() => {
                   const myId = user.role === Role.PARENT ? user.relatedUserIds?.[0] : user.id;
                   const record = MOCK_ATTENDANCE.find(a => a.sessionId === selectedSession.id && a.studentId === myId);
                   return record ? (
                     <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <p className="text-slate-500 text-sm mb-2">学生: {record.studentName}</p>
                        {getStatusBadge(record.status)}
                        {record.remark && <p className="text-xs text-red-500 mt-2">{record.remark}</p>}
                     </div>
                   ) : (
                     <div className="text-center text-slate-400 text-sm">考勤尚未录入</div>
                   );
                })()}
                
                {user.role === Role.PARENT && (
                  <button className="w-full mt-4 border border-indigo-600 text-indigo-600 py-2 rounded-lg hover:bg-indigo-50 transition text-sm">
                    申请请假
                  </button>
                )}
              </div>
            )}
            
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl min-h-[200px]">
            <p>选择一节课查看详情</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
