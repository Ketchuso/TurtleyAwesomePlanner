#!/usr/bin/env python3

# Standard library imports
from random import choice as rc
from datetime import datetime, time

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Event, Calendar_Event
from werkzeug.security import generate_password_hash

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Clear existing data
        db.session.query(Calendar_Event).delete()
        db.session.query(Event).delete()
        db.session.query(User).delete()
        db.session.commit()

        # Seed 1 random user
        users = []
        for _ in range(1):  # Seed one random user
            user = User(username=fake.user_name())
            user.password_hash = "test123"  # This will automatically hash the password using the setter
            db.session.add(user)
            users.append(user)

        # Seed the second user with username "Yeji" and password "0101"
        yeji_user = User(username="Yeji")
        yeji_user.password_hash = "0101"  # This will automatically hash the password using the setter
        db.session.add(yeji_user)
        users.append(yeji_user)

        db.session.commit()

        # Seed 10 Events
        events = []
        for _ in range(10):
            random_datetime = fake.date_time_this_year(after_now=True, tzinfo=None)
            event = Event(
                title=fake.bs().capitalize(),
                date=random_datetime.date(),
                time=random_datetime.time()
            )
            db.session.add(event)
            events.append(event)

        db.session.commit()

        # Seed Calendar_Events (each user gets 3 unique events)
        for user in users:
            selected_events = fake.random_elements(elements=events, length=3, unique=True)
            for event in selected_events:
                calendar_event = Calendar_Event(
                    user_id=user.id,
                    event_id=event.id
                )
                db.session.add(calendar_event)

        db.session.commit()
        print("Seeding complete!")
