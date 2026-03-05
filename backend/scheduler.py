from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime

def send_notification(user_id: int, message: str):
    # In a real app, this would send a push notification or email
    print(f"NOTIFICATION for User {user_id}: {message} at {datetime.now()}")

scheduler = BackgroundScheduler()

def start_scheduler():
    # Morning reminder (7 AM)
    scheduler.add_job(
        lambda: print("Triggered Morning Reminder"), 
        'cron', hour=7, minute=0
    )
    # Afternoon reminder (1 PM)
    scheduler.add_job(
        lambda: print("Triggered Afternoon Reminder"), 
        'cron', hour=13, minute=0
    )
    # Evening reminder (7 PM)
    scheduler.add_job(
        lambda: print("Triggered Evening Reminder"), 
        'cron', hour=19, minute=0
    )
    scheduler.start()
