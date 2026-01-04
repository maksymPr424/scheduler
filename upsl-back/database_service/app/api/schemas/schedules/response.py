from pydantic import BaseModel
from default_lib import Direction, Year, DayOfWeek
from datetime import date

class LessonResponse(BaseModel):
    subject: str
    start: str
    end: str
    lesson_type: str
    teacher: str
    auditory: str
    groups: list[str]

class ScheduleResponse(BaseModel):
    day: str
    date: date
    lessons: list[LessonResponse]

