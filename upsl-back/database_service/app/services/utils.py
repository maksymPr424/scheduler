from datetime import date, timedelta
from app.domain.enums import DayOfWeek

def get_week_type(d: date) -> str:
    """
    ISO week:
    even  -> lower
    odd   -> upper
    """
    week_number = d.isocalendar().week
    return "upper" if week_number % 2 == 1 else "lower"

def get_day_name(d: date) -> str:
    return DayOfWeek[(d.strftime("%A")).upper()]

def get_week_dates(d: date):
    current_day = int(get_day_name(d))

    monday = d - timedelta(days=current_day)

    return [monday + timedelta(days=i) for i in range(5)]
