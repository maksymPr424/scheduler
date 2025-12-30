from pydantic import BaseModel
from datetime import date
from app.domain.enums import Direction, Year

class ScheduleProps(BaseModel):
    section_name: Direction
    year: Year
    date: date

class FilterProps(BaseModel):
    direction: Direction
    year: Year