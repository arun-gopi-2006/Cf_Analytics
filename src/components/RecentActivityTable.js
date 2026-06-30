import React from 'react';

function RecentActivityTable({ submissions }) {
  return (
    <section className="bg-[#1e293b] rounded border border-slate-800 overflow-hidden">
      <div className="p-5 border-b border-slate-800">
        <h3 className="text-sm font-semibold text-slate-200">Recent Platform Activity (Last 7 Submissions)</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-800/40 text-slate-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4 font-semibold">Problem</th>
              <th className="p-4 font-semibold">Language</th>
              <th className="p-4 font-semibold">Status / Verdict</th>
              <th className="p-4 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {submissions.length > 0 ? (
              submissions.map((item) => {
                let colorCode = "text-rose-400";
                if (item.verdict === "OK") colorCode = "text-emerald-400 font-semibold";
                else if (item.verdict === "TESTING") colorCode = "text-slate-400 animate-pulse";

                const labelString = item.verdict === "OK" ? "Accepted" : (item.verdict ? item.verdict.replace(/_/g, ' ') : 'UNKNOWN');

                return (
                  <tr key={item.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 font-medium text-blue-400">
                      <a
                        href={`https://codeforces.com/contest/${item.contestId}/problem/${item.problem.index}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {item.problem.name} ({item.problem.index})
                      </a>
                    </td>
                    <td className="p-4 text-slate-400 font-mono text-xs">{item.programmingLanguage}</td>
                    <td className={`p-4 text-xs tracking-wide ${colorCode}`}>{labelString}</td>
                    <td className="p-4 text-slate-400 text-xs">
                      {new Date(item.creationTimeSeconds * 1000).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-slate-500 text-xs">
                  No recorded submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RecentActivityTable;
