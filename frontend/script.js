// ============================================
// Configuration
// ============================================

const API_BASE_URL = 'http://127.0.0.1:8000';
const API_ENDPOINT = `${API_BASE_URL}/predict`;

// Score interpretation thresholds and details (scale: 3-10)
const SCORE_INTERPRETATIONS = {
    excellent: {
        range: [9, 10],
        title: 'Excellent Mental Health',
        text: 'Your mental health score indicates excellent overall wellness. You are managing stress effectively and maintaining a healthy balance.',
        color: '#22C55E',
        recommendation: 'Keep maintaining healthy habits. Continue your current lifestyle patterns and remember to share these positive practices with others.'
    },
    good: {
        range: [7.5, 8.9],
        title: 'Good Mental Health',
        text: 'Your mental health score suggests good overall wellness with room for minor improvements. You are generally managing well.',
        color: '#06B6D4',
        recommendation: 'Maintain a balance between online and offline life. Consider setting specific times for social media use and prioritize in-person interactions.'
    },
    moderate: {
        range: [6, 7.4],
        title: 'Moderate Mental Health',
        text: 'Your mental health score indicates moderate wellness. Some attention to lifestyle factors could improve your wellbeing.',
        color: '#F59E0B',
        recommendation: 'Reduce screen time gradually. Increase physical activities, practice mindfulness, and ensure adequate sleep to boost your mental wellness.'
    },
    needsAttention: {
        range: [4.5, 5.9],
        title: 'Needs Attention',
        text: 'Your mental health score suggests you should pay more attention to your wellbeing. Consider making positive lifestyle changes.',
        color: '#EF4444',
        recommendation: 'Increase physical activity and manage stress through exercise or meditation. Consider speaking with friends or mentors about your concerns.'
    },
    highRisk: {
        range: [3, 4.4],
        title: 'High Risk',
        text: 'Your mental health score indicates significant concerns. It is important to seek professional support.',
        color: '#991B1B',
        recommendation: 'Please consider speaking with a mental health professional or counselor. Your wellbeing is important, and professional guidance can help significantly.'
    }
};

// ============================================
// DOM Elements
// ============================================

const form = document.getElementById('predictionForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const spinner = document.getElementById('spinner');
const errorMessage = document.getElementById('errorMessage');
const formSection = document.getElementById('formSection');
const resultsSection = document.getElementById('resultsSection');

// ============================================
// Event Listeners
// ============================================

form.addEventListener('submit', handleFormSubmit);

// ============================================
// Main Functions
// ============================================

/**
 * Handle form submission
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Clear previous error
    hideError();
    
    // Disable submit button and show spinner
    showLoading();
    
    try {
        // Collect form data
        const formData = collectFormData();
        
        // Validate form data
        validateFormData(formData);
        
        // Send API request
        const response = await fetchPrediction(formData);
        
        // Handle successful response
        displayResults(response.predicted_mental_health_score);
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
    } catch (error) {
        console.error('Error:', error);
        showError(error.message);
    } finally {
        // Re-enable button
        hideLoading();
    }
}

/**
 * Collect form data from all inputs
 */
function collectFormData() {
    return {
        age: parseInt(document.getElementById('age').value),
        gender: document.getElementById('gender').value,
        country: document.getElementById('country').value,
        academic_level: document.getElementById('academicLevel').value,
        most_used_platform: document.getElementById('platform').value,
        purpose_of_use: document.getElementById('purpose').value,
        avg_daily_usage_hours: parseFloat(document.getElementById('avgUsage').value),
        daily_unlocks: parseInt(document.getElementById('unlocks').value),
        study_hours: parseFloat(document.getElementById('studyHours').value),
        physical_activity_hours: parseFloat(document.getElementById('activity').value),
        sleep_hours_per_night: parseFloat(document.getElementById('sleep').value),
        stress_level: document.getElementById('stress').value
    };
}

/**
 * Validate form data
 */
function validateFormData(data) {
    // Check for empty values
    for (const [key, value] of Object.entries(data)) {
        if (value === '' || value === null) {
            throw new Error(`Please fill in all fields. ${key} is missing.`);
        }
    }
    
    // Validate age range
    if (data.age < 10 || data.age > 30) {
        throw new Error('Age must be between 10 and 30.');
    }
    
    // Validate time ranges
    if (data.avg_daily_usage_hours < 0 || data.avg_daily_usage_hours > 24) {
        throw new Error('Daily usage hours must be between 0 and 24.');
    }
    if (data.study_hours < 0 || data.study_hours > 24) {
        throw new Error('Study hours must be between 0 and 24.');
    }
    if (data.physical_activity_hours < 0 || data.physical_activity_hours > 24) {
        throw new Error('Physical activity hours must be between 0 and 24.');
    }
    if (data.sleep_hours_per_night < 0 || data.sleep_hours_per_night > 24) {
        throw new Error('Sleep hours must be between 0 and 24.');
    }
}

/**
 * Fetch prediction from API
 */
async function fetchPrediction(formData) {
    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.detail || `API Error: ${response.status}`;
        throw new Error(errorMessage);
    }
    
    return await response.json();
}

