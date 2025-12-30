from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.models.filter_options_group import filter_option_groups
from app.db.base import Base

class FilterOption(Base):
    __tablename__ = "filter_options"

    id = Column(Integer, primary_key=True)
    filter_group_id = Column(ForeignKey("group_filters.id"), nullable=False)
    name = Column(String, nullable=False)

    groups = relationship(
        "Group",
        secondary=filter_option_groups,
        backref="filter_options",
    )
