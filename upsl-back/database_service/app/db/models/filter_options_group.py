from sqlalchemy import Table, Column, ForeignKey
from app.db.base import Base

filter_option_groups = Table(
    "filter_option_groups",
    Base.metadata,
    Column(
        "filter_option_id",
        ForeignKey("filter_options.id"),
        primary_key=True,
    ),
    Column(
        "group_id",
        ForeignKey("groups.id"),
        primary_key=True,
    ),
)
