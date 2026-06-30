import React from 'react';
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import StatCard from './components/StatCard';
import ChartsSection from './components/ChartsSection';
import WeakTopicsTable from './components/WeakTopicsTable';
import UnsolvedBacklog from './components/UnsolvedBacklog';
import UpcomingContests from './components/UpcomingContests';
import RecentActivityTable from './components/RecentActivityTable';
import { useCodeforces } from './hooks/useCodeforces';
import { getRankColorClass } from './utils/cfStyles';

function App() {
  const {
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
  } = useCodeforces();

  const handleSearch = (handle) => {
    loadUserData(handle);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <Header />
      
      <SearchBox onSearch={handleSearch} loading={loading} />

      {error && (
        <div className="bg-rose-950/40 text-rose-300 border border-rose-800/60 p-4 rounded text-sm mb-8">
          {error}
        </div>
      )}

      {userInfo && !loading && (
        <div className="space-y-8 animate-fade-in">
          {/* Stats Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              title="Rating"
              value={stats.rating}
              subtext={stats.rank}
              valueClass={getRankColorClass(userInfo.rating)}
            />
            <StatCard
              title="Peak Rating"
              value={stats.maxRating}
              subtext={stats.maxRank}
              valueClass={getRankColorClass(userInfo.maxRating)}
            />
            <StatCard
              title="Unsolved Count"
              value={stats.unsolvedCount}
              subtext="Left unanswered"
              valueClass="text-rose-400"
            />
          </section>

          {/* Charts Section */}
          <ChartsSection
            difficultyData={chartsData.difficulty}
            topicData={chartsData.topics}
          />

          {/* Weak Topics Table */}
          <WeakTopicsTable weakTopics={weakTopics} />

          {/* Unsolved Backlog and Upcoming Rounds */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UnsolvedBacklog backlog={unsolvedBacklog} />
            <UpcomingContests
              contests={upcomingContests}
              loading={upcomingLoading}
              error={upcomingError}
            />
          </section>

          {/* Recent Platform Activity */}
          <RecentActivityTable submissions={recentActivity} />
        </div>
      )}
    </main>
  );
}

export default App;
