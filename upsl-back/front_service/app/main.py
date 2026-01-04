from fastapi import FastAPI

app = FastAPI(
    title="Front connection service",
    description="Service for connecting front-end with database service",
    version="1.0.0"
)

app.include_router()  # Include your routers here