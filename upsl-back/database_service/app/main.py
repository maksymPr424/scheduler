from fastapi import FastAPI
from .api.router import router as api_router
from app.api.exception_handlers import domain_error_handler
from app.domain.exceptions.base import DomainError
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Database Service",
    description="Service for managing and querying the database of the UPSL application",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "0.0.0.0",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(
    DomainError,
    domain_error_handler,
)


app.include_router(api_router)  # Include your routers here