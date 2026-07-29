import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const TREND_STYLES = {
  up: { icon: TrendingUp, className: 'text-emerald-400' },
  down: { icon: TrendingDown, className: 'text-rose-400' },
  neutral: { icon: Minus, className: 'text-slate-500' },
};

function StatCard({ title, value, subtext, valueClass = '', icon: Icon, trend, trendValue }) {
  const trendConfig = trend ? TREND_STYLES[trend] : null;
  const TrendIcon = trendConfig?.icon;

  return (
    <div className="bg-[#1e293b] p-5 rounded border border-slate-800 hover:border-slate-700 transition-colors">
      <div className="flex items-center justify-between">
        <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</span>
        {Icon && <Icon className="w-4 h-4 text-slate-500" />}
      </div>

      <span className={`block text-2xl font-bold mt-1.5 ${valueClass}`}>{value}</span>

      <div className="flex items-center justify-between mt-0.5">
        <span className="block text-xs uppercase tracking-wider text-slate-500">{subtext}</span>
        {trendConfig && (
          <span className={`flex items-center gap-0.5 text-xs font-medium ${trendConfig.className}`}>
            <TrendIcon className="w-3 h-3" />
            {trendValue}
          </span>
        )}
      </div>
    </div>
  );
}

export default StatCard;
