from fastapi import APIRouter
from .health import router as health_router
from .schedules.schedule import router as schedule_router
from.helpers.helpers import helpers_router

router_v1 = APIRouter(prefix="/v1")

router_v1.include_router(health_router)
router_v1.include_router(schedule_router)
router_v1.include_router(helpers_router)