import React from 'react';

function Header() {
  return (
    <header className="mb-12 border-b border-slate-800 pb-6">
      <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Codeforces Analytics Hub</h1>
      <p className="text-sm text-slate-400 mt-1">
        A simple profile analytics tool tracking problem distributions, topics, and unsolved targets.
      </p>
    </header>
  );
}

export default Header;
