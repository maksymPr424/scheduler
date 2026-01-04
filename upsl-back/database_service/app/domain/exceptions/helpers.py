from .base import DomainError

class FiltersNotFound(DomainError):
    code: str = "filters_not_found"
    message: str = "No filters found for the given query."