import React, { useState } from 'react';
import { User, Role, PaymentStatus } from '../types';
import { MOCK_TRANSACTIONS } from '../constants';
import { CreditCard, DollarSign, Download, Clock, X, QrCode, Smartphone, CheckCircle2 } from 'lucide-react';

interface FinanceProps {
  user: User;
}

const Finance: React.FC<FinanceProps> = ({ user }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'alipay' | 'wechat' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const transactions = MOCK_TRANSACTIONS.filter(t => {
     if (user.role === Role.ADMIN) return true;
     return t.userId === user.id;
  });

  const StatusBadge = ({ status }: { status: PaymentStatus }) => {
    switch (status) {
      case PaymentStatus.PAID: return <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">已支付</span>;
      case PaymentStatus.UNPAID: return <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">待支付</span>;
      default: return <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded">处理中</span>;
    }
  };

  const handlePayment = () => {
    if (!selectedAmount || !paymentMethod) return;
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentModalOpen(false);
      alert('模拟支付成功！');
      setSelectedAmount(null);
      setPaymentMethod(null);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Balance Card */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
           <h3 className="opacity-90 text-sm mb-1">{user.role === Role.TEACHER ? '本月预计课酬' : '剩余课时 / 账户余额'}</h3>
           <div className="text-3xl font-bold mb-4">
             {user.role === Role.TEACHER ? '¥5,000.00' : '24 课时'}
           </div>
           {user.role !== Role.TEACHER && (
             <div className="flex space-x-3">
               <button 
                 onClick={() => setIsPaymentModalOpen(true)}
                 className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-slate-100 transition shadow-sm"
               >
                 立即充值
               </button>
               <button className="bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-indigo-800 transition shadow-sm">
                 购买套餐
               </button>
             </div>
           )}
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm flex flex-col justify-center">
           <h3 className="font-bold text-slate-800 mb-2">
             {user.role === Role.TEACHER ? '结算规则' : '当前套餐'}
           </h3>
           <p className="text-slate-500 text-sm mb-4">
             {user.role === Role.TEACHER 
               ? '基础课时费 ¥150/节 + 人头绩效 ¥10/人。每月5号结算上月工资。'
               : '秋季全科强化班 (共40课时)，有效期至 2024-01-30。'
             }
           </p>
           <a href="#" className="text-indigo-600 text-sm font-medium hover:underline">查看详细协议 &rarr;</a>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-slate-800 flex items-center">
            <DollarSign className="mr-2" size={20} /> 财务明细
          </h2>
          <button className="text-slate-400 hover:text-slate-600">
            <Download size={20} />
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {transactions.length > 0 ? (
            transactions.map(t => (
              <div key={t.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
                <div className="flex items-center">
                  <div className={`p-3 rounded-full mr-4 ${t.type === 'WAGE' ? 'bg-green-50 text-green-600' : 'bg-indigo-50 text-indigo-600'}`}>
                    {t.type === 'WAGE' ? <DollarSign size={20} /> : <CreditCard size={20} />}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{t.description}</p>
                    <p className="text-xs text-slate-500 flex items-center">
                      <Clock size={12} className="mr-1" /> {t.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${t.type === 'WAGE' ? 'text-green-600' : 'text-slate-800'}`}>
                    {t.type === 'WAGE' ? '+' : '-'} ¥{t.amount.toLocaleString()}
                  </p>
                  <div className="mt-1"><StatusBadge status={t.status} /></div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-500">暂无财务记录</div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">账户充值</h3>
              <button onClick={() => setIsPaymentModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Amount Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">选择充值金额</label>
                <div className="grid grid-cols-3 gap-3">
                  {[500, 1000, 3000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setSelectedAmount(amt)}
                      className={`py-3 px-2 rounded-xl border text-sm font-bold transition ${
                        selectedAmount === amt 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                        : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                      }`}
                    >
                      ¥{amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">选择支付方式</label>
                <div className="space-y-3">
                  <button
                    onClick={() => setPaymentMethod('wechat')}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition ${
                      paymentMethod === 'wechat' ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded bg-green-500 flex items-center justify-center text-white">
                        <MessageSquare size={18} fill="currentColor" />
                      </div>
                      <span className="font-medium text-slate-800">微信支付</span>
                    </div>
                    {paymentMethod === 'wechat' && <CheckCircle2 className="text-green-600" size={20} />}
                  </button>

                  <button
                    onClick={() => setPaymentMethod('alipay')}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition ${
                      paymentMethod === 'alipay' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center text-white">
                        <QrCode size={18} />
                      </div>
                      <span className="font-medium text-slate-800">支付宝</span>
                    </div>
                    {paymentMethod === 'alipay' && <CheckCircle2 className="text-blue-600" size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-500 block">支付总额</span>
                <span className="text-xl font-bold text-slate-800">
                  {selectedAmount ? `¥${selectedAmount.toLocaleString()}` : '¥0'}
                </span>
              </div>
              <button 
                disabled={!selectedAmount || !paymentMethod || isProcessing}
                onClick={handlePayment}
                className={`px-6 py-2.5 rounded-lg font-bold text-white transition flex items-center ${
                  !selectedAmount || !paymentMethod || isProcessing
                  ? 'bg-slate-300 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200'
                }`}
              >
                {isProcessing ? '处理中...' : '立即支付'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper for icon
const MessageSquare = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);

export default Finance;