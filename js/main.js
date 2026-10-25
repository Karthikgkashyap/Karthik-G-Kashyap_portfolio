/**
 * KARTHIK G KASHYAP — PORTFOLIO ENGINE
 * Vanilla JavaScript (ES6+)
 * Includes:
 * - Dynamic Theme Accent Customizer (Amber, Emerald, Violet, Cyan)
 * - Hero Canvas Particle Animation (Adapts to Active Theme)
 * - Navigation & Smooth Scroll Spy
 * - Project Filter System
 * - Extended Project Modals with Interactive Tabs:
 *    1. Overview (Architecture & Features)
 *    2. Live Interactive Simulators (Crop Predictor, Kanban Board, AI DB Chatbot, Price Estimator)
 *    3. System Architecture Flow & Formatted Code Snippets
 * - Toast Notification System
 * - Copy-to-Clipboard Functionality
 * - Scroll Reveal Observer
 * - Contact Form Validation & Submission
 * - Back to Top Button
 */

// ============================================================================
// PROJECT DATA REPOSITORY (Enriched with Simulators, Architecture & Code)
// ============================================================================
const PROJECTS_DATA = [
  {
    id: "smart-agro",
    title: "Smart Agro Recommendation System",
    badge: "Machine Learning & Full-Stack",
    category: "ml",
    shortDesc: "Intelligent crop and soil recommendation engine utilizing multivariate machine learning models based on environmental metrics.",
    fullDesc: "A complete machine learning web application built in Python that accurately predicts optimal crops for cultivation by analyzing multivariate environmental inputs, including soil nitrogen (N), phosphorus (P), potassium (K), soil pH, ambient temperature, rainfall patterns, and humidity levels.",
    features: [
      "Trained classification model achieving high accuracy across diverse soil and climate datasets.",
      "Interactive web interface accepting real-time environmental parameters.",
      "Exploratory data analysis and visualization pipelines using Pandas, NumPy, and Matplotlib.",
      "Direct actionable insights for farmers and agronomists to optimize yield and resource utilization."
    ],
    tech: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "HTML5", "CSS3"],
    github: "https://github.com/Karthikgkashyap",
    demo: "#",
    architecture: [
      { title: "Input Ingestion", desc: "NPK, pH, Temperature & Rainfall sensor feeds" },
      { title: "Feature Pipeline", desc: "Outlier clipping, missing value handling & StandardScaler" },
      { title: "Inference Engine", desc: "Random Forest Classifier cross-validated on agro datasets" },
      { title: "Recommendation", desc: "Predicted crop output with confidence percentage" }
    ],
    codeSnippet: `# Smart Agro Recommendation Pipeline
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

class CropRecommendationEngine:
    def __init__(self, dataset_path: str = "crop_data.csv"):
        self.scaler = StandardScaler()
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self._is_trained = False
        
    def train(self, df: pd.DataFrame):
        features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
        X = self.scaler.fit_transform(df[features])
        y = df['label']
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        self.model.fit(X_train, y_train)
        self._is_trained = True
        return self.model.score(X_test, y_test)

    def predict(self, n: float, p: float, k: float, temp: float, humidity: float, ph: float, rainfall: float):
        raw_inputs = np.array([[n, p, k, temp, humidity, ph, rainfall]])
        scaled_inputs = self.scaler.transform(raw_inputs)
        crop_prediction = self.model.predict(scaled_inputs)[0]
        confidence = np.max(self.model.predict_proba(scaled_inputs)) * 100
        return {
            "recommended_crop": crop_prediction,
            "confidence_score": round(confidence, 2)
        }`
  },
  {
    id: "task-manager",
    title: "Office Task Management System",
    badge: "Full-Stack Web Application",
    category: "fullstack",
    shortDesc: "A centralized team workflow management platform for assigning, tracking, and completing business tasks in real-time.",
    fullDesc: "A comprehensive web-based task management platform engineered to streamline team workflows, task assignments, and progress monitoring. It features structured status workflows (To-Do, In Progress, Review, Completed), task priority tagging, deadline reminders, and role-based views.",
    features: [
      "Robust backend built with Python Flask and PostgreSQL relational database.",
      "Centralized responsive dashboard with live progress indicators and metrics.",
      "Task assignment, priority categorization, deadline tracking, and status transitions.",
      "Clean RESTful API endpoints for seamless data flow and modular architecture."
    ],
    tech: ["Python", "Flask", "PostgreSQL", "JavaScript", "HTML5", "CSS3", "REST APIs"],
    github: "https://github.com/Karthikgkashyap",
    demo: "#",
    architecture: [
      { title: "Client Layer", desc: "Responsive HTML5/CSS3 Kanban board dashboard" },
      { title: "Flask REST API", desc: "JWT Authentication, CRUD routing & status validation" },
      { title: "SQLAlchemy ORM", desc: "Data modeling, relational constraints & indexing" },
      { title: "PostgreSQL DB", desc: "ACID transactional persistence for team tasks" }
    ],
    codeSnippet: `# Office Task Management REST Controller & Models
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://karthik:secret@localhost:5432/taskdb'
db = SQLAlchemy(app)

class Task(db.Model):
    __tablename__ = 'office_tasks'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(140), nullable=False)
    status = db.Column(db.String(25), default='To-Do')  # To-Do, In Progress, Completed
    priority = db.Column(db.String(20), default='Medium')
    assignee = db.Column(db.String(60), default='Unassigned')
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

@app.route('/api/tasks/<int:task_id>/transition', methods=['PATCH'])
def transition_task(task_id):
    task = Task.query.get_or_404(task_id)
    next_status = request.json.get('status')
    if next_status not in ['To-Do', 'In Progress', 'Completed']:
        return jsonify({"error": "Invalid status transition"}), 400
    
    task.status = next_status
    db.session.commit()
    return jsonify({"message": f"Task moved to {next_status}", "task_id": task.id})`
  },
  {
    id: "ai-chatbot",
    title: "AI Chatbot with Database Integration",
    badge: "AI & Database Engineering",
    category: "ai",
    shortDesc: "Intelligent conversational chatbot processing natural language queries with dynamic PostgreSQL query resolution.",
    fullDesc: "An AI-powered conversational agent developed using Python and Flask that processes natural-language user inquiries and provides intelligent, context-aware responses through a clean chat interface. Integrated directly with a PostgreSQL database for real-time data lookup and transaction support.",
    features: [
      "Natural language processing and prompt engineering pipelines for query understanding.",
      "Seamless PostgreSQL integration for dynamic data retrieval and state persistence.",
      "Lightweight asynchronous communication between frontend web client and Flask server.",
      "Extensible response dispatching mechanism for diverse query domains."
    ],
    tech: ["Python", "Flask", "PostgreSQL", "JavaScript", "REST APIs", "Prompt Engineering"],
    github: "https://github.com/Karthikgkashyap",
    demo: "#",
    architecture: [
      { title: "Chat Interface", desc: "User inputs natural-language text or queries" },
      { title: "Intent & NLP Parser", desc: "Prompt decomposition & entity extraction" },
      { title: "Safe SQL Generator", desc: "Dynamic parametric SQL query synthesis" },
      { title: "PostgreSQL Database", desc: "Live query execution & structured JSON synthesis" }
    ],
    codeSnippet: `# AI Chatbot Dynamic PostgreSQL Query Synthesis
import re
from flask import Flask, request, jsonify
import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask(__name__)

INTENT_TEMPLATES = {
    "pending_tasks": "SELECT id, title, priority, assignee FROM office_tasks WHERE status = 'To-Do' LIMIT 5;",
    "team_members": "SELECT id, full_name, role, department FROM team_roster ORDER BY department;",
    "task_metrics": "SELECT status, COUNT(*) as count FROM office_tasks GROUP BY status;"
}

def map_intent(prompt: str) -> str:
    cleaned = prompt.lower()
    if any(w in cleaned for w in ["pending", "open", "todo", "to-do"]):
        return INTENT_TEMPLATES["pending_tasks"]
    elif any(w in cleaned for w in ["team", "members", "staff", "who"]):
        return INTENT_TEMPLATES["team_members"]
    elif any(w in cleaned for w in ["stats", "metric", "breakdown", "count"]):
        return INTENT_TEMPLATES["task_metrics"]
    return "SELECT title, status, priority FROM office_tasks ORDER BY updated_at DESC LIMIT 3;"

@app.route('/api/chat', methods=['POST'])
def process_message():
    user_msg = request.json.get('message', '')
    sql_query = map_intent(user_msg)
    
    with psycopg2.connect("dbname=enterprise user=karthik", cursor_factory=RealDictCursor) as conn:
        with conn.cursor() as cur:
            cur.execute(sql_query)
            results = cur.fetchall()
            
    return jsonify({
        "response": f"Processed query against PostgreSQL. Retrieved {len(results)} records.",
        "executed_sql": sql_query,
        "records": results
    })`
  },
  {
    id: "house-price",
    title: "House Price Prediction Pipeline",
    badge: "Data Science & Regression",
    category: "ml",
    shortDesc: "Predictive regression modeling pipeline analyzing residential property attributes to forecast accurate market valuations.",
    fullDesc: "An end-to-end data science project utilizing Scikit-learn pipelines to estimate residential housing valuations. Implements extensive exploratory data analysis, missing value imputation, outlier mitigation, and feature scaling before model training.",
    features: [
      "Comprehensive Exploratory Data Analysis (EDA) and correlation visualization using Matplotlib & Seaborn.",
      "Advanced feature engineering and automated preprocessing pipeline.",
      "Rigorous cross-validation and hyperparameter optimization for regression models.",
      "Evaluated performance using RMSE, MAE, and R-squared metrics."
    ],
    tech: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Data Pipelines"],
    github: "https://github.com/Karthikgkashyap",
    demo: "#",
    architecture: [
      { title: "Property Attributes", desc: "Square footage, bedrooms, bathrooms, locality" },
      { title: "EDA & Engineering", desc: "Outlier winsorization, log transforms & correlation matrix" },
      { title: "Regression Model", desc: "Gradient Boosting & Ridge Regressor pipeline" },
      { title: "Market Valuation", desc: "Predicted valuation range with confidence bounds" }
    ],
    codeSnippet: `# End-to-End Real Estate Valuation Pipeline
import numpy as np
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error, r2_score

class RealEstateValuationPipeline:
    def __init__(self):
        self.pipeline = Pipeline([
            ('scaler', StandardScaler()),
            ('regressor', GradientBoostingRegressor(n_estimators=150, max_depth=4, random_state=42))
        ])

    def fit_model(self, X_train: pd.DataFrame, y_train: pd.Series):
        self.pipeline.fit(X_train, y_train)
        print("Model trained successfully.")

    def estimate_price(self, sqft: float, bedrooms: int, bathrooms: int, location_score: float) -> dict:
        sample = np.array([[sqft, bedrooms, bathrooms, location_score]])
        pred_price = self.pipeline.predict(sample)[0]
        
        return {
            "estimated_price": round(float(pred_price), 2),
            "lower_bound": round(float(pred_price * 0.94), 2),
            "upper_bound": round(float(pred_price * 1.06), 2),
            "currency": "INR Lakhs"
        }`
  }
];

