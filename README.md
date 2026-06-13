# 🎓 Student Placement Predictor

An end-to-end AI/ML web application that predicts whether a student will get placed based on their academic profile. Built with a Python ML backend and a modern React frontend.

![Accuracy](https://img.shields.io/badge/Model%20Accuracy-90%25-brightgreen)
![Python](https://img.shields.io/badge/Python-3.11%2B-blue)
![React](https://img.shields.io/badge/React-18-61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688)

---

## 🚀 Live Demo

> Frontend: `http://localhost:5173`
> Backend API: `http://localhost:8000`
> API Docs: `http://localhost:8000/docs`

---



## 🧠 How It Works

1. User enters academic details (CGPA, IQ, Projects, etc.)
2. React frontend sends a POST request to the FastAPI backend
3. Backend loads the trained ML model and scaler
4. Model predicts placement probability
5. Result is displayed with a probability bar, radial gauge, improvement tips, and prediction history

---

## 🗂️ Project Structure

```
AI_ML/
├── app.py                              ← FastAPI backend server
├── placement_model.pkl                 ← Trained Logistic Regression model
├── scaler.pkl                          ← StandardScaler for feature normalization
├── college_student_placement_dataset.csv ← Dataset (10,000 students)
├── Untitled.ipynb                      ← ML training notebook
└── placement-frontend/                 ← React frontend
    ├── src/
    │   ├── App.jsx                     ← Main React component
    │   ├── index.css                   ← Tailwind CSS import
    │   └── main.jsx                    ← React entry point
    ├── vite.config.js                  ← Vite + Tailwind config
    └── package.json
```

---

## 📊 Dataset

- **Source:** College Student Placement Dataset
- **Size:** 10,000 students
- **Features:** 8 input features
- **Target:** Placement (Yes / No)

| Feature | Description |
|---------|-------------|
| IQ | Student IQ score (40–160) |
| Prev_Sem_Result | Previous semester result (0–10) |
| CGPA | Cumulative GPA (0–10) |
| Academic_Performance | Academic performance rating (1–10) |
| Internship_Experience | Has internship experience (Yes/No) |
| Extra_Curricular_Score | Extracurricular activity score (1–10) |
| Communication_Skills | Communication skills rating (1–10) |
| Projects_Completed | Number of projects completed (0–10) |

---

## 🤖 ML Model

| Model | Train Accuracy | Test Accuracy |
|-------|---------------|---------------|
| Logistic Regression | 90.20% | **90.30%** ✅ |
| Random Forest | 100.00% | 99.95% ⚠️ (overfit) |
| XGBoost | 100.00% | 100.00% ⚠️ (overfit) |

**Chosen Model:** Logistic Regression with StandardScaler and `C=0.5` regularization — most reliable, no overfitting.

**Evaluation Metrics:**
- Accuracy: **90%**
- Precision (Placed): 75%
- Recall (Placed): 60%
- F1-Score (Placed): 67%

---

## 🛠️ Tech Stack

### Backend
- **Python 3.11+**
- **FastAPI** — REST API framework
- **Uvicorn** — ASGI server
- **Scikit-learn** — ML model training
- **Joblib** — Model serialization
- **Pandas / NumPy** — Data processing

### Frontend
- **React 18** — UI framework
- **Vite** — Build tool
- **Tailwind CSS** — Styling
- **Axios** — HTTP requests
- **Recharts** — Radial gauge chart

---

## ⚙️ Setup & Installation

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/student-placement-predictor.git
cd student-placement-predictor
```

### 2. Install Python dependencies
```bash
pip install fastapi uvicorn scikit-learn xgboost pandas numpy joblib pydantic
```

### 3. Train the model (optional — pkl files included)
Open `Untitled.ipynb` in Jupyter and run all cells.

### 4. Start the backend
```bash
uvicorn app:app --reload
```
Backend runs at `http://localhost:8000`

### 5. Install frontend dependencies
```bash
cd placement-frontend
npm install
```

### 6. Start the frontend
```bash
npm run dev
```
Frontend runs at `http://localhost:5173`

---

## 🔌 API Reference

### `GET /`
Health check endpoint.

**Response:**
```json
{ "message": "Placement Prediction API is running!" }
```

### `POST /predict`
Predict placement for a student.

**Request Body:**
```json
{
  "IQ": 115,
  "Prev_Sem_Result": 8.5,
  "CGPA": 8.2,
  "Academic_Performance": 8,
  "Internship_Experience": 1,
  "Extra_Curricular_Score": 7,
  "Communication_Skills": 8,
  "Projects_Completed": 3
}
```

**Response:**
```json
{
  "placed": true,
  "probability": 72.45,
  "message": "Likely to be Placed ✅"
}
```

---

## ✨ Features

- 🎯 **Accurate Predictions** — 90% accuracy on 10,000 student dataset
- 📊 **Probability Gauge** — Visual radial chart showing placement probability
- 💡 **Improvement Tips** — Personalized tips based on weak areas
- 🕒 **Prediction History** — Track last 5 predictions with timestamps
- 📱 **Responsive Design** — Works on desktop and mobile
- ⚡ **Real-time** — Instant predictions via REST API

---

## 🔮 Future Improvements

- [ ] Deploy backend to Render / Railway
- [ ] Deploy frontend to Vercel
- [ ] Add more features (coding skills, certifications)
- [ ] Use a larger, more diverse dataset
- [ ] Add user authentication
- [ ] Export prediction report as PDF

---

## 👤 Author

**Your Name**
- GitHub: [DHARMIK VYAS](https://github.com/TheDharmikVyas)
- LinkedIn: [DHARMIK VYAS](https://linkedin.com/in/thedharmikvyas)

---


> Built with ❤️ as a portfolio project to demonstrate end-to-end ML application development.

