import joblib
from fastapi import FastAPI
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
from backend.models import PredictionResponse, StudentData

model = joblib.load('backend/prediction_model.pkl')

# app setup
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# API endpoints
@app.get('/')
def greet():
    return {'message':"Mental Health Score Predictor API"}

top_countries = ['Other','India','USA','Canada','Australia','UK','Germany','Mexico','Turkey','France']

@app.post('/predict', response_model = PredictionResponse)
def predict(data: StudentData):

    country_group = data.country if data.country in top_countries else "Other"

    input_row = pd.DataFrame([{
        'Age'                       :data.age,
        'Gender'                    :data.gender,
        'Country'                   :data.country,
        'Academic_Level'            :data.academic_level,
        'Most_Used_Platform'        :data.most_used_platform,
        'Purpose_Of_Use'            :data.purpose_of_use,
        'Avg_Daily_Usage_Hours'     :data.avg_daily_usage_hours,
        'Daily_Unlocks'             :data.daily_unlocks,
        'Study_Hours'               :data.study_hours,
        'Physical_Activity_Hours'   :data.physical_activity_hours,
        'Sleep_Hours_Per_Night'     :data.sleep_hours_per_night,
        'Stress_Level'              :data.stress_level,
        'Grouped_country'           :country_group
   }])

    prediction = model.predict(input_row)[0]

    return PredictionResponse(predicted_mental_health_score = round(float(prediction),2))