// ============================================================================
// INITIALIZATION ON DOM READY
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initThemeSwitcher();
  initHeroCanvas();
  initNavigation();
  initScrollSpy();
  initProjectsFilter();
  initProjectModals();
  initContactForm();
  initBackToTop();
  initCopyButtons();
  initScrollReveal();
});

// ============================================================================
// 1. THEME ACCENT CUSTOMIZER
// ============================================================================
function initThemeSwitcher() {
  const pickerBtn = document.getElementById("themePickerBtn");
  const dropdown = document.getElementById("themeDropdown");
  const themeOptions = document.querySelectorAll(".theme-option");
  const currentDot = document.querySelector(".current-theme-dot");

  const THEMES = {
    amber: { hex: "#d99b6b" },
    emerald: { hex: "#10b981" },
    violet: { hex: "#a855f7" },
    cyan: { hex: "#06b6d4" }
  };

  // Restore saved theme from localStorage
  const savedTheme = localStorage.getItem("kgk_accent_theme") || "amber";
  applyTheme(savedTheme);

  function applyTheme(themeName) {
    if (!THEMES[themeName]) themeName = "amber";
    document.documentElement.setAttribute("data-accent", themeName);
    localStorage.setItem("kgk_accent_theme", themeName);

    if (currentDot) {
      currentDot.style.background = THEMES[themeName].hex;
      currentDot.style.boxShadow = `0 0 10px ${THEMES[themeName].hex}`;
    }

    themeOptions.forEach(opt => {
      if (opt.dataset.theme === themeName) {
        opt.classList.add("active");
      } else {
        opt.classList.remove("active");
      }
    });

    // Notify any components that need color recalculations
    window.dispatchEvent(new CustomEvent("accent-changed", { detail: { theme: themeName, hex: THEMES[themeName].hex } }));
  }

  if (pickerBtn && dropdown) {
    pickerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle("open");
      pickerBtn.setAttribute("aria-expanded", String(isOpen));
    });

    themeOptions.forEach(opt => {
      opt.addEventListener("click", (e) => {
        e.stopPropagation();
        const theme = opt.dataset.theme;
        applyTheme(theme);
        dropdown.classList.remove("open");
        pickerBtn.setAttribute("aria-expanded", "false");
        showToast(`Theme accent changed to ${opt.textContent.trim()}!`);
      });
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target) && !pickerBtn.contains(e.target)) {
        dropdown.classList.remove("open");
        pickerBtn.setAttribute("aria-expanded", "false");
      }
    });
  }
}

