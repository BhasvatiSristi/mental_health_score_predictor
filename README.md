# Mental Health Score Predictor

A modern, AI-powered web application that predicts mental health wellness scores based on social media usage patterns and lifestyle factors. Built with a FastAPI backend and a premium vanilla JavaScript frontend.

![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)

---

## 🎯 Overview

Mental Health Score Predictor is an AI-driven assessment tool that analyzes your digital lifestyle patterns and provides personalized mental health wellness predictions. The application uses machine learning to evaluate factors like social media usage, screen time, sleep patterns, stress levels, and physical activity to generate a mental health score on a scale of **3-10**.

### Key Highlights

- 🧠 **AI-Powered Predictions** - Uses trained ML model for accurate assessments
- 🎨 **Premium UI** - Modern, Apple-inspired design with smooth animations
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **Zero Dependencies** - Vanilla HTML, CSS, and JavaScript (no frameworks)
- 🔒 **Privacy Focused** - Data sent directly to backend, no external tracking
- ♿ **Accessible** - Semantic HTML and WCAG compliant design

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Score Interpretation](#score-interpretation)
- [User Guide](#user-guide)
- [Browser Support](#browser-support)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Disclaimer](#disclaimer)
- [License](#license)

---

## ✨ Features

### Frontend
- **Intuitive Assessment Form** - 12 input fields covering all lifestyle aspects
- **Beautiful Result Visualization** - Animated circular progress indicator (3-10 scale)
- **Smart Interpretation** - 5-level scoring system with color-coded badges
- **Personalized Recommendations** - Dynamic advice based on assessment score
- **Error Handling** - User-friendly error messages and validation
- **Loading States** - Smooth spinner during API requests
- **Responsive Design** - 2-column grid on desktop, 1-column on mobile

### Backend
- **FastAPI Framework** - High-performance async Python web framework
- **Machine Learning** - Trained model using joblib for predictions
- **CORS Support** - Cross-origin requests enabled for frontend flexibility
- **Data Validation** - Pydantic models for request/response validation
- **Type Safety** - Full type hints for better code reliability

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic markup |
| **CSS3** | Modern styling with variables & animations |
| **JavaScript (ES6+)** | Interactive functionality & API integration |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Python 3.8+** | Programming language |
| **FastAPI** | Web framework |
| **Pydantic** | Data validation |
| **joblib** | ML model persistence |
| **Pandas** | Data manipulation |
| **scikit-learn** | ML model training (assumed) |

---

## 📋 Prerequisites

### System Requirements
- Python 3.8 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)
- 4GB RAM (minimum)
- Internet connection

### Required Software
- pip (Python package manager)
- Virtual environment (recommended)

### Verify Installation
```bash
# Check Python version
python --version

# Check pip version
pip --version
```

---

## 📁 Project Structure

```
mental-health-predictor/
│
├── frontend/
│   ├── index.html          # Main HTML structure
│   ├── style.css           # Styling & animations
│   └── script.js           # JavaScript functionality
│
├── backend/
|   ├── data/
|   |   ├──Student_Social_Media_And_Mental_Health_Impact.csv  # raw data
│   ├── main.py                                                # FastAPI application
|   ├── mental_health_prediction.ipynb                         # Model Training and EDA
│   ├── models.py                                              # Pydantic models
│   ├── prediction_model.pkl                                   # Trained ML model
│   └── requirements.txt                                       # Python dependencies
│
└── README.md               # This file
```

---

## 💻 Installation

### Step 1: Clone or Download Project
```bash
# Clone from repository (if applicable)
git clone <repository-url>
cd mental-health-predictor

# Or download and extract the project
```

### Step 2: Set Up Backend

#### Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python -m venv venv
source venv/bin/activate
```

#### Install Dependencies
```bash
pip install -r backend/requirements.txt
```

**Required packages:**
```
fastapi==0.104.1
uvicorn==0.24.0
pydantic==2.5.0
joblib==1.3.2
pandas==2.1.3
```

### Step 3: Verify Model File
Ensure `backend/prediction_model.pkl` exists in the project directory:
```bash
ls backend/prediction_model.pkl  # macOS/Linux
dir backend\prediction_model.pkl # Windows
```

### Step 4: Frontend Setup
No installation needed! The frontend uses vanilla JavaScript with no external dependencies.

---

## 🚀 Running the Application

### Start the Backend Server

```bash
# Activate virtual environment (if not already active)
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

# Navigate to backend directory
cd backend

# Start FastAPI server
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Expected output:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

### Open Frontend in Browser

**Option 1: Direct File**
```bash
# Navigate to frontend directory
cd frontend

# Open in default browser (macOS/Linux)
open index.html

# Or open in default browser (Windows)
start index.html
```

**Option 2: Local Web Server (Recommended)**
```bash
# In frontend directory
# Python 3
python -m http.server 8080

# Then visit http://localhost:8080
```

**Option 3: Simple HTTP Server**
```bash
# Using Node.js (if installed)
npx http-server

# Using Ruby (if installed)
ruby -run -ehttpd . -p8080
```

### Verify Connection
1. Open frontend in browser
2. Fill out the assessment form
3. Click "Predict Score"
4. Confirm backend connection working (no errors)

---

## 📡 API Documentation

### Base URL
```
http://127.0.0.1:8000
```

### Endpoints

#### 1. Health Check
```http
GET /
```

**Response:**
```json
{
    "message": "Mental Health Score Predictor API"
}
```

#### 2. Prediction
```http
POST /predict
Content-Type: application/json
```

**Request Body:**
```json
{
    "age": 20,
    "gender": "Male",
    "country": "India",
    "academic_level": "Undergraduate",
    "most_used_platform": "Instagram",
    "purpose_of_use": "Entertainment",
    "avg_daily_usage_hours": 4.5,
    "daily_unlocks": 50,
    "study_hours": 3.0,
    "physical_activity_hours": 1.5,
    "sleep_hours_per_night": 7.0,
    "stress_level": "Medium"
}
```

**Response:**
```json
{
    "predicted_mental_health_score": 7.5
}
```

### Input Field Specifications

| Field | Type | Range/Options | Required |
|-------|------|----------------|----------|
| `age` | integer | 10-30 | Yes |
| `gender` | string | "Male", "Female" | Yes |
| `country` | string | Any country name | Yes |
| `academic_level` | string | "High School", "Undergraduate", "Graduate" | Yes |
| `most_used_platform` | string | "Facebook", "Instagram", "WhatsApp", "YouTube", "TikTok", "Twitter", "LinkedIn", "Snapchat", "LINE", "WeChat", "KakaoTalk", "VKontakte" | Yes |
| `purpose_of_use` | string | "Education", "Entertainment", "Networking", "News" | Yes |
| `avg_daily_usage_hours` | float | 0-24 | Yes |
| `daily_unlocks` | integer | 0+ | Yes |
| `study_hours` | float | 0-24 | Yes |
| `physical_activity_hours` | float | 0-24 | Yes |
| `sleep_hours_per_night` | float | 0-24 | Yes |
| `stress_level` | string | "Low", "Medium", "High", "Very High" | Yes |

### Error Responses

**400 Bad Request**
```json
{
    "detail": "Value error, age -> ensure this value is between 10 and 30"
}
```

**500 Internal Server Error**
```json
{
    "detail": "Internal server error"
}
```

---

## 📊 Score Interpretation

The application provides scores on a **3-10 scale**, with detailed interpretations and recommendations:

### Score Levels

| Score Range | Level | Badge Color | Interpretation |
|------------|-------|-------------|-----------------|
| **9.0-10.0** | Excellent | Green (#22C55E) | Excellent mental health with healthy lifestyle habits |
| **7.5-8.9** | Good | Cyan (#06B6D4) | Good wellness with minor areas for improvement |
| **6.0-7.4** | Moderate | Orange (#F59E0B) | Moderate wellness requiring lifestyle adjustments |
| **4.5-5.9** | Needs Attention | Red (#EF4444) | Concerns that need addressing |
| **3.0-4.4** | High Risk | Dark Red (#991B1B) | Significant concerns requiring professional support |

### Sample Recommendations

**Excellent (9.0-10.0):**
> Keep maintaining healthy habits. Continue your current lifestyle patterns and remember to share these positive practices with others.

**Good (7.5-8.9):**
> Maintain a balance between online and offline life. Consider setting specific times for social media use and prioritize in-person interactions.

**Moderate (6.0-7.4):**
> Reduce screen time gradually. Increase physical activities, practice mindfulness, and ensure adequate sleep to boost your mental wellness.

**Needs Attention (4.5-5.9):**
> Increase physical activity and manage stress through exercise or meditation. Consider speaking with friends or mentors about your concerns.

**High Risk (3.0-4.4):**
> Please consider speaking with a mental health professional or counselor. Your wellbeing is important, and professional guidance can help significantly.

---

## 👥 User Guide

### Taking an Assessment

1. **Fill Out the Form**
   - Enter your age (10-30 years)
   - Select your gender
   - Specify your country
   - Choose your academic level
   - Select your most-used social media platform
   - Pick the primary purpose of your usage
   - Enter your daily social media hours
   - Provide daily phone unlocks count
   - Input study hours per day
   - Enter physical activity hours
   - Specify sleep hours per night
   - Rate your stress level

2. **Submit Assessment**
   - Click "Predict Score" button
   - Wait for the AI analysis (typically 1-2 seconds)
   - View results with animated score circle

3. **Review Results**
   - Check your mental health score (3-10 scale)
   - Read your interpretation and recommendations
   - Note the color-coded wellness level
   - Implement suggested lifestyle changes

4. **Take Another Assessment**
   - Click "Take Assessment Again" to reset
   - Form clears and returns to top
   - Scroll back to input section

### Best Practices

- ✅ Provide honest, accurate information
- ✅ Focus on typical daily patterns (not extreme days)
- ✅ Update assessment quarterly for progress tracking
- ✅ Take recommendations seriously
- ✅ Combine results with professional advice

---

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Opera | 76+ | ✅ Fully Supported |
| IE 11 | Any | ❌ Not Supported |

### Feature Compatibility
- CSS Grid ✅
- CSS Variables ✅
- Fetch API ✅
- SVG ✅
- ES6 Classes ✅

---

## 🚢 Deployment

### Deploy Backend

#### Using Heroku
```bash
# Install Heroku CLI
# Create Procfile in backend directory
echo "web: uvicorn main:app --host=0.0.0.0 --port=${PORT:-8000}" > Procfile

# Deploy
heroku create your-app-name
git push heroku main
```

#### Using Railway
1. Connect your GitHub repository
2. Select Python environment
3. Set environment variables
4. Deploy with one click

#### Using AWS/Azure/GCP
- Use container deployment (Docker)
- Configure auto-scaling
- Set up load balancing
- Enable HTTPS

### Deploy Frontend

#### Using Netlify
```bash
# Connect your Git repository
# Select frontend directory
# Configure build settings
# Deploy automatically on push
```

#### Using Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Using GitHub Pages
1. Create `.nojekyll` file in frontend directory
2. Push to `gh-pages` branch
3. Enable GitHub Pages in repository settings

### Environment Configuration

Update API endpoint in `script.js`:
```javascript
const API_BASE_URL = 'https://your-backend-url.com';
```

---

## 🤝 Contributing

### Getting Started
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Guidelines
- Follow PEP 8 for Python code
- Use meaningful variable names
- Add comments for complex logic
- Write unit tests for new features
- Update README.md for new features

### Reporting Issues
1. Check existing issues
2. Provide detailed description
3. Include steps to reproduce
4. Attach screenshots/logs
5. Specify environment details

---

## ⚠️ Disclaimer

**Important Legal Notice:**

This Mental Health Score Predictor is provided for **informational and educational purposes only**. The application:

- 🔴 **IS NOT** a substitute for professional medical advice
- 🔴 **IS NOT** a diagnostic tool for mental health conditions
- 🔴 **SHOULD NOT** replace consultation with mental health professionals
- 🔴 **DOES NOT** guarantee accurate predictions
- 🔴 **CANNOT** diagnose or treat any mental health condition

### When to Seek Professional Help

If you're experiencing:
- Persistent sadness or anxiety
- Thoughts of self-harm
- Sleep disturbances
- Loss of interest in activities
- Difficulty concentrating
- Significant mood changes

**Please consult a qualified mental health professional immediately.**

### Resources

- 🆘 National Suicide Prevention Lifeline: 988 (US)
- 🆘 Crisis Text Line: Text HOME to 741741
- 🆘 International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/
- 🏥 Seek local mental health services in your country

---

## 📄 License

This project is licensed under the **MIT License** - see below:

```
MIT License

Copyright (c) 2024 Mental Health Score Predictor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 📚 Additional Resources

### Documentation
- [FastAPI Official Docs](https://fastapi.tiangolo.com/)
- [Pydantic Documentation](https://docs.pydantic.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Python Official Docs](https://docs.python.org/3/)

### Mental Health Information
- [NIMH - National Institute of Mental Health](https://www.nimh.nih.gov/)
- [NAMI - National Alliance on Mental Illness](https://www.nami.org/)
- [Mind UK](https://www.mind.org.uk/)
- [Mental Health America](https://www.mhanational.org/)

### Similar Projects
- DASS-21 (Depression Anxiety Stress Scale)
- PHQ-9 (Patient Health Questionnaire)
- GAD-7 (Generalized Anxiety Disorder)
- WHO (5) Well-Being Index

---

## 📞 Support & Contact

### Getting Help

- 📧 Email: support@example.com
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions
- 📖 Wiki: Project Wiki

### Development

- **Last Updated:** January 2024
- **Version:** 1.0.0
- **Maintainer:** Development Team

---

## 🙏 Acknowledgments

- Built with ❤️ for mental health awareness
- Inspired by modern SaaS design principles
- Special thanks to the open-source community

---

## 📈 Roadmap

### Version 1.1 (Planned)
- [ ] User authentication & accounts
- [ ] Assessment history tracking
- [ ] Progress visualization charts
- [ ] Export assessment reports (PDF)

### Version 1.2 (Planned)
- [ ] Multi-language support
- [ ] Mobile native app (React Native)
- [ ] Integration with wearables
- [ ] Advanced analytics dashboard

### Version 2.0 (Future)
- [ ] Community features
- [ ] Social media integration
- [ ] Real-time mood tracking
- [ ] Personalized wellness plans

---

**Made with 💚 for mental health awareness**

---

*Last Updated: January 2024 | Version: 1.0.0*
