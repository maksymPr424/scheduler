from app.domain.enums import Year, Direction
from app.db.models.group_filter import GroupFilter
from app.db.models.filter_options import FilterOption
from app.db.models.filter_options_group import filter_option_groups
from app.db.models.group import Group
from app.db.models.section import Section
from app.domain.exceptions.helpers import FiltersNotFound

def filters_schedule_builder(year: Year, direction: Direction, db):
    section = db.query(Section.id).filter(
        Section.direction == direction.value,
        Section.year == int(year)).first()
    
    if not section:
        raise FiltersNotFound()
    
    filters = db.query(GroupFilter).filter(
        GroupFilter.section_id == section.id,
        GroupFilter.year_id == int(year)
    ).all()

    result = []

    for filter in filters:
        options = db.query(FilterOption).filter(
            FilterOption.filter_group_id == filter.id
        ).all()

        result.append({
            "id": filter.id,
            "name": filter.name,
            "options": [
                {
                    "id": opt.id,
                    "name": opt.name,
                    "groups": [g.code for g in opt.groups],
                }
                for opt in options
            ],
        })

    return result