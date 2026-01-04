from fastapi import APIRouter, Depends
from app.api.deps import get_db
from app.services.week_schedule_builder import build_schedule_week
from default_lib import ScheduleProps
from app.api.schemas.schedules.response import ScheduleResponse
from app.api.schemas.errors import ErrorResponse
router = APIRouter(
    tags=["Schedule"],
    prefix="/schedule"
)

@router.get('/week', summary="Get week schedule",
             response_model=list[ScheduleResponse],
             responses={
                 404:{
                        "model": ErrorResponse,
                        "description": "Schedule not found for the given parameters",
                 }
             }
             )
def get_week_schedule(params: ScheduleProps = Depends(), 
                      db = Depends(get_db)):

    schedule = build_schedule_week(params.date, direction=params.section_name, year=params.year, db=db)

    return schedule