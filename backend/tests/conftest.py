import pytest
from app.core.database import SessionLocal, Base, engine, create_all_tables

@pytest.fixture(scope="session")
def db_session():
    # Setup: Create tables
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        # Teardown: Clean up if needed, though for local sqlite it might not be necessary
