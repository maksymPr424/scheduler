from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey
from app.db.base import Base

class Override(Base):
    __tablename__ = "overrides"

    id = Column(Integer, primary_key=True)
    section_id = Column(ForeignKey("sections.id"), nullable=True)

    date = Column(Date, nullable=False)
    action = Column(String(10), nullable=False) 

    lesson_id = Column(
        Integer,
        ForeignKey("lessons.id", ondelete="CASCADE"),
        nullable=True
    )

    new_time_start = Column(Time)
    new_time_end = Column(Time)
    new_auditory = Column(String)
    new_teacher = Column(String)
