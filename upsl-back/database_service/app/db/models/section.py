from sqlalchemy import Column, Integer, String
from db.base import Base

class Section(Base):
    __tablename__ = "sections"

    id = Column(Integer, primary_key=True)
    direction = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