// ============================================================================
// 2. HERO PARTICLES / WIREFRAME CANVAS (DYNAMIC COLOR)
// ============================================================================
function initHeroCanvas() {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];
  const particleCount = 42;
  const maxDistance = 140;

  let currentAccentHex = "#d99b6b";

  function getAccentRgb() {
    const style = getComputedStyle(document.documentElement);
    const color = style.getPropertyValue("--accent-color").trim() || currentAccentHex;
    // Helper to parse hex
    if (color.startsWith("#")) {
      const c = color.replace("#", "");
      const r = parseInt(c.substring(0, 2), 16) || 217;
      const g = parseInt(c.substring(2, 4), 16) || 155;
      const b = parseInt(c.substring(4, 6), 16) || 107;
      return `${r}, ${g}, ${b}`;
    }
    return "217, 155, 107";
  }

  let currentRgb = getAccentRgb();

  window.addEventListener("accent-changed", () => {
    currentRgb = getAccentRgb();
  });

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.55;
      this.vy = (Math.random() - 0.5) * 0.55;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${currentRgb}, 0.5)`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    particles.forEach(p => p.draw());
    return;
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${currentRgb}, ${0.16 * (1 - dist / maxDistance)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// ============================================================================
// 3. STICKY NAVIGATION & MOBILE DRAWER
// ============================================================================
function initNavigation() {
  const header = document.querySelector(".site-header");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link, .nav-cta");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  });

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navItems.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !navToggle.contains(e.target) && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
}

// ============================================================================
// 4. SCROLL SPY FOR ACTIVE NAV ITEM
// ============================================================================
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// ============================================================================
// 5. PROJECT CATEGORY FILTERING
// ============================================================================
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(10px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 200);
        }
      });
    });
  });
}

// ============================================================================
// 6. EXTENDED PROJECT MODALS & LIVE SIMULATORS
// ============================================================================
function initProjectModals() {
  const modalOverlay = document.getElementById("projectModal");
  const modalClose = document.getElementById("modalClose");
  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalDesc = document.getElementById("modalDesc");
  const modalFeatures = document.getElementById("modalFeatures");
  const modalTechStack = document.getElementById("modalTechStack");
  const modalGithubLink = document.getElementById("modalGithubLink");
  const modalArchDiagram = document.getElementById("modalArchitectureDiagram");
  const modalCodeSnippet = document.getElementById("modalCodeSnippet");
  const copyCodeBtn = document.getElementById("copyCodeBtn");
  const simulatorContainer = document.getElementById("simulatorContainer");
  const modalTabs = document.querySelectorAll(".modal-tab");
  const tabContents = document.querySelectorAll(".modal-tab-content");
  const detailButtons = document.querySelectorAll(".view-details-btn");

  if (!modalOverlay) return;

  let activeProject = null;

  // Tab switching
  modalTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      modalTabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tabContents.forEach(c => c.classList.remove("active"));

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      const targetTabId = "tab" + tab.dataset.tab.charAt(0).toUpperCase() + tab.dataset.tab.slice(1);
      const targetContent = document.getElementById(targetTabId);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });

  // Copy Code Button
  if (copyCodeBtn && modalCodeSnippet) {
    copyCodeBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(modalCodeSnippet.textContent);
      showToast("Code snippet copied to clipboard!");
    });
  }

  function openModal(projectId) {
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    if (!project) return;
    activeProject = project;

    modalTitle.textContent = project.title;
    modalCategory.textContent = project.badge;
    modalDesc.textContent = project.fullDesc;

    // Features
    modalFeatures.innerHTML = project.features
      .map(feat => `<li>${feat}</li>`)
      .join("");

    // Tech
    modalTechStack.innerHTML = project.tech
      .map(t => `<span class="tech-tag">${t}</span>`)
      .join("");

    // GitHub Link
    if (modalGithubLink) {
      modalGithubLink.href = project.github;
    }

    // Architecture diagram
    if (modalArchDiagram && project.architecture) {
      modalArchDiagram.innerHTML = project.architecture
        .map((node, idx) => `
          <div class="arch-node">
            <div class="arch-node-title">${node.title}</div>
            <div class="arch-node-desc">${node.desc}</div>
          </div>
          ${idx < project.architecture.length - 1 ? '<div class="arch-arrow">➔</div>' : ''}
        `).join("");
    }

    // Code snippet
    if (modalCodeSnippet && project.codeSnippet) {
      modalCodeSnippet.textContent = project.codeSnippet;
    }

    // Reset tabs to Overview
    modalTabs.forEach(t => {
      const isOverview = t.dataset.tab === "overview";
      t.classList.toggle("active", isOverview);
      t.setAttribute("aria-selected", String(isOverview));
    });
    tabContents.forEach(c => {
      c.classList.toggle("active", c.id === "tabOverview");
    });

    // Render Live Simulator for active project
    renderSimulator(project.id);

    modalOverlay.classList.add("open");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modalClose?.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove("open");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    activeProject = null;
  }

  detailButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const pid = btn.dataset.projectId;
      openModal(pid);
    });
  });

  modalClose?.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("open")) {
      closeModal();
    }
  });

  // Render Simulator by ID
  function renderSimulator(id) {
    if (!simulatorContainer) return;

    if (id === "smart-agro") {
      renderSmartAgroSimulator();
    } else if (id === "task-manager") {
      renderTaskManagerSimulator();
    } else if (id === "ai-chatbot") {
      renderChatbotSimulator();
    } else if (id === "house-price") {
      renderHousePriceSimulator();
    } else {
      simulatorContainer.innerHTML = `<p style="color:var(--text-secondary);">Interactive preview not available for this project.</p>`;
    }
  }

  // --- 1. Smart Agro Simulator ---
  function renderSmartAgroSimulator() {
    simulatorContainer.innerHTML = `
      <div class="simulator-card">
        <div class="sim-header">
          <h4>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
            Soil & Climate Inference Sandbox
          </h4>
          <span class="sim-badge">Live ML Inference</span>
        </div>

        <div class="sim-controls-grid">
          <div class="sim-control-group">
            <div class="sim-control-header">
              <span>Nitrogen (N)</span>
              <span class="val" id="nVal">90 kg/ha</span>
            </div>
            <input type="range" class="sim-slider" id="nSlider" min="10" max="140" value="90">
          </div>

          <div class="sim-control-group">
            <div class="sim-control-header">
              <span>Phosphorus (P)</span>
              <span class="val" id="pVal">42 kg/ha</span>
            </div>
            <input type="range" class="sim-slider" id="pSlider" min="10" max="140" value="42">
          </div>

          <div class="sim-control-group">
            <div class="sim-control-header">
              <span>Potassium (K)</span>
              <span class="val" id="kVal">45 kg/ha</span>
            </div>
            <input type="range" class="sim-slider" id="kSlider" min="10" max="200" value="45">
          </div>

          <div class="sim-control-group">
            <div class="sim-control-header">
              <span>Temperature</span>
              <span class="val" id="tempVal">26 °C</span>
            </div>
            <input type="range" class="sim-slider" id="tempSlider" min="10" max="45" value="26">
          </div>

          <div class="sim-control-group">
            <div class="sim-control-header">
              <span>Soil pH</span>
              <span class="val" id="phVal">6.5</span>
            </div>
            <input type="range" class="sim-slider" id="phSlider" min="4" max="9" step="0.1" value="6.5">
          </div>

          <div class="sim-control-group">
            <div class="sim-control-header">
              <span>Rainfall</span>
              <span class="val" id="rainVal">205 mm</span>
            </div>
            <input type="range" class="sim-slider" id="rainSlider" min="30" max="300" value="205">
          </div>
        </div>

        <button type="button" class="sim-action-btn" id="runAgroBtn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          Run Crop Recommendation
        </button>

        <div class="sim-output-box" id="agroOutputBox">
          <div class="sim-output-header">Model Prediction Result</div>
          <div class="sim-output-content">
            <span style="color:var(--accent-color); font-size: 1.3rem;" id="agroResultCrop">🌾 Rice</span>
            <span class="sim-metric-pill" id="agroConfidence">Confidence: 96.8%</span>
            <span class="sim-metric-pill" id="agroConditionPill">Optimal Tropical Wet Zone</span>
          </div>
        </div>
      </div>
    `;

    // Sliders live text
    const pairs = [
      ['nSlider', 'nVal', ' kg/ha'],
      ['pSlider', 'pVal', ' kg/ha'],
      ['kSlider', 'kVal', ' kg/ha'],
      ['tempSlider', 'tempVal', ' °C'],
      ['phSlider', 'phVal', ''],
      ['rainSlider', 'rainVal', ' mm']
    ];

    pairs.forEach(([sId, vId, unit]) => {
      const s = document.getElementById(sId);
      const v = document.getElementById(vId);
      if (s && v) {
        s.addEventListener('input', () => { v.textContent = s.value + unit; });
      }
    });

    const runBtn = document.getElementById("runAgroBtn");
    const outBox = document.getElementById("agroOutputBox");
    const resCrop = document.getElementById("agroResultCrop");
    const conf = document.getElementById("agroConfidence");
    const cond = document.getElementById("agroConditionPill");

    if (runBtn) {
      runBtn.addEventListener("click", () => {
        const rain = Number(document.getElementById("rainSlider").value);
        const temp = Number(document.getElementById("tempSlider").value);
        const n = Number(document.getElementById("nSlider").value);
        const k = Number(document.getElementById("kSlider").value);

        let crop = "🌾 Rice";
        let cScore = 96.4;
        let cDesc = "High Rainfall & Humid Condition";

        if (rain > 170 && temp >= 22) {
          crop = "🌾 Rice (Oryza sativa)";
          cScore = 97.2;
          cDesc = "Optimal High Precipitation Climate";
        } else if (n > 80 && rain <= 120) {
          crop = "🌽 Maize (Zea mays)";
          cScore = 95.1;
          cDesc = "Nitrogen-Rich Loamy Soil";
        } else if (k > 70 && temp >= 25) {
          crop = "🌿 Cotton (Gossypium)";
          cScore = 94.6;
          cDesc = "Warm Climate & High Potassium Tolerance";
        } else if (temp < 22 && rain < 95) {
          crop = "🌾 Wheat (Triticum)";
          cScore = 93.8;
          cDesc = "Temperate Sub-Tropical Dry Climate";
        } else if (rain >= 130 && rain <= 170) {
          crop = "☕ Coffee (Coffea arabica)";
          cScore = 92.4;
          cDesc = "Well-Drained Acidic-Neutral Mountain Loam";
        } else {
          crop = "🌱 Chickpea / Pulses";
          cScore = 91.5;
          cDesc = "Balanced Moderate Profile";
        }

        resCrop.textContent = crop;
        conf.textContent = `Confidence: ${cScore}%`;
        cond.textContent = cDesc;
        outBox.classList.add("visible");
      });
    }
  }

  // --- 2. Office Task Manager Simulator ---
  function renderTaskManagerSimulator() {
    let tasks = [
      { id: 1, title: "Refactor PostgreSQL connection pool", status: "To-Do", priority: "high" },
      { id: 2, title: "Implement JWT auth interceptor", status: "In Progress", priority: "med" },
      { id: 3, title: "Audit REST API status codes", status: "Completed", priority: "low" }
    ];

    function drawBoard() {
      const todoItems = tasks.filter(t => t.status === "To-Do");
      const inProgItems = tasks.filter(t => t.status === "In Progress");
      const doneItems = tasks.filter(t => t.status === "Completed");

      simulatorContainer.innerHTML = `
        <div class="simulator-card">
          <div class="sim-header">
            <h4>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
              Live Kanban Board Simulator
            </h4>
            <span class="sim-badge">PostgreSQL Status State</span>
          </div>

          <div style="display:flex; gap:0.5rem; margin-bottom:1rem;">
            <input type="text" id="newTaskInput" placeholder="Add a new sprint task..." style="flex:1; background:var(--bg-secondary); border:1px solid var(--border-subtle); border-radius:6px; padding:0.45rem 0.75rem; color:#fff; font-size:0.8rem;">
            <button type="button" id="addTaskBtn" class="sim-action-btn" style="padding:0.45rem 0.9rem; font-size:0.775rem;">+ Add Task</button>
          </div>

          <div class="kanban-board">
            <div class="kanban-col">
              <div class="kanban-col-title">
                <span>To-Do</span>
                <span>(${todoItems.length})</span>
              </div>
              <div id="todoCards">
                ${todoItems.map(t => renderKanbanCard(t, 'In Progress')).join('')}
              </div>
            </div>

            <div class="kanban-col">
              <div class="kanban-col-title">
                <span>In Progress</span>
                <span>(${inProgItems.length})</span>
              </div>
              <div id="inProgCards">
                ${inProgItems.map(t => renderKanbanCard(t, 'Completed')).join('')}
              </div>
            </div>

            <div class="kanban-col">
              <div class="kanban-col-title">
                <span>Completed</span>
                <span>(${doneItems.length})</span>
              </div>
              <div id="doneCards">
                ${doneItems.map(t => renderKanbanCard(t, 'To-Do')).join('')}
              </div>
            </div>
          </div>
        </div>
      `;

      // Attach card move events
      simulatorContainer.querySelectorAll(".kanban-move-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const tid = Number(btn.dataset.id);
          const targetStatus = btn.dataset.target;
          const taskObj = tasks.find(t => t.id === tid);
          if (taskObj) {
            taskObj.status = targetStatus;
            drawBoard();
            showToast(`Task updated to "${targetStatus}"`);
          }
        });
      });

      // Add task event
      const addBtn = document.getElementById("addTaskBtn");
      const input = document.getElementById("newTaskInput");
      if (addBtn && input) {
        addBtn.addEventListener("click", () => {
          const val = input.value.trim();
          if (val) {
            tasks.unshift({ id: Date.now(), title: val, status: "To-Do", priority: "med" });
            drawBoard();
            showToast("New task created on board!");
          }
        });
      }
    }

    function renderKanbanCard(t, nextStatus) {
      return `
        <div class="kanban-card">
          <div class="kanban-card-title">${t.title}</div>
          <div class="kanban-card-meta">
            <span class="kanban-priority ${t.priority}">${t.priority.toUpperCase()}</span>
            <button type="button" class="kanban-move-btn" data-id="${t.id}" data-target="${nextStatus}">Move ➔ ${nextStatus}</button>
          </div>
        </div>
      `;
    }

    drawBoard();
  }

  // --- 3. AI Chatbot Simulator ---
  function renderChatbotSimulator() {
    simulatorContainer.innerHTML = `
      <div class="simulator-card" style="padding: 1.25rem;">
        <div class="sim-header" style="margin-bottom:0.75rem;">
          <h4>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            Interactive Chatbot & PostgreSQL Query Dispatcher
          </h4>
          <span class="sim-badge">Live NLP & SQL</span>
        </div>

        <div class="chatbot-sim-window">
          <div class="chatbot-messages" id="simChatMessages">
            <div class="chat-bubble bot">
              Hello! I'm Karthik's AI Assistant connected to the PostgreSQL database. Ask me about pending tasks, active team members, or sprint statistics.
            </div>
          </div>

          <div class="chatbot-chips">
            <button type="button" class="chat-preset-chip" data-query="Show pending tasks">📋 Pending Tasks</button>
            <button type="button" class="chat-preset-chip" data-query="Who are the active team members?">👥 Active Team</button>
            <button type="button" class="chat-preset-chip" data-query="Give me a task count breakdown">📊 Task Statistics</button>
          </div>

          <div class="chatbot-input-bar">
            <input type="text" class="chatbot-input" id="chatbotInput" placeholder="Type a message or select a preset query above...">
            <button type="button" class="chatbot-send-btn" id="chatbotSendBtn">Send</button>
          </div>
        </div>
      </div>
    `;

    const chatWindow = document.getElementById("simChatMessages");
    const input = document.getElementById("chatbotInput");
    const sendBtn = document.getElementById("chatbotSendBtn");
    const chips = simulatorContainer.querySelectorAll(".chat-preset-chip");

    function sendUserQuery(text) {
      if (!text.trim()) return;

      // Add user bubble
      const userBubble = document.createElement("div");
      userBubble.className = "chat-bubble user";
      userBubble.textContent = text;
      chatWindow.appendChild(userBubble);
      input.value = "";
      chatWindow.scrollTop = chatWindow.scrollHeight;

      // Simulate bot reasoning & SQL generation
      setTimeout(() => {
        let sql = "";
        let botText = "";

        const lower = text.toLowerCase();
        if (lower.includes("pending") || lower.includes("task") || lower.includes("todo")) {
          sql = "SELECT id, title, priority FROM office_tasks WHERE status = 'To-Do' LIMIT 3;";
          botText = "Found 3 pending items requiring review. Here are the top priorities:";
        } else if (lower.includes("team") || lower.includes("member") || lower.includes("who")) {
          sql = "SELECT full_name, role, department FROM team_roster WHERE active = true;";
          botText = "Active team: Karthik G Kashyap (Lead Dev), Alex R (ML Engineer), Sarah T (QA).";
        } else if (lower.includes("stat") || lower.includes("count") || lower.includes("breakdown")) {
          sql = "SELECT status, COUNT(*) AS total FROM office_tasks GROUP BY status;";
          botText = "Sprint Metrics: 4 Tasks In Progress, 2 Completed, 3 Pending in Backlog.";
        } else {
          sql = `SELECT * FROM knowledge_base WHERE query ILIKE '%${text.replace(/'/g, "")}%';`;
          botText = `Processed NLP intent for "${text}". Retrieved matching semantic documents.`;
        }

        const botBubble = document.createElement("div");
        botBubble.className = "chat-bubble bot";
        botBubble.innerHTML = `
          ${botText}
          <div class="sql-preview">
            <span style="color:var(--accent-color);">SQL Engine:</span> ${sql}
          </div>
        `;
        chatWindow.appendChild(botBubble);
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }, 400);
    }

    sendBtn.addEventListener("click", () => sendUserQuery(input.value));
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendUserQuery(input.value);
    });

    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        sendUserQuery(chip.dataset.query);
      });
    });
  }

  // --- 4. House Price Simulator ---
  function renderHousePriceSimulator() {
    simulatorContainer.innerHTML = `
      <div class="simulator-card">
        <div class="sim-header">
          <h4>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            Residential Property Valuation Calculator
          </h4>
          <span class="sim-badge">Regression Pipeline</span>
        </div>

        <div class="sim-controls-grid">
          <div class="sim-control-group">
            <div class="sim-control-header">
              <span>Carpet Area</span>
              <span class="val" id="sqftVal">1,650 sq ft</span>
            </div>
            <input type="range" class="sim-slider" id="sqftSlider" min="600" max="4500" step="50" value="1650">
          </div>

          <div class="sim-control-group">
            <div class="sim-control-header">
              <span>Bedrooms (BHK)</span>
              <span class="val" id="bedVal">3 BHK</span>
            </div>
            <input type="range" class="sim-slider" id="bedSlider" min="1" max="6" value="3">
          </div>

          <div class="sim-control-group">
            <div class="sim-control-header">
              <span>Bathrooms</span>
              <span class="val" id="bathVal">2 Baths</span>
            </div>
            <input type="range" class="sim-slider" id="bathSlider" min="1" max="5" value="2">
          </div>

          <div class="sim-control-group">
            <div class="sim-control-header">
              <span>Locality Index</span>
              <span class="val" id="locVal">Tier 1 Urban</span>
            </div>
            <input type="range" class="sim-slider" id="locSlider" min="1" max="3" value="3">
          </div>
        </div>

        <button type="button" class="sim-action-btn" id="calcPriceBtn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          Compute Valuation
        </button>

        <div class="sim-output-box" id="priceOutputBox">
          <div class="sim-output-header">Estimated Market Valuation</div>
          <div class="sim-output-content">
            <span style="color:var(--accent-color); font-size: 1.35rem;" id="priceResultVal">₹ 84.5 Lakhs</span>
            <span class="sim-metric-pill" id="priceRangePill">Range: ₹ 80.2L — ₹ 89.1L</span>
            <span class="sim-metric-pill">R² Score: 0.89</span>
          </div>
        </div>
      </div>
    `;

    const sqftSlider = document.getElementById("sqftSlider");
    const bedSlider = document.getElementById("bedSlider");
    const bathSlider = document.getElementById("bathSlider");
    const locSlider = document.getElementById("locSlider");

    sqftSlider.addEventListener("input", () => {
      document.getElementById("sqftVal").textContent = Number(sqftSlider.value).toLocaleString() + " sq ft";
    });
    bedSlider.addEventListener("input", () => {
      document.getElementById("bedVal").textContent = bedSlider.value + " BHK";
    });
    bathSlider.addEventListener("input", () => {
      document.getElementById("bathVal").textContent = bathSlider.value + " Baths";
    });
    locSlider.addEventListener("input", () => {
      const locMap = { 1: "Tier 3 Suburban", 2: "Tier 2 Metro", 3: "Tier 1 Prime" };
      document.getElementById("locVal").textContent = locMap[locSlider.value];
    });

    const calcBtn = document.getElementById("calcPriceBtn");
    const pBox = document.getElementById("priceOutputBox");
    const pRes = document.getElementById("priceResultVal");
    const pRange = document.getElementById("priceRangePill");

    if (calcBtn) {
      calcBtn.addEventListener("click", () => {
        const sqft = Number(sqftSlider.value);
        const beds = Number(bedSlider.value);
        const baths = Number(bathSlider.value);
        const loc = Number(locSlider.value);

        // Linear + Feature weights calculation
        const baseRatePerSqft = loc === 3 ? 4200 : loc === 2 ? 3100 : 2200;
        const total = (sqft * baseRatePerSqft) + (beds * 350000) + (baths * 180000);
        const lakhs = total / 100000;

        const low = (lakhs * 0.95).toFixed(1);
        const high = (lakhs * 1.05).toFixed(1);

        pRes.textContent = `₹ ${lakhs.toFixed(1)} Lakhs (~$${Math.round(total / 87).toLocaleString()})`;
        pRange.textContent = `Range: ₹ ${low}L — ₹ ${high}L`;
        pBox.classList.add("visible");
      });
    }
  }
}

