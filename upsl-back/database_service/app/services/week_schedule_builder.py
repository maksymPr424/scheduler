from app.domain.enums import Direction, Year
from datetime import date
from app.services.utils import get_day_name, get_week_dates
from app.db.models.section import Section
from app.services.day_schedule_builder import build_schedule_day
from app.domain.constants import DAY_BY_ID

def build_schedule_week(d: date, direction: Direction, year: Year, db):

    week_dates = get_week_dates(d)


    section = db.query(Section.id).filter(
    Section.direction == direction.value,
    Section.year == int(year)).first()

    if not section:
        return {"message": "Sorry, we have not schedule for this direction and year yet."}
    
    result = []

    for day_date in week_dates:
        day_id = get_day_name(day_date)

        lessons = build_schedule_day(
            day=day_id,
            date=day_date,
            section_id=section.id,
            db=db
        )

        result.append({
            "day": DAY_BY_ID[int(day_id)],
            "date": day_date,
            "lessons": lessons
        })

    return result
