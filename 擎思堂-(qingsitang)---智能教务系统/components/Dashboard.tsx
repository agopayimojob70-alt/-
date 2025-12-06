import React from 'react';
import { User, Role } from '../types';
import { MOCK_SESSIONS, MOCK_ASSIGNMENTS, MOCK_TRANSACTIONS } from '../constants';
import { Clock, BookOpen, AlertCircle, TrendingUp, Users, DollarSign } from 'lucide-react';

interface DashboardProps {
  user: User;
  onNavigate: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
  const today = new Date();

  // Helper for Student/Parent Dashboard
  const StudentView = () => {
    const nextClass = MOCK_SESSIONS.find(s => 
      (s.students.includes(user.id) || (user.relatedUserIds && user.relatedUserIds.some(id => s.students.includes(id)))) &&
      new Date(s.startTime) > today
    );
    
    const pendingHomework = MOCK_ASSIGNMENTS.filter(a => a.status === 'PENDING').length;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">下一节课</p>
              <h3 className="font-semibold text-slate-800">{nextClass ? nextClass.courseName : '暂无安排'}</h3>
              {nextClass && <p className="text-xs text-slate-500">{new Date(nextClass.startTime).toLocaleString('zh-CN', { weekday: 'short', hour: '2-digit', minute: '2-digit' })}</p>}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
             <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">待办作业</p>
              <h3 className="font-semibold text-slate-800">{pendingHomework} 项</h3>
              <p className="text-xs text-slate-500">请及时提交</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
             <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">最近成绩</p>
              <h3 className="font-semibold text-slate-800">稳步上升</h3>
              <p className="text-xs text-slate-500">查看详情</p>
            </div>
          </div>
        </div>

        <div className="bg-indigo-600 rounded-2xl p-6 text-white relative overflow-hidden">
           <div className="relative z-10">
             <h2 className="text-2xl font-bold mb-2">欢迎回到擎思堂, {user.name}</h2>
             <p className="opacity-90 mb-4">"学而不思则罔，思而不学则殆。" —— 孔子</p>
             <button onClick={() => onNavigate('schedule')} className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-slate-100 transition">
               查看完整课表
             </button>
           </div>
           <div className="absolute right-0 bottom-0 opacity-10 transform translate-y-1/4 translate-x-1/4">
              <BookOpen size={200} />
           </div>
        </div>
      </div>
    );
  };

  const TeacherView = () => {
    const mySessions = MOCK_SESSIONS.filter(s => s.teacherId === user.id);
    const todaySessions = mySessions.filter(s => new Date(s.startTime).toDateString() === today.toDateString());

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-800">工作台</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-700 mb-4 flex items-center">
              <Clock className="mr-2" size={18} /> 今日课程
            </h3>
            {todaySessions.length > 0 ? (
              <ul className="space-y-3">
                {todaySessions.map(s => (
                  <li key={s.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-800">{s.courseName}</p>
                      <p className="text-sm text-slate-500">{s.room} · {s.students.length}人</p>
                    </div>
                    <span className="text-indigo-600 font-medium text-sm">
                      {new Date(s.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 text-sm">今日暂无课程安排</p>
            )}
          </div>
          
           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-700 mb-4 flex items-center">
              <AlertCircle className="mr-2" size={18} /> 待办事项
            </h3>
            <ul className="space-y-3 text-sm">
               <li className="flex items-start space-x-2 text-slate-600">
                 <span className="w-2 h-2 bg-red-400 rounded-full mt-1.5"></span>
                 <span>批改 "奥数竞赛班" 昨天的作业 (3人未交)</span>
               </li>
               <li className="flex items-start space-x-2 text-slate-600">
                 <span className="w-2 h-2 bg-yellow-400 rounded-full mt-1.5"></span>
                 <span>填写周三课程的教学反馈</span>
               </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const AdminView = () => {
    const totalStudents = 128; // Mock
    const monthlyRevenue = 45000;
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">在读学员</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">{totalStudents}</h3>
              </div>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Users size={20} />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2 flex items-center">
              <TrendingUp size={12} className="mr-1"/> +5% 较上月
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
             <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">本月营收</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">¥{monthlyRevenue.toLocaleString()}</h3>
              </div>
              <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                <DollarSign size={20} />
              </div>
            </div>
             <p className="text-xs text-slate-400 mt-2">
              截止今日
            </p>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
             <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">今日课程</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">{MOCK_SESSIONS.length} 节</h3>
              </div>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <BookOpen size={20} />
              </div>
            </div>
          </div>
          
           <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
             <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">待确认缴费</p>
                <h3 className="text-2xl font-bold text-red-600 mt-1">{MOCK_TRANSACTIONS.filter(t => t.status === 'UNPAID').length} 笔</h3>
              </div>
              <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                <AlertCircle size={20} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-bold text-slate-800 mb-4">快捷操作</h3>
          <div className="flex gap-4">
             <button className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 font-medium text-sm transition">新建课程</button>
             <button className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 font-medium text-sm transition">排课管理</button>
             <button className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 font-medium text-sm transition">录入成绩</button>
             <button className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 font-medium text-sm transition">学员缴费</button>
          </div>
        </div>
      </div>
    );
  };

  if (user.role === Role.ADMIN) return <AdminView />;
  if (user.role === Role.TEACHER) return <TeacherView />;
  return <StudentView />;
};

export default Dashboard;
