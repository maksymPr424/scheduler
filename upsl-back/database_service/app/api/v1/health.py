from fastapi import APIRouter
from datetime import date

router = APIRouter(
    tags=["Health"]
)

@router.get("/health")
def health_check():
    return {"status": "ok", "date": date.today()} # Include your route definitions here