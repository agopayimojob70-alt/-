import React from 'react';
import { User, Role } from '../types';
import { MOCK_ASSIGNMENTS } from '../constants';
import { BookOpen, CheckCircle, Upload, MessageSquare } from 'lucide-react';

interface ClassroomProps {
  user: User;
}

const Classroom: React.FC<ClassroomProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      
      {/* Assignments Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 flex items-center">
          <BookOpen className="mr-2" /> 作业与反馈
        </h2>
        {user.role === Role.TEACHER && (
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-sm text-sm">
            布置作业
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_ASSIGNMENTS.map(assignment => (
          <div key={assignment.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row justify-between md:items-center">
             <div className="mb-4 md:mb-0">
               <div className="flex items-center space-x-3 mb-2">
                 <span className={`px-2 py-0.5 text-xs rounded font-bold ${assignment.status === 'PENDING' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                   {assignment.status === 'PENDING' ? '未完成' : '已批改'}
                 </span>
                 <span className="text-sm text-slate-500">截止日期: {assignment.dueDate}</span>
               </div>
               <h3 className="text-lg font-bold text-slate-800 mb-1">{assignment.title}</h3>
               <p className="text-slate-600 text-sm">{assignment.description}</p>
             </div>
             
             <div className="flex items-center space-x-4">
                {assignment.score && (
                  <div className="text-right">
                    <span className="block text-xs text-slate-500">得分</span>
                    <span className="text-2xl font-bold text-indigo-600">{assignment.score}</span>
                  </div>
                )}
                
                {user.role === Role.STUDENT && assignment.status === 'PENDING' && (
                  <button className="flex items-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition text-sm">
                    <Upload size={16} className="mr-2" /> 提交作业
                  </button>
                )}
                
                {assignment.status !== 'PENDING' && (
                  <button className="flex items-center px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition text-sm">
                    查看详情
                  </button>
                )}
             </div>
          </div>
        ))}
      </div>

      {/* Classroom Feedback - Mockup for UI */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
          <MessageSquare className="mr-2" /> 课堂表现反馈
        </h3>
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
           <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold shrink-0">
                王
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-bold text-slate-800">王老师 (数学)</h4>
                  <span className="text-xs text-slate-400">2023-10-24 16:30</span>
                </div>
                <p className="text-slate-600 text-sm mt-2">
                  张小明今天课堂专注度很高，特别是对于“追及问题”的理解很快。建议回家后再做两道类似的题目巩固一下。
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded border border-green-100">专注度: 优</span>
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded border border-blue-100">互动积极</span>
                </div>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
};

export default Classroom;
