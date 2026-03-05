from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth, fitness
from .scheduler import start_scheduler
from .ai_coach import AICoach
from .workouts import get_workout_plan
from .middleware import RateLimitMiddleware
from sqlalchemy.orm import Session
from .database import get_db, engine
from . import models
import os

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="ComradeFit AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(RateLimitMiddleware, limit=5, window=60)

@app.on_event("startup")
async def startup_event():
    if os.getenv("RUN_SCHEDULER", "true") == "true":
        start_scheduler()

app.include_router(auth.router)
app.include_router(fitness.router)

@app.get("/coach/advice/{user_id}")
def get_ai_advice(user_id: int, q: str = None, db: Session = Depends(get_db)):
    coach = AICoach(db, user_id)
    return {"advice": coach.get_advice(q)}

@app.get("/workouts/plan/{user_id}")
def get_user_workout_plan(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    goal = user.fitness_goal if user else "general"
    return {"plan": get_workout_plan(goal)}

@app.get("/")
async def root():
    return {"message": "Welcome to ComradeFit AI API"}
