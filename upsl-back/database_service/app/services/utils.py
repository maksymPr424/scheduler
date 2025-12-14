from datetime import date

def get_week_type(d: date) -> str:
    """
    ISO week:
    even  -> lower
    odd   -> upper
    """
    week_number = d.isocalendar().week
    return "upper" if week_number % 2 == 1 else "lower"


def get_day_name(d: date) -> str:
    return d.strftime("%A")  
