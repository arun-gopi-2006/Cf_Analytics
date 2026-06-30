import React from 'react';

function UnsolvedBacklog({ backlog }) {
  return (
    <div className="bg-[#1e293b] p-5 rounded border border-slate-800 flex flex-col h-64">
      <h3 className="text-sm font-semibold text-slate-200 mb-1">Unsolved Backlog</h3>
      <p className="text-xs text-slate-400 mb-4">Problems attempted with missing successful verdicts.</p>
      <div className="custom-scroll flex-grow overflow-y-auto flex flex-wrap gap-1.5 content-start pr-1">
        {backlog.length > 0 ? (
          backlog.map((prob) => {
            const key = `${prob.contestId}-${prob.index}`;
            return (
              <a
                key={key}
                href={`https://codeforces.com/contest/${prob.contestId}/problem/${prob.index}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-rose-950/40 text-xs text-slate-300 hover:text-rose-300 border border-slate-700/70 hover:border-rose-900 px-2 py-1 rounded transition-all font-mono font-medium"
              >
                {prob.contestId}{prob.index}
              </a>
            );
          })
        ) : (
          <span className="text-xs text-slate-500">No pending unsolved problems.</span>
        )}
      </div>
    </div>
  );
}

export default UnsolvedBacklog;
