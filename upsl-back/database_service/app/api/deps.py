from app.db.session import SessionLocal

def get_db():
    db = SessionLocal()
    print("DB OPEN")
    try:
        yield db
    finally:
        print("DB CLOSE")
        db.close()
