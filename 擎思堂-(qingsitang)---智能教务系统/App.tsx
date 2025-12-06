import React, { useState } from 'react';
import { User, Role } from './types';
import { MOCK_USERS } from './constants';
import Dashboard from './components/Dashboard';
import Schedule from './components/Schedule';
import Grades from './components/Grades';
import Finance from './components/Finance';
import Classroom from './components/Classroom';
import { Home, Calendar, BookOpen, TrendingUp, DollarSign, Settings, LogOut, Menu, X, User as UserIcon } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Login Screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-indigo-900 mb-2">擎思堂</h1>
            <p className="text-slate-500">智能教务管理系统</p>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-700 mb-2">选择角色快速体验:</p>
            {MOCK_USERS.map(user => (
              <button
                key={user.id}
                onClick={() => setCurrentUser(user)}
                className="w-full flex items-center p-3 border border-slate-200 rounded-xl hover:bg-indigo-50 hover:border-indigo-300 transition group"
              >
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-4 grayscale group-hover:grayscale-0 transition" />
                <div className="text-left">
                  <div className="font-bold text-slate-800">{user.name}</div>
                  <div className="text-xs text-slate-500 uppercase">{user.role === Role.PARENT ? '家长' : user.role === Role.STUDENT ? '学生' : user.role === Role.TEACHER ? '老师' : '管理员'}</div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-8 text-center">
             <p className="text-xs text-slate-400">模拟手机号登录界面</p>
          </div>
        </div>
      </div>
    );
  }

  // Navigation Items
  const navItems = [
    { id: 'dashboard', label: '首页概览', icon: Home },
    { id: 'schedule', label: '课表考勤', icon: Calendar },
    { id: 'classroom', label: '课堂作业', icon: BookOpen },
    { id: 'grades', label: '成绩分析', icon: TrendingUp },
    { id: 'finance', label: '财务管理', icon: DollarSign },
    ...(currentUser.role === Role.ADMIN ? [{ id: 'settings', label: '教务设置', icon: Settings }] : []),
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard user={currentUser} onNavigate={setCurrentView} />;
      case 'schedule': return <Schedule user={currentUser} />;
      case 'grades': return <Grades user={currentUser} />;
      case 'finance': return <Finance user={currentUser} />;
      case 'classroom': return <Classroom user={currentUser} />;
      default: return <div className="p-10 text-center text-slate-400">功能开发中...</div>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-slate-900 text-white shadow-xl z-20">
        <div className="p-6 border-b border-slate-800">
           <h1 className="text-2xl font-bold tracking-tight">擎思堂</h1>
           <p className="text-xs text-slate-400 mt-1">智慧教育 启迪未来</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${currentView === item.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center space-x-3 mb-4 px-2">
            <img src={currentUser.avatar} alt="User" className="w-8 h-8 rounded-full border border-slate-600"/>
            <div className="flex-1 min-w-0">
               <p className="text-sm font-medium truncate">{currentUser.name}</p>
               <p className="text-xs text-slate-500 truncate capitalize">{currentUser.role.toLowerCase()}</p>
            </div>
          </div>
          <button 
            onClick={() => setCurrentUser(null)} 
            className="w-full flex items-center justify-center space-x-2 p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 text-sm transition"
          >
            <LogOut size={16} /> <span>退出登录</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
      
      {/* Mobile Sidebar */}
      <aside className={`fixed top-0 left-0 bottom-0 w-64 bg-slate-900 text-white z-40 transform transition-transform duration-300 md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <div className="p-6 flex justify-between items-center border-b border-slate-800">
           <h1 className="text-xl font-bold">擎思堂</h1>
           <button onClick={() => setIsSidebarOpen(false)}><X size={24}/></button>
         </div>
         <nav className="p-4 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setCurrentView(item.id); setIsSidebarOpen(false); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${currentView === item.id ? 'bg-indigo-600' : 'text-slate-400'}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
          <button 
             onClick={() => setCurrentUser(null)}
             className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 mt-8"
          >
             <LogOut size={20} />
             <span>退出登录</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50 relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-white p-4 shadow-sm flex justify-between items-center z-10">
          <button onClick={() => setIsSidebarOpen(true)} className="text-slate-600">
            <Menu size={24} />
          </button>
          <span className="font-bold text-slate-800">{navItems.find(n => n.id === currentView)?.label}</span>
          <img src={currentUser.avatar} alt="User" className="w-8 h-8 rounded-full" />
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
           <div className="max-w-7xl mx-auto">
             {/* Header on Desktop */}
             <div className="hidden md:flex justify-between items-center mb-8">
               <h2 className="text-2xl font-bold text-slate-800">{navItems.find(n => n.id === currentView)?.label}</h2>
               <div className="flex items-center space-x-4">
                  <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200 text-sm text-slate-500 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> 系统正常运行
                  </div>
               </div>
             </div>
             
             {renderContent()}
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;
