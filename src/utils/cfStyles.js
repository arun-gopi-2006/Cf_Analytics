export function getRankColorClass(rating) {
  if (!rating) return 'text-slate-400';
  if (rating < 1200) return 'cf-newbie';
  if (rating < 1400) return 'cf-pupil';
  if (rating < 1600) return 'cf-specialist';
  if (rating < 1900) return 'cf-expert';
  if (rating < 2100) return 'cf-candidate';
  if (rating < 2300) return 'cf-master';
  return 'cf-grandmaster';
}
