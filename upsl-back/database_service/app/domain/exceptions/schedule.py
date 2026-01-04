from .base import DomainError

class ScheduleNotFound(DomainError):
    code: str = "schedule_not_found"
    message: str = "Sorry, we have not schedule for this direction and year yet."

class InvalidScheduleDate(DomainError):
    code = "invalid_schedule_date"
    message = "Provided date is outside of academic period"

class LessonsNotFound(DomainError):
    code: str = "lessons_not_found"
    message: str = "Sorry, we have not found any lessons for this day."