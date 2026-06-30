import { useState, useEffect, useCallback } from 'react';

export function useCodeforces() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [stats, setStats] = useState({
    rating: 'Unrated',
    rank: 'None',
    maxRating: '-',
    maxRank: '-',
    unsolvedCount: 0,
  });
  
  const [chartsData, setChartsData] = useState({
    difficulty: { labels: [], values: [] },
    topics: { labels: [], values: [] },
  });

  const [weakTopics, setWeakTopics] = useState([]);
  const [unsolvedBacklog, setUnsolvedBacklog] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [upcomingLoading, setUpcomingLoading] = useState(false);
  const [upcomingError, setUpcomingError] = useState(null);

  const fetchUpcomingContests = useCallback(async () => {
    setUpcomingLoading(true);
    setUpcomingError(null);
    try {
      const response = await fetch('https://codeforces.com/api/contest.list?gym=false');
      const data = await response.json();
      if (data.status !== "OK") {
        throw new Error('Failed to pull schedule parameters');
      }
      // Sort: closest to starting comes first. Since relativeTimeSeconds is negative BEFORE the contest starts,
      // sorting descending puts the least negative (i.e. largest value) first.
      const upcoming = data.result
        .filter(c => c.phase === "BEFORE")
        .sort((a, b) => b.relativeTimeSeconds - a.relativeTimeSeconds);
      setUpcomingContests(upcoming);
    } catch (err) {
      setUpcomingError(err.message || 'Failed to load upcoming contests');
    } finally {
      setUpcomingLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUpcomingContests();
  }, [fetchUpcomingContests]);

  const loadUserData = useCallback(async (handle) => {
    if (!handle) return;
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch Profile
      const profileUrl = `https://codeforces.com/api/user.info?handles=${handle}`;
      const profileRes = await fetch(profileUrl);
      const profileData = await profileRes.json();
      if (profileData.status !== "OK") {
        throw new Error(profileData.comment || "API Error");
      }
      const user = profileData.result[0];
      setUserInfo(user);

      // 2. Fetch Submissions
      const submissionsUrl = `https://codeforces.com/api/user.status?handle=${handle}`;
      const subRes = await fetch(submissionsUrl);
      const subData = await subRes.json();
      if (subData.status !== "OK") {
        throw new Error(subData.comment || "API Error");
      }
      const submissionData = subData.result;

      // Process submission data (matching exact logic from main.html)
      const uniqueSolvedSet = new Set();
      const difficultyCountsMap = {};
      const nonSolvedIndexMap = {};
      const topicSubmissionsMap = {};
      const topicAcceptedMap = {};

      submissionData.forEach(item => {
        if (item.problem && item.contestId && item.contestId < 100000) { 
          const internalProblemKey = `${item.problem.contestId}-${item.problem.index}`;
          const problemTags = item.problem.tags || [];

          problemTags.forEach(tag => {
            topicSubmissionsMap[tag] = (topicSubmissionsMap[tag] || 0) + 1;
          });

          if (item.verdict === "OK") {
            if (!uniqueSolvedSet.has(internalProblemKey)) {
              uniqueSolvedSet.add(internalProblemKey);

              const problemRating = item.problem.rating;
              if (problemRating) {
                difficultyCountsMap[problemRating] = (difficultyCountsMap[problemRating] || 0) + 1;
              }

              problemTags.forEach(tag => {
                topicAcceptedMap[tag] = (topicAcceptedMap[tag] || 0) + 1;
              });
            }
          } else if (item.verdict !== "TESTING") {
            nonSolvedIndexMap[internalProblemKey] = item.problem;
          }
        }
      });

      // Topic distributions
      const sortedSolvedTopics = Object.keys(topicAcceptedMap).sort((a, b) => topicAcceptedMap[b] - topicAcceptedMap[a]);
      const pieLabels = sortedSolvedTopics;
      const pieValues = sortedSolvedTopics.map(t => topicAcceptedMap[t]);

      // Weak topics (total submissions >= 9 and successRate < 50%)
      const weakTopicsArray = [];
      Object.keys(topicSubmissionsMap).forEach(tag => {
        const total = topicSubmissionsMap[tag];
        const accepted = topicAcceptedMap[tag] || 0;
        const successRate = (accepted / total) * 100;
        if (total >= 9 && successRate < 50) {
          weakTopicsArray.push({
            tagName: tag,
            totalCount: total,
            acceptedCount: accepted,
            percentage: Math.round(successRate)
          });
        }
      });
      weakTopicsArray.sort((a, b) => a.percentage - b.percentage);
      const top3WeakTopics = weakTopicsArray.slice(0, 3);

      // Unsolved backlog
      const trueUnsolvedArray = [];
      Object.keys(nonSolvedIndexMap).forEach(keyId => {
        if (!uniqueSolvedSet.has(keyId)) {
          trueUnsolvedArray.push(nonSolvedIndexMap[keyId]);
        }
      });

      // Update states
      setStats({
        rating: user.rating || 'Unrated',
        rank: user.rank || 'None',
        maxRating: user.maxRating || '-',
        maxRank: user.maxRank || '-',
        unsolvedCount: trueUnsolvedArray.length,
      });

      setChartsData({
        difficulty: {
          labels: Object.keys(difficultyCountsMap).sort((a, b) => Number(a) - Number(b)),
          values: Object.keys(difficultyCountsMap).sort((a, b) => Number(a) - Number(b)).map(lbl => difficultyCountsMap[lbl]),
        },
        topics: {
          labels: pieLabels,
          values: pieValues,
        }
      });

      setWeakTopics(top3WeakTopics);
      setUnsolvedBacklog(trueUnsolvedArray);
      setRecentActivity(submissionData.slice(0, 7));

    } catch (err) {
      setError(err.message || 'An error occurred while loading data.');
      setUserInfo(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    userInfo,
    stats,
    chartsData,
    weakTopics,
    unsolvedBacklog,
    recentActivity,
    upcomingContests,
    upcomingLoading,
    upcomingError,
    loadUserData,
  };
}
