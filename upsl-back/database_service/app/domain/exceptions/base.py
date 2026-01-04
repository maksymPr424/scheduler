
class DomainError(Exception):
    code: str = "domain_error"
    message: str = "Domain error occurred"

    def __init__(self, message: str | None = None):
        if message:
            self.message = message
        super().__init__(self.message)
