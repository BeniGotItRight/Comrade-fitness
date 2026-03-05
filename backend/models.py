from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, Date
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    age = Column(Integer)
    gender = Column(String)
    height = Column(Float)  # in cm
    weight = Column(Float)  # current weight in kg
    target_weight = Column(Float)
    activity_level = Column(String)
    fitness_goal = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class WeightLog(Base):
    __tablename__ = "weight_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    weight = Column(Float)
    date = Column(Date, default=datetime.utcnow().date())
    user = relationship("User")

class MealLog(Base):
    __tablename__ = "meal_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    meal_type = Column(String) # Breakfast, Lunch, Dinner, Snack
    food_name = Column(String)
    calories = Column(Float)
    protein = Column(Float)
    carbs = Column(Float)
    fats = Column(Float)
    date = Column(Date, default=datetime.utcnow().date())
    user = relationship("User")

class ActivityLog(Base):
    __tablename__ = "activity_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    activity_type = Column(String) # Walking, Running, Gym, etc.
    duration = Column(Integer) # in minutes
    calories_burned = Column(Float)
    steps = Column(Integer, default=0)
    date = Column(Date, default=datetime.utcnow().date())
    user = relationship("User")

class WaterLog(Base):
    __tablename__ = "water_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    glasses = Column(Integer)
    date = Column(Date, default=datetime.utcnow().date())
    user = relationship("User")

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    reminder_time = Column(String) # HH:MM
    is_completed = Column(Boolean, default=False)
    date = Column(Date, default=datetime.utcnow().date())
    user = relationship("User")
