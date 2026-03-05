from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from . import models
from .routes.auth import get_password_hash
import os

def seed_default_user():
    # Ensure tables are created
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        admin_email = os.getenv("ADMIN_EMAIL", "benson@comradefit.ai")
        admin_password = os.getenv("ADMIN_PASSWORD", "benson2007")
        
        existing_user = db.query(models.User).filter(models.User.email == admin_email).first()
        if not existing_user:
            print(f"Seeding default user: {admin_email}")
            hashed_password = get_password_hash(admin_password)
            default_user = models.User(
                email=admin_email,
                hashed_password=hashed_password,
                full_name="Benson Motari",
                age=19,
                gender="Male",
                height=175.0,
                weight=70.0,
                target_weight=68.0,
                activity_level="Active",
                fitness_goal="Six Pack Abs",
                is_active=True
            )
            db.add(default_user)
            db.commit()
            print("Default user seeded successfully.")
        else:
            print("Default user already exists.")
    except Exception as e:
        print(f"Error seeding user: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_default_user()
