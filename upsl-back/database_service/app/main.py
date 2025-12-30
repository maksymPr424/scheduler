# from datetime import date
# from db.session import SessionLocal
# from services.week_schedule_builder import build_schedule_week
# from domain.enums import Direction, Year

# db = SessionLocal()

# schedule = build_schedule_week(date.today(), direction=Direction.INFORMATICS, year=Year.THIRD, db=db)

# print(schedule)

# db.close()


# app/main.py
from fastapi import FastAPI, Depends
from .api.router import router as api_router

app = FastAPI(
    title="Database Service",
    description="Service for managing the database of the UPSL application",
    version="1.0.0"
)

app.include_router(api_router)  # Include your routers here