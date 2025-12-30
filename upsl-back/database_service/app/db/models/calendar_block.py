from sqlalchemy import Column, Integer, String, Date, ForeignKey
from app.db.base import Base

class CalendarBlock(Base):
    __tablename__ = "calendar_blocks"

    id = Column(Integer, primary_key=True)
    section_id = Column(ForeignKey("sections.id"), nullable=True)
    date_from = Column(Date, nullable=False)
    date_to = Column(Date, nullable=False)
    type = Column(String)    # holidays, exam_session
    reason = Column(String)
