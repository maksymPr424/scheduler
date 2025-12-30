from datetime import date
from app.db.models.lesson import Lesson
from app.db.models.override import Override
from app.db.models.calendar_block import CalendarBlock
from app.domain.enums import DayOfWeek, OverrideAction

def build_schedule_day(day: DayOfWeek, date: date, section_id: int, db):    

    lessons = db.query(Lesson).filter(
        Lesson.day_of_week == int(day),
        Lesson.section_id == section_id
    ).all()
    
    lessons_by_id = {lesson.id: lesson for lesson in lessons}

    if not lessons:
        return ["Sorry, we have not found any lessons for this day."]

    
    calendar_blocks = (db.query(CalendarBlock).filter(
        CalendarBlock.section_id == section_id,
        CalendarBlock.date_from <= date,
        CalendarBlock.date_to >= date
    ).all())

    if calendar_blocks:
        return []
    
    overrides = db.query(Override).filter(
        Override.date == date
    ).all()

    for o in overrides:
        if o.action == OverrideAction.REMOVE and o.lesson_id:
            lessons_by_id.pop(o.lesson_id, None)

        elif o.action == OverrideAction.UPDATE and o.lesson_id:
            lesson = lessons_by_id.get(o.lesson_id)
            if not lesson:
                continue

            if o.new_time_start:
                lesson.time_start = o.new_time_start
            if o.new_time_end:
                lesson.time_end = o.new_time_end
            if o.new_room:
                lesson.room = o.new_room
            if o.new_teacher:
                lesson.teacher = o.new_teacher

        elif o.action == OverrideAction.ADD:
            lessons_by_id[o.id] = o  

    result = []
    for item in lessons_by_id.values():
        if isinstance(item, Lesson):
            result.append(item)
        else:
            result.append({
                "time_start": item.new_time_start,
                "time_end": item.new_time_end,
                "room": item.new_room,
                "teacher": item.new_teacher,
            })

    return [
        {
            "subject": l.subject,
            "start": l.time_start.strftime("%H:%M"),
            "end": l.time_end.strftime("%H:%M"),
            "teacher": l.teacher,
            "auditory": l.auditory,
            "groups": l.groups,
        }
        for l in result
    ]
