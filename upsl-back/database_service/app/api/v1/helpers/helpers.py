from fastapi import APIRouter, Depends
from default_lib import  Direction, Year, FilterProps
from app.api.deps import get_db
from app.services.filters_schedule_builder import filters_schedule_builder
from app.api.schemas.errors import ErrorResponse
from app.api.schemas.helpers.response import FilterResponse, DirectionResponse

helpers_router = APIRouter(
    tags=["Helpers"],
    prefix="/helpers"
)

@helpers_router.get('/directions_years', summary="Get available directions and years", response_model=DirectionResponse)
def get_directions_and_years():
    return {
        "directions": [direction.value for direction in Direction],
        "years": [year.value for year in Year]
    }

@helpers_router.get('/filters', summary="Get schedule params",response_model=list[FilterResponse], responses={
    404: {
            "model": ErrorResponse,
            "description": "Invalid schedule parameters",
        },
    }
    )
def get_schedule_filters(params: FilterProps = Depends(),
                         db = Depends(get_db)):
    return filters_schedule_builder(direction=params.direction, year=params.year, db=db)