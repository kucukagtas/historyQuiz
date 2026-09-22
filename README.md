# 🏛️ Turkish History Quiz (historyQuiz) — Interactive Educational Web Application

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live_Demo-kucukagtas.github.io%2FhistoryQuiz-4F46E5?style=for-the-badge&logo=githubpages&logoColor=white)](https://kucukagtas.github.io/historyQuiz/)
[![Language: English](https://img.shields.io/badge/Language-English-blue?style=for-the-badge&logo=googletranslate&logoColor=white)](https://kucukagtas.github.io/historyQuiz/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Bootstrap 5](https://img.shields.io/badge/Bootstrap_5.3.8-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Bootstrap Icons](https://img.shields.io/badge/Bootstrap_Icons-1.13.1-6f42c1?style=for-the-badge&logo=bootstrap&logoColor=white)](https://icons.getbootstrap.com/)

<p align="center">
  <strong>A modern, responsive, and educational quiz web application focusing on foundational milestones and diplomatic catalysts of modern Turkish history — featuring dark/light mode, speed-bonus scoring, historical background notes, and animated progress tracking.</strong>
</p>

[🌐 Visit Live Website](https://kucukagtas.github.io/historyQuiz/) • [✨ Key Features](#-key-features) • [🛠️ Tech Stack](#️-tech-stack) • [📁 Project Structure](#-project-structure) • [🚀 Getting Started](#-getting-started) • [🌐 Deployment](#-deployment) • [📄 License](#-license)

---

</div>

## 📖 Overview

**Turkish History Quiz (historyQuiz)** is an interactive single-page web application designed to test and deepen knowledge regarding key diplomatic, structural, and political turning points of the early Turkish Republican era (1920–1930s). Topics covered include the Treaty of Lausanne, the abolition of the Sultanate, the 1923 Population Exchange, political factions in the First Grand National Assembly, and the İzmir Economic Congress.

Engineered with modern frontend standards, the application delivers a polished, responsive user experience with glassmorphic cards, fluid transitions, and a curated dual-theme design (Indigo & Slate / Midnight Violet). With zero external build dependencies, it runs natively across any modern browser.

🔗 **Live Deployment:** [https://kucukagtas.github.io/historyQuiz/](https://kucukagtas.github.io/historyQuiz/)

---

## ✨ Key Features

- **🌓 Seamless Dark & Light Mode:**
  - Floating, animated theme toggle button (`#theme-toggle`) accessible across all views.
  - Automatic system preference detection (`prefers-color-scheme`) with persistent `localStorage` saving.
  - Curated CSS variables with rich contrast, glassmorphism (`backdrop-filter: blur(16px)`), and tailored color tokens.
- **🔀 Fisher-Yates Question Shuffling:**
  - Questions are randomly shuffled at the start of every session and replay round.
  - Prevents sequence memorization and guarantees a fresh testing experience every time.
- **💡 Historical Context & In-Depth Feedback:**
  - Selecting an answer (or experiencing a timeout) immediately displays an animated callout box (`💡 Historical Background`) explaining the diplomatic rationale and historical context behind the correct answer.
- **🟢🔴 Visual Step Indicators:**
  - Progress tracker circles at the top of the quiz card providing instant visual status:
    - **Blue (Enlarged / Glowing):** Active question.
    - **Green:** Correctly answered questions.
    - **Red:** Incorrect or timed-out questions.
- **⏱️ Synchronized Countdown & Dynamic Speed Scoring:**
  - 10-second per-question countdown synchronized with a percentage-based animated progress bar.
  - Scoring awards **100 Base Points + (Remaining Seconds × 10)** speed bonus for quick, confident responses.
  - Real-time score badge in the card footer tracking cumulative points.
- **🏆 Performance Badges & Assessment:**
  - Final results screen evaluates the user's score with tailored achievement titles:
    - `🏆 History Professor` (100% Correct)
    - `🎖️ History Expert` (80% Correct)
    - `📚 History Enthusiast` (60% Correct)
    - `📖 History Apprentice` (20–40% Correct)
    - `🎯 Better Luck Next Time!`
- **🛡️ Race-Condition Safe & Resilient State Machine:**
  - Clean separation of UI rendering and quiz state.
  - Question index increments exclusively upon advancing to the next question.
  - Hidden controls use `pointer-events: none` to prevent phantom interval triggers and accidental double-clicks.
- **📱 100% Mobile-First Responsive Design:**
  - Full viewport adaptation using dynamic Flexbox centering (`min-height: 100dvh`).
  - Mobile-specific media queries (`< 576px`) adjusting tap targets, paddings, and font sizes to ensure zero horizontal scrolling on all handheld devices.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic document structure, accessibility tags, and responsive viewport configuration |
| **CSS3** | Custom design system, CSS variables (light/dark mode), glassmorphism, responsive media queries, and keyframe animations |
| **Bootstrap 5.3.8** | Base layout utility classes, card structures, and badge styling |
| **Bootstrap Icons 1.13.1** | Vector iconography for badges, arrows, checkmarks, crosses, and theme toggle |
| **Google Fonts (Plus Jakarta Sans)** | Modern, clean geometric typography |
| **JavaScript (ES6+)** | Object-oriented state architecture (`Soru`, `Quiz`, `UI`), Fisher-Yates shuffle algorithm, and interval management |
| **GitHub Actions** | Automated CI/CD workflow deploying static assets directly to GitHub Pages |
| **GitHub Pages** | Global high-availability static web hosting |

---

## 📁 Project Structure

```text
historyQuiz/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Actions workflow for GitHub Pages
├── css/
│   └── style.css               # Design system tokens, light/dark themes, responsive layout
├── js/
│   ├── soru.js                 # Question constructor and answer evaluation prototype
│   ├── quiz.js                 # Quiz manager class managing question indexing and scoring
│   ├── ui.js                   # DOM rendering, step indicators, explanation box, and badges
│   └── app.js                  # Application controller, timer orchestration, and theme manager
├── index.html                  # Single-page application entrypoint and layout structure
├── LICENSE                     # MIT License documentation
└── README.md                   # Comprehensive project documentation
```

---

## 🚀 Getting Started

To explore or run this project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/kucukagtas/historyQuiz.git
cd historyQuiz
```

### 2. Run Locally

Since this is a lightweight, zero-dependency static web application, you can run it directly:

- **Option A (Direct in Browser):** Double-click `index.html` or open it in Google Chrome, Safari, Firefox, or Edge.
- **Option B (Python Local Server):**
  ```bash
  python3 -m http.server 8000
  ```
  Open [http://localhost:8000](http://localhost:8000) in your browser.
- **Option C (VS Code Live Server):** Right-click `index.html` and select **"Open with Live Server"**.

---

## 🌐 Deployment

This repository is pre-configured for automated deployment to **GitHub Pages** via GitHub Actions:

1. Push your changes to the `main` branch of your repository:
   ```bash
   git add .
   git commit -m "feat: enhance history quiz with dark mode, explanations, and responsive design"
   git push origin main
   ```
2. Navigate to **Settings** > **Pages** in your GitHub repository.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish the site to:
   ```
   https://<username>.github.io/historyQuiz/
   ```

---

## 📄 License

This project is open-source and distributed under the terms of the [MIT License](LICENSE).

Copyright (c) 2026 **Muhammed Küçükağtaş**.