// ============================================================================
// 7. TOAST NOTIFICATION ENGINE
// ============================================================================
function showToast(message, duration = 3200) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("removing");
    toast.addEventListener("animationend", () => {
      toast.remove();
    });
  }, duration);
}

// ============================================================================
// 8. COPY TO CLIPBOARD BUTTONS
// ============================================================================
function initCopyButtons() {
  const copyButtons = document.querySelectorAll("[data-copy]");

  copyButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const text = btn.dataset.copy;
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied "${text}" to clipboard!`);
        }).catch(() => {
          showToast("Unable to copy to clipboard.");
        });
      }
    });
  });
}

// ============================================================================
// 9. SCROLL REVEAL OBSERVER
// ============================================================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    ".about-grid, .skill-card, .timeline-item, .project-card, .info-box, .contact-grid, .section-heading, .section-lead"
  );

  revealElements.forEach(el => el.classList.add("reveal-on-scroll"));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

// ============================================================================
// 10. CONTACT FORM HANDLING & VALIDATION
// ============================================================================
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const nameInput = document.getElementById("userName");
  const emailInput = document.getElementById("userEmail");
  const subjectInput = document.getElementById("userSubject");
  const messageInput = document.getElementById("userMessage");
  const submitBtn = document.getElementById("submitBtn");
  const statusEl = document.getElementById("formStatus");

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(input, errorId, msg) {
    const errEl = document.getElementById(errorId);
    if (errEl) {
      errEl.textContent = msg;
      errEl.classList.add("visible");
    }
    input.setAttribute("aria-invalid", "true");
    input.style.borderColor = "#ef4444";
  }

  function clearError(input, errorId) {
    const errEl = document.getElementById(errorId);
    if (errEl) {
      errEl.textContent = "";
      errEl.classList.remove("visible");
    }
    input.setAttribute("aria-invalid", "false");
    input.style.borderColor = "";
  }

  [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
    if (!inp) return;
    inp.addEventListener("input", () => {
      const errorId = inp.id + "Error";
      clearError(inp, errorId);
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!nameInput.value.trim()) {
      showError(nameInput, "userNameError", "Please enter your name.");
      isValid = false;
    } else {
      clearError(nameInput, "userNameError");
    }

    if (!emailInput.value.trim()) {
      showError(emailInput, "userEmailError", "Please enter your email address.");
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, "userEmailError", "Please enter a valid email address.");
      isValid = false;
    } else {
      clearError(emailInput, "userEmailError");
    }

    if (!subjectInput.value.trim()) {
      showError(subjectInput, "userSubjectError", "Please enter a subject.");
      isValid = false;
    } else {
      clearError(subjectInput, "userSubjectError");
    }

    if (!messageInput.value.trim()) {
      showError(messageInput, "userMessageError", "Please enter your message.");
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, "userMessageError", "Message must be at least 10 characters.");
      isValid = false;
    } else {
      clearError(messageInput, "userMessageError");
    }

    if (!isValid) return;

    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Sending...</span>`;
    submitBtn.disabled = true;

    setTimeout(() => {
      triggerMailtoFallback();
      showFormStatus("success", "Email draft created in your default mail application to karthikgkashyap70@gmail.com.");
      showToast("Email draft prepared for Karthik!");
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 600);
  });

  function triggerMailtoFallback() {
    const to = "karthikgkashyap70@gmail.com";
    const sub = encodeURIComponent(subjectInput.value.trim() || "Portfolio Contact");
    const body = encodeURIComponent(
      `Name: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`
    );
    window.location.href = `mailto:${to}?subject=${sub}&body=${body}`;
  }

  function showFormStatus(type, msg) {
    if (!statusEl) return;
    statusEl.className = `form-status ${type}`;
    statusEl.textContent = msg;
    statusEl.style.display = "block";
    statusEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

// ============================================================================
// 11. BACK TO TOP BUTTON
// ============================================================================
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
