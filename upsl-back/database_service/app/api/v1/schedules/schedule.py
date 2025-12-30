from fastapi import APIRouter, Depends
from .props import FilterProps, ScheduleProps
from app.api.deps import get_db
from app.services.week_schedule_builder import build_schedule_week
from app.domain.enums import Direction, Year
from app.services.filters_schedule_builder import filters_schedule_builder

router = APIRouter(
    tags=["Schedule"],
    prefix="/schedule"
)

@router.get('/week', summary="Get week schedule")
def get_week_schedule(params: ScheduleProps = Depends(), 
                      db = Depends(get_db)):

    schedule = build_schedule_week(params.date, direction=params.section_name, year=params.year, db=db)

    return schedule


@router.get('/directions_years', summary="Get available directions and years")
def get_directions_and_years():
    return {
        "directions": [direction.value for direction in Direction],
        "years": [year.value for year in Year]
    }

@router.get('/filters', summary="Get schedule params")
def get_schedule_filters(params: FilterProps = Depends(),
                         db = Depends(get_db)):
    return filters_schedule_builder(direction=params.direction, year=params.year, db=db)