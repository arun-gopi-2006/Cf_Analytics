import React from 'react';

function WeakTopicsTable({ weakTopics }) {
  return (
    <section className="bg-[#1e293b] rounded border border-slate-800 overflow-hidden">
      <div className="p-5 border-b border-slate-800">
        <h3 className="text-sm font-semibold text-slate-200">Top 3 Weakest Topics Analytics</h3>
        <p className="text-xs text-slate-400 mt-0.5">Identified from standard structural areas with 9 or more total submissions.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-800/40 text-slate-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4 font-semibold">Topic / Tag Name</th>
              <th className="p-4 font-semibold">Total Submissions</th>
              <th className="p-4 font-semibold">Accepted Solutions</th>
              <th className="p-4 font-semibold">Success in Percentage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {weakTopics.length > 0 ? (
              weakTopics.map((topic) => (
                <tr key={topic.tagName} className="hover:bg-slate-800/20 transition-colors">
                  <td className="p-4 font-semibold text-slate-200 capitalize">{topic.tagName}</td>
                  <td className="p-4 text-slate-400 font-mono text-xs">{topic.totalCount}</td>
                  <td className="p-4 text-emerald-400 font-mono text-xs">{topic.acceptedCount}</td>
                  <td className="p-4 text-rose-400 font-mono text-sm font-semibold">{topic.percentage}%</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-slate-500 text-xs">
                  Insufficient data to compute weakness sets (Requires &gt;= 9 submissions).
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default WeakTopicsTable;
