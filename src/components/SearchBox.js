import React, { useState } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

const EXAMPLE_HANDLES = ['tourist', 'Benq', 's1mple', 'ZywOo'];

function SearchBox({ onSearch, loading }) {
  const [handle, setHandle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = handle.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  const handleChip = (name) => {
    setHandle(name);
    onSearch(name);
  };

  return (
    <section className="max-w-xl mb-10">
      <form onSubmit={handleSubmit}>
        <label htmlFor="handleInput" className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
          Search user handle
        </label>
        <div className="flex gap-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              id="handleInput"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="e.g. tourist, Benq"
              className="w-full bg-[#1e293b] text-sm font-mono text-slate-100 placeholder-slate-500 rounded border border-slate-700/60 pl-9 pr-9 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-colors"
              disabled={loading}
            />
            {handle && !loading && (
              <button
                type="button"
                onClick={() => setHandle('')}
                aria-label="Clear"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:text-slate-400 text-white text-sm font-medium px-5 py-2.5 rounded transition-colors cursor-pointer whitespace-nowrap"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Analyzing…' : 'View analytics'}
          </button>
        </div>
      </form>

      <div className="flex items-center gap-2 mt-3">
        <span className="text-xs text-slate-500">Try:</span>
        {EXAMPLE_HANDLES.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => handleChip(name)}
            disabled={loading}
            className="text-xs font-mono text-slate-400 hover:text-blue-400 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 rounded px-2 py-1 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {name}
          </button>
        ))}
      </div>
    </section>
  );
}

export default SearchBox;
