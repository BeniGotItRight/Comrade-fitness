from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models
from datetime import datetime

router = APIRouter(prefix="/fitness", tags=["fitness"])

@router.post("/weight")
def log_weight(user_id: int, weight: float, db: Session = Depends(get_db)):
    new_log = models.WeightLog(user_id=user_id, weight=weight)
    db.add(new_log)
    db.commit()
    db.refresh(new_log)
    # Update user's current weight
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user:
        user.weight = weight
        db.commit()
    return new_log

@router.get("/weight/{user_id}")
def get_weight_history(user_id: int, db: Session = Depends(get_db)):
    return db.query(models.WeightLog).filter(models.WeightLog.user_id == user_id).order_by(models.WeightLog.date.desc()).all()

@router.post("/meal")
def log_meal(user_id: int, meal_data: dict, db: Session = Depends(get_db)):
    new_meal = models.MealLog(
        user_id=user_id,
        meal_type=meal_data["meal_type"],
        food_name=meal_data["food_name"],
        calories=meal_data["calories"],
        protein=meal_data["protein"],
        carbs=meal_data["carbs"],
        fats=meal_data["fats"]
    )
    db.add(new_meal)
    db.commit()
    db.refresh(new_meal)
    return new_meal

@router.post("/water")
def log_water(user_id: int, glasses: int, db: Session = Depends(get_db)):
    today = datetime.utcnow().date()
    existing_log = db.query(models.WaterLog).filter(
        models.WaterLog.user_id == user_id,
        models.WaterLog.date == today
    ).first()
    
    if existing_log:
        existing_log.glasses += glasses
    else:
        existing_log = models.WaterLog(user_id=user_id, glasses=glasses)
        db.add(existing_log)
    
    db.commit()
    db.refresh(existing_log)
    return existing_log

@router.post("/activity")
def log_activity(user_id: int, activity_data: dict, db: Session = Depends(get_db)):
    new_activity = models.ActivityLog(
        user_id=user_id,
        activity_type=activity_data["activity_type"],
        duration=activity_data["duration"],
        calories_burned=activity_data["calories_burned"],
        steps=activity_data.get("steps", 0)
    )
    db.add(new_activity)
    db.commit()
    db.refresh(new_activity)
    return new_activity
