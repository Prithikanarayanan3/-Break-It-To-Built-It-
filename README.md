# Break It to Build It 🎓
> **An Interactive, Socratic Debugging Learning Platform for University Students**
> **AI Debugger: Clover**

A clean, modern, light-mode educational platform (inspired by LeetCode and HackerRank) featuring a structured 30+ question bank across 4 difficulty levels and 10 programming languages, a clean CPU and Memory line chart, dual code input modes, line-by-line Socratic guidance from **Clover**, a **Custom Interview Builder**, and a **Daily Analytics & Progress Report**.

---

## 🚀 Quick Launch

### Direct Browser Launch
Open `index.html` directly in any web browser:
```bash
file:///c:/break it to build it/index.html
```

Or serve locally with Node:
```bash
npx serve .
```

---

## 🌟 Top-Level Navigation Tabs

### 💻 TAB 1: Practice Sandbox (Current View)
- **10 Programming Languages**: Python, C, C++, Java, JavaScript, TypeScript, Go, Rust, C#, PHP.
- **30+ Concept Problems per Difficulty Level**: 120 distinct CS concept questions per language (Easy, Medium, Hard, Interview Level).
- **Interactive Code Editor**: Line numbers, Tab indentation, syntax status, and dual modes (Sample Template vs Custom Paste Code).
- **Line-by-Line Socratic Debugging**: Click any line number in the gutter or the `💡` fault marker to inspect with **Clover**.
- **Real-Time Performance Line Graph**: Clean dual-line chart showing CPU usage (%) and Memory allocation (MB).
- **Test Invariants & Sandbox Terminal**: Live test case pass/fail evaluation and standard output console.
- **Clover Socratic AI Drawer**: Step-by-step hints (Observation, Concept, Guiding Question) and conversational inquiries.

### ⏱️ TAB 2: Custom Interview Builder
- **Personalized Assessment Creation**:
  - Target Language Selector (Python, C, C++, Java, JS, TS, Go, Rust, C#, PHP).
  - Question Count Configuration (1 to 20 questions with live slider).
  - Difficulty Distribution Breakdown: Interactive steppers for Easy, Medium, Hard, and Interview Level questions, with a visual distribution progress bar.
  - Total Time Limit Presets: 15m, 30m, 45m, 60m, 90m.
  - Assessment Presets: Junior SDE Warmup (5 Qs • 30m), Mid-Level Technical Screen (8 Qs • 45m), Senior Gauntlet (10 Qs • 60m).
- **Active Timed Assessment Session**:
  - Sticky countdown timer bar (`⏱️ Time Remaining: MM:SS`) with warning flash below 5 mins.
  - Question navigation pills (`Q1`, `Q2`, `Q3`...) with solved indicators.
  - Integrated code editor, "Run Code", "Mark as Solved", and test cases runner.
  - Completion modal with score percentage, time spent, and automatic recording to Daily Analytics.

### 📊 TAB 3: Daily Analytics & Progress Report
- **Academic Statistical Dashboard**:
  - Summary Metric Cards: Total Tests Taken, Average Debugging Accuracy (%), Average Time Per Bug (mins), and Total Solved Bugs.
  - **Daily Activity Line/Bar Chart**: 14-day tracking of completed mock tests and solved problems.
  - **Difficulty Mastery Donut Chart**: Visual competency breakdown across Easy (95%), Medium (82%), Hard (74%), and Interview (68%).
  - **Language Proficiency Bar Chart**: Accuracy rates across Python, C++, Java, JS, TS, Go, etc.
  - **Historical Test Log Table**: Detailed log of all completed assessments with Date, Name, Language, Score, Time Spent, and Status.
  - **LocalStorage Integration**: Persists test history and sandbox solves across browser sessions with JSON Export and Re-seed options.
