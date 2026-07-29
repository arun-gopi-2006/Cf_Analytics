# 🚀 Codeforces Analytics Hub

<div align="center">

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss)
![Chart.js](https://img.shields.io/badge/Chart.js-Visualization-FF6384?logo=chartdotjs)
![Codeforces API](https://img.shields.io/badge/API-Codeforces-orange)

**A modern dashboard for analyzing Codeforces user profiles with rich visual insights and performance analytics.**

</div>

---

# 📖 Overview

Codeforces Analytics Hub is a React-based analytics dashboard that provides a comprehensive overview of a programmer's Codeforces profile.

Instead of simply displaying ratings, the application transforms a user's submission history into meaningful insights such as:

- Rating statistics
- Topic-wise strengths and weaknesses
- Solved problem distribution
- Weak topic detection
- Unsolved backlog
- Upcoming contests
- Recent submissions

The project is designed with a clean and modular architecture using reusable React components.

---

# ✨ Features

### 👤 User Analytics

- Search any Codeforces handle
- Current Rating
- Current Rank
- Maximum Rating
- Maximum Rank

---

### 📊 Difficulty Distribution

Visualizes solved problems according to their difficulty ratings using interactive bar charts.

---

### 🥧 Topic Distribution

Displays solved problems grouped by tags using Chart.js Pie Charts.

Examples:

- DP
- Graphs
- Greedy
- Binary Search
- Trees
- Math
- Implementation

---

### 🎯 Weak Topic Detection

Automatically identifies the weakest topics based on

- Total attempts
- Accepted submissions
- Success percentage

Only statistically significant topics are considered.

---

### ❌ Unsolved Backlog

Shows every attempted but unsolved problem with direct links to Codeforces.

Perfect for revision.

---

### 📅 Upcoming Contests

Displays upcoming Codeforces contests fetched directly from the official API.

Includes

- Contest Name
- Date
- Time Remaining

---

### 📜 Recent Activity

Shows the latest submissions including

- Problem Name
- Programming Language
- Verdict
- Submission Date

---

# 🛠 Tech Stack

| Technology       | Purpose             |
| ---------------- | ------------------- |
| React            | Frontend Framework  |
| JavaScript (ES6) | Application Logic   |
| Tailwind CSS     | Styling             |
| Chart.js         | Data Visualization  |
| Codeforces API   | User & Contest Data |
| Vite / CRA       | Build Tool          |

---

# 📂 Project Structure

```text
src/
│
├── assets/
│
├── components/
│   ├── Header.jsx
│   ├── SearchBar.jsx
│   ├── Stats/
│   ├── Charts/
│   ├── Tables/
│   ├── UpcomingContests.jsx
│   ├── UnsolvedProblems.jsx
│   └── Loader.jsx
│
├── hooks/
│   └── useCodeforces.js
│
├── services/
│   └── codeforcesApi.js
│
├── utils/
│   ├── analytics.js
│   └── rankColors.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/yourusername/codeforces-analytics.git
```

Move into the project

```bash
cd codeforces-analytics
```

Install dependencies

```bash
npm install
```

Run locally

```bash
npm start
```

---

# 🌐 Codeforces APIs Used

### User Information

```
https://codeforces.com/api/user.info
```

### User Submissions

```
https://codeforces.com/api/user.status
```

### Contest List

```
https://codeforces.com/api/contest.list
```

---

# 📈 Dashboard Includes

- Rating Analytics
- Peak Rating
- Topic Analysis
- Solved Difficulty Distribution
- Weakest Topics
- Recent Activity
- Upcoming Contests
- Unsolved Problems

---

# 🎨 UI Highlights

- Responsive Design
- Dark Theme
- Interactive Charts
- Smooth Hover Effects
- Clean Typography
- Modern Dashboard Layout

---

# 🚀 Future Improvements

- Authentication
- Daily Problem Recommendations
- Virtual Contest Tracker
- Rating Prediction
- Heatmaps
- Contest History Graph
- Friend Comparison
- Export Analytics as PDF
- AI-based Topic Recommendations

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**P Arun Gopi Chandu**

2024CSB1138

IIT Ropar

If you like this project, consider giving it a ⭐ on GitHub.
