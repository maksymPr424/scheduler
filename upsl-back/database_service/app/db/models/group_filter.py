from sqlalchemy import Column, Integer, String, ForeignKey
from app.db.base import Base

class GroupFilter(Base):
    __tablename__ = "group_filters"

    id = Column(Integer, primary_key=True)
    section_id = Column(ForeignKey("sections.id"), nullable=False)
    year_id = Column(Integer, nullable=False)
    name = Column(String, nullable=False)