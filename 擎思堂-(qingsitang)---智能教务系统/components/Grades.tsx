import React from 'react';
import { User, Role } from '../types';
import { MOCK_GRADES, CHART_DATA_U1 } from '../constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Award, List } from 'lucide-react';

interface GradesProps {
  user: User;
}

const Grades: React.FC<GradesProps> = ({ user }) => {
  // Simple filter for demo
  const myGrades = user.role === Role.STUDENT 
    ? MOCK_GRADES.filter(g => g.studentId === user.id)
    : user.role === Role.PARENT 
      ? MOCK_GRADES.filter(g => user.relatedUserIds?.includes(g.studentId))
      : MOCK_GRADES; // Teachers/Admins see all for demo

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
            <TrendingUp className="mr-2 text-indigo-600" /> 成绩趋势分析
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CHART_DATA_U1}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Legend />
                <Line type="monotone" dataKey="score" name="我的分数" stroke="#4f46e5" strokeWidth={3} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="avg" name="班级平均" stroke="#94a3b8" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-indigo-50 rounded-lg text-sm text-indigo-800">
            <strong>分析建议：</strong> 该生在最近一次期末模拟中表现优异，超过班级平均分9分。数学科目基础稳固，建议保持当前学习节奏，适当增加拓展题型训练。
          </div>
        </div>

        {/* Stats Section */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Award size={28} />
                <h3 className="font-bold text-lg">最佳表现</h3>
              </div>
              <p className="opacity-90 text-sm mb-4">最近一次考试</p>
              <div className="text-4xl font-bold">98 <span className="text-lg font-normal">分</span></div>
              <p className="mt-2 text-sm opacity-80">数学 · 期末模拟</p>
           </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
             <h3 className="font-bold text-slate-800 mb-4">学情报告</h3>
             <ul className="space-y-3 text-sm">
               <li className="flex justify-between text-slate-600">
                 <span>测验总数</span>
                 <span className="font-bold">5 次</span>
               </li>
               <li className="flex justify-between text-slate-600">
                 <span>平均分</span>
                 <span className="font-bold text-indigo-600">92.5</span>
               </li>
               <li className="flex justify-between text-slate-600">
                 <span>排名波动</span>
                 <span className="text-green-600">↑ 3 名</span>
               </li>
             </ul>
             <button className="w-full mt-6 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition text-sm">
               下载详细PDF报告
             </button>
           </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
           <h2 className="text-lg font-bold text-slate-800 flex items-center">
             <List className="mr-2" /> 历史成绩记录
           </h2>
           {(user.role === Role.TEACHER || user.role === Role.ADMIN) && (
             <button className="text-sm bg-indigo-600 text-white px-3 py-1.5 rounded hover:bg-indigo-700">录入成绩</button>
           )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-sm uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">考试名称</th>
                <th className="px-6 py-4 font-medium">科目</th>
                <th className="px-6 py-4 font-medium">分数</th>
                <th className="px-6 py-4 font-medium">班级平均</th>
                <th className="px-6 py-4 font-medium">日期</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myGrades.map(record => (
                <tr key={record.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-medium text-slate-800">{record.examName}</td>
                  <td className="px-6 py-4 text-slate-600">{record.subject}</td>
                  <td className={`px-6 py-4 font-bold ${record.score >= 90 ? 'text-green-600' : record.score < 60 ? 'text-red-500' : 'text-slate-800'}`}>
                    {record.score}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{record.classAverage}</td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{record.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Grades;
