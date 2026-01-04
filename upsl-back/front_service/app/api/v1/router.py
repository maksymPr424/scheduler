from fastapi import APIRouter

router_v1 = APIRouter(
    prefix="/v1",
    tags=["v1"]
)

router_v1.include_router()  # Include your API v1 endpoints here