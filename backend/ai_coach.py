import openai
import os
from . import models
from sqlalchemy.orm import Session

openai.api_key = os.getenv("OPENAI_API_KEY", "your-api-key")

class AICoach:
    def __init__(self, db: Session, user_id: int):
        self.db = db
        self.user_id = user_id
        self.user = db.query(models.User).filter(models.User.id == user_id).first()

    def get_progress_summary(self):
        # Fetch recent logs to provide context to the AI
        weight_logs = self.db.query(models.WeightLog).filter(models.WeightLog.user_id == self.user_id).order_by(models.WeightLog.date.desc()).limit(5).all()
        activity_logs = self.db.query(models.ActivityLog).filter(models.ActivityLog.user_id == self.user_id).order_by(models.ActivityLog.date.desc()).limit(5).all()
        meal_logs = self.db.query(models.MealLog).filter(models.MealLog.user_id == self.user_id).order_by(models.MealLog.date.desc()).limit(5).all()
        
        summary = f"User: {self.user.full_name}, Age: {self.user.age}, Weight: {self.user.weight}kg, Goal: {self.user.fitness_goal}\n"
        summary += "Recent Weight Logs: " + ", ".join([f"{log.weight}kg on {log.date}" for log in weight_logs]) + "\n"
        summary += "Recent Activities: " + ", ".join([f"{log.activity_type} ({log.calories_burned} kcal)" for log in activity_logs]) + "\n"
        return summary

    def get_advice(self, user_question: str = None):
        context = self.get_progress_summary()
        prompt = f"System: You are ComradeFit AI, a professional fitness coach for a student/young professional.\n"
        prompt += f"Context: {context}\n"
        if user_question:
            prompt += f"User Choice/Question: {user_question}\n"
        else:
            prompt += "Provide a daily motivational tip, advice on their diet or workout based on their progress."

        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}]
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"I'm here to help! Let's stay focused on your goal to {self.user.fitness_goal}. Keep up the great work!"
