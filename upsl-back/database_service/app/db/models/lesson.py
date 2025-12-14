from sqlalchemy import Column, Integer, String, Time, ForeignKey
from db.base import Base

class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True)
    section_id = Column(ForeignKey("sections.id"), nullable=False)

    day_of_week = Column(Integer, nullable=False) #0-6

    time_start = Column(Time, nullable=False)
    time_end = Column(Time, nullable=False)

    subject = Column(String, nullable=False)
    lesson_type = Column(String, nullable=False)
    teacher = Column(String, nullable=False)
    auditory = Column(String, nullable=False)
    groups = Column(String, nullable=False)
