
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SAMPLE_DOMAINS } from '../constants';
import { OrderStatus } from '../types';

export const CheckoutPage: React.FC = () => {
  const { id } = useParams();
  const domain = SAMPLE_DOMAINS.find(d => d.id === id);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!domain) return <div className="p-24 text-center">Domain not found.</div>;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate Escrow.com API Call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep(3);
  };

  return (
    <div className="pt-24 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        {/* Progress Tracker */}
        <div className="flex items-center justify-between mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${
                step >= s ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                {s}
              </div>
              <span className={`text-xs font-bold uppercase tracking-widest ${
                step >= s ? 'text-indigo-600' : 'text-slate-400'
              }`}>
                {s === 1 ? 'Details' : s === 2 ? 'Confirm' : 'Done'}
              </span>
            </div>
          ))}
          <div className="absolute top-[132px] left-1/2 -translate-x-1/2 w-48 h-0.5 bg-slate-200 -z-10 hidden md:block" />
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12">
          {step === 1 && (
            <form onSubmit={handleNext}>
              <h2 className="text-3xl font-bold mb-6">Buyer Information</h2>
              <p className="text-slate-500 mb-8">Please provide your legal contact details to initiate the Escrow process.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <input 
                    required
                    type="email" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name (Optional)</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg"
              >
                Continue to Payment Confirmation
              </button>
            </form>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Confirm Purchase</h2>
              <div className="bg-indigo-50 p-6 rounded-2xl mb-8 border border-indigo-100">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-600">Domain Asset:</span>
                  <span className="font-bold text-indigo-900">{domain.domain}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-slate-600">Brokerage Price:</span>
                  <span className="font-bold text-indigo-900">${domain.price.toLocaleString()}</span>
                </div>
                <div className="border-t border-indigo-200 pt-4 flex justify-between items-center">
                  <span className="text-lg font-bold">Total due to Escrow:</span>
                  <span className="text-2xl font-black text-indigo-600">${domain.price.toLocaleString()}</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-bold mb-2">Buyer Details</h3>
                <p className="text-slate-600">{formData.name}</p>
                <p className="text-slate-600">{formData.email}</p>
                {formData.company && <p className="text-slate-600">{formData.company}</p>}
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  Edit Details
                </button>
                <button 
                  onClick={handleConfirm}
                  disabled={isProcessing}
                  className="flex-3 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Contacting Escrow.com...
                    </>
                  ) : 'Initiate Secure Escrow'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Escrow Initiated!</h2>
              <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto">
                Check your email. Escrow.com has sent you an invitation to fund the transaction for <span className="font-bold text-slate-900">{domain.domain}</span>.
              </p>
              <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left inline-block">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Reference ID</p>
                <code className="text-lg font-mono text-indigo-600">ESC-992-00182-XQ</code>
              </div>
              <div className="flex flex-col gap-4">
                <a href="#/" className="text-indigo-600 font-bold hover:underline">Back to Marketplace</a>
                <p className="text-xs text-slate-400">Need help? Contact support@domainclarity.com</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
