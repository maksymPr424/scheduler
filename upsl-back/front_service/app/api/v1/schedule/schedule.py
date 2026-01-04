from fastapi import APIRouter, Depends
import requests
from default_lib import ScheduleProps

router = APIRouter(
    tags=["Schedule"],
    prefix="/schedule"
)

@router.get('', summary="Get schedule")
def get_schedule(params: ScheduleProps = Depends()):
    return {"message": "This is the schedule endpoint."}