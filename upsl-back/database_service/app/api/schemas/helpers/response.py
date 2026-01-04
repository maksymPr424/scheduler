from pydantic import BaseModel
from default_lib import Direction, Year

class FilterOptionResponse(BaseModel):
    id: int
    name: str
    groups: list[str]

class FilterResponse(BaseModel):
    id: int
    name: str
    options: list[FilterOptionResponse]

class DirectionResponse(BaseModel):
    directions: list[Direction]
    years: list[Year]