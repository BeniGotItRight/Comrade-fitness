from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Support both SQLite (local) and PostgreSQL (production/Supabase/Vercel)
# Checks multiple common environment variable names for compatibility
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL") or \
                           os.getenv("SUPABASE_POSTGRES_URL") or \
                           os.getenv("SUPABASE_DATABASE_URL") or \
                           os.getenv("POSTGRES_URL") or \
                           "sqlite:///./comradefit.db"

# Security Fix: For PostgreSQL, ensure we use a connection pool
if SQLALCHEMY_DATABASE_URL.startswith("postgresql"):
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, 
        pool_size=10, 
        max_overflow=20,
        pool_pre_ping=True
    )
else:
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
