import React from 'react';

function StatCard({ title, value, subtext, valueClass = '' }) {
  return (
    <div className="bg-[#1e293b] p-5 rounded border border-slate-800">
      <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</span>
      <span className={`block text-2xl font-bold mt-1 ${valueClass}`}>{value}</span>
      <span className="block text-xs uppercase tracking-wider mt-0.5 text-slate-500">{subtext}</span>
    </div>
  );
}

export default StatCard;
