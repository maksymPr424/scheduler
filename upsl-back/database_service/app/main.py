from datetime import date
from db.session import SessionLocal
from services.schedule_builder import build_schedule

db = SessionLocal()

schedule = build_schedule(date.today(), db)

for lesson in schedule:
    print(lesson)

db.close()
