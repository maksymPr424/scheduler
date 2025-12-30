from enum import Enum, IntEnum

class Direction(str, Enum):
    INFORMATICS = "informatics"
    CYBERSECURITY = "cybersecurity"

class Year(IntEnum):
    FIRST = 1
    SECOND = 2
    THIRD = 3
    FOURTH = 4

class DayOfWeek(IntEnum):
    MONDAY = 0
    TUESDAY = 1
    WEDNESDAY = 2
    THURSDAY = 3
    FRIDAY = 4
    SATURDAY = 5
    SUNDAY = 6

class OverrideAction(str, Enum):
    ADD = "add"
    UPDATE = "update"
    REMOVE = "remove"