/**
 * Display results with animations
 */
function displayResults(score) {
    // Hide form, show results
    formSection.style.display = 'none';
    resultsSection.style.display = 'block';
    
    // Update score display
    updateScoreDisplay(score);
    
    // Animate circle
    animateCircle(score);
    
    // Update interpretation
    updateInterpretation(score);
    
    // Update recommendations
    updateRecommendations(score);
}

/**
 * Update score number display (3-10 scale)
 */
function updateScoreDisplay(score) {
    const scoreElement = document.getElementById('scoreNumber');
    
    // Animate number from 3 to score
    const duration = 1000; // 1 second
    const start = 3;
    const increment = (score - start) / (duration / 16); // Update every 16ms (~60fps)
    let current = start;
    
    const numberInterval = setInterval(() => {
        current += increment;
        if (current >= score) {
            current = score;
            clearInterval(numberInterval);
        }
        scoreElement.textContent = current.toFixed(1);
    }, 16);
}

/**
 * Animate the circular progress indicator (3-10 scale)
 */
function animateCircle(score) {
    const circle = document.getElementById('progressCircle');
    const circumference = 2 * Math.PI * 90; // radius = 90
    
    // Convert score from 3-10 range to 0-100 percentage
    const percentage = ((score - 3) / 7) * 100;
    
    // Calculate stroke offset based on percentage
    const offset = circumference - (percentage / 100) * circumference;
    
    // Animate from full to final offset
    circle.style.animation = `none`;
    circle.offsetHeight; // Trigger reflow
    circle.style.animation = `fillCircle 1.5s ease-out forwards`;
    circle.style.strokeDashoffset = offset;
}

/**
 * Get interpretation based on score
 */
function getInterpretation(score) {
    for (const [key, data] of Object.entries(SCORE_INTERPRETATIONS)) {
        const [min, max] = data.range;
        if (score >= min && score <= max) {
            return data;
        }
    }
    return SCORE_INTERPRETATIONS.highRisk;
}

/**
 * Update interpretation card
 */
function updateInterpretation(score) {
    const interpretation = getInterpretation(score);
    
    const badge = document.getElementById('interpretationBadge');
    const title = document.getElementById('interpretationTitle');
    const text = document.getElementById('interpretationText');
    
    badge.style.backgroundColor = interpretation.color;
    title.textContent = interpretation.title;
    text.textContent = interpretation.text;
}

/**
 * Update recommendations based on score
 */
function updateRecommendations(score) {
    const interpretation = getInterpretation(score);
    const recommendationsContent = document.getElementById('recommendationsContent');
    
    recommendationsContent.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 12px;">
            <div style="
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: ${interpretation.color};
                flex-shrink: 0;
                margin-top: 2px;
            "></div>
            <p>${interpretation.recommendation}</p>
        </div>
    `;
}

/**
 * Show loading state
 */
function showLoading() {
    submitBtn.disabled = true;
    spinner.style.display = 'block';
    btnText.textContent = 'Analyzing';
    btnText.style.display = 'inline';
}

/**
 * Hide loading state
 */
function hideLoading() {
    submitBtn.disabled = false;
    spinner.style.display = 'none';
    btnText.textContent = 'Predict Score';
    btnText.style.display = 'inline';
}

/**
 * Show error message
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    
    // Auto-hide after 10 seconds
    setTimeout(hideError, 10000);
}

/**
 * Hide error message
 */
function hideError() {
    errorMessage.style.display = 'none';
}

/**
 * Reset form and return to input
 */
function resetForm() {
    // Reset form fields
    form.reset();
    
    // Clear error
    hideError();
    
    // Show form, hide results
    formSection.style.display = 'block';
    resultsSection.style.display = 'none';
    
    // Reset score display
    document.getElementById('scoreNumber').textContent = '3.0';
    
    // Reset circle
    const circle = document.getElementById('progressCircle');
    circle.style.animation = 'none';
    circle.offsetHeight; // Trigger reflow
    const circumference = 2 * Math.PI * 90;
    circle.style.strokeDashoffset = circumference.toString();
    
    // Scroll to top
    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Set initial circle state
    const circle = document.getElementById('progressCircle');
    const circumference = 2 * Math.PI * 90;
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;
    
    // Set initial score display
    document.getElementById('scoreNumber').textContent = '3.0';
});
