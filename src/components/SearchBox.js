import React, { useState } from 'react';

function SearchBox({ onSearch, loading }) {
  const [handle, setHandle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = handle.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  return (
    <section className="max-w-xl mb-10">
      <form onSubmit={handleSubmit}>
        <label htmlFor="handleInput" className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
          Search User Handle
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="handleInput"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="e.g. tourist, Benq"
            className="w-full bg-[#1e293b] text-sm text-slate-100 placeholder-slate-500 rounded border border-slate-700/60 px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:text-slate-400 text-white text-sm font-medium px-5 py-2.5 rounded transition-colors cursor-pointer whitespace-nowrap"
          >
            {loading ? 'Analyzing...' : 'View Analytics'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default SearchBox;
