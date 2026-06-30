import React from 'react';

function UpcomingContests({ contests, loading, error }) {
  return (
    <div className="bg-[#1e293b] p-5 rounded border border-slate-800 flex flex-col h-64">
      <h3 className="text-sm font-semibold text-slate-200 mb-1">Upcoming Rounds</h3>
      <p className="text-xs text-slate-400 mb-4">Live updates on upcoming scheduled Codeforces contests.</p>
      <div className="custom-scroll flex-grow overflow-y-auto space-y-2 pr-1">
        {loading ? (
          <p className="text-xs text-slate-500">Loading schedules...</p>
        ) : error ? (
          <p className="text-xs text-rose-400/80">{error}</p>
        ) : contests.length > 0 ? (
          contests.map((c) => {
            const absSec = Math.abs(c.relativeTimeSeconds);
            const daysLeft = Math.floor(absSec / (3600 * 24));
            const hoursLeft = Math.floor((absSec % (3600 * 24)) / 3600);
            const relativeStr = daysLeft > 0 ? `${daysLeft}d ${hoursLeft}h left` : `${hoursLeft}h left`;

            return (
              <div
                key={c.id}
                className="p-2.5 bg-slate-800/50 rounded border border-slate-700/40 flex justify-between items-center text-xs"
              >
                <div className="truncate max-w-[70%]">
                  <a
                    href={`https://codeforces.com/contests/${c.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-slate-200 hover:text-blue-400 hover:underline block truncate"
                  >
                    {c.name}
                  </a>
                  <span className="text-[10px] text-slate-500">
                    {new Date(c.startTimeSeconds * 1000).toLocaleDateString()}
                  </span>
                </div>
                <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-mono">
                  {relativeStr}
                </span>
              </div>
            );
          })
        ) : (
          <p className="text-xs text-slate-500">No scheduled contests found.</p>
        )}
      </div>
    </div>
  );
}

export default UpcomingContests;
