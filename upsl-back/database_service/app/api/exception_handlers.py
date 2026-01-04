from fastapi import Request
from fastapi.responses import JSONResponse
from app.domain.exceptions.base import DomainError
from app.domain.exceptions.schedule import ScheduleNotFound, InvalidScheduleDate, LessonsNotFound
from app.domain.exceptions.helpers import FiltersNotFound

DOMAIN_ERROR_STATUS = {
    ScheduleNotFound: 404,
    InvalidScheduleDate: 400,
    LessonsNotFound: 404,
    FiltersNotFound: 404,
}

def domain_error_handler(
    request: Request,
    exc: DomainError,
):
    status_code = DOMAIN_ERROR_STATUS.get(
        type(exc),
        400,
    )

    return JSONResponse(
        status_code=status_code,
        content={
            "error": exc.code,
            "message": exc.message,
        },
    )
