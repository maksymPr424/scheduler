from fastapi import FastAPI
from .api.router import router as api_router
from app.api.exception_handlers import domain_error_handler
from app.domain.exceptions.base import DomainError

app = FastAPI(
    title="Database Service",
    description="Service for managing and querying the database of the UPSL application",
    version="1.0.0"
)

app.add_exception_handler(
    DomainError,
    domain_error_handler,
)


app.include_router(api_router)  # Include your routers here