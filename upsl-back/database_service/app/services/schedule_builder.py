from datetime import date
from db.models.lesson import Lesson
from db.models.override import Override
from services.utils import get_week_type, get_day_name


def build_schedule(d: date, db):
    day_name = get_day_name(d)

    lessons = db.query(Lesson).filter(
        Lesson.day_of_week == day_name
    ).all()

    lessons_by_id = {lesson.id: lesson for lesson in lessons}

    overrides = db.query(Override).filter(
        Override.date == d
    ).all()

    for o in overrides:
        if o.action == "remove" and o.lesson_id:
            lessons_by_id.pop(o.lesson_id, None)

        elif o.action == "update" and o.lesson_id:
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

        elif o.action == "add":
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

    result.sort(key=lambda x: x.time_start if hasattr(x, "time_start") else x["time_start"])

    return result
