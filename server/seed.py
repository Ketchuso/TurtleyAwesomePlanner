#!/usr/bin/env python3

# Standard library imports
from random import choice as rc
from datetime import datetime, time

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Event, Calendar_Event

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Clear existing data
        db.session.query(Calendar_Event).delete()
        db.session.query(Event).delete()
        db.session.query(User).delete()
        db.session.commit()

        # Seed 2 Users
        users = []
        for _ in range(2):
            user = User(username=fake.user_name())
            user.password = "test123"  # Set hashed password
            db.session.add(user)
            users.append(user)

        # Seed 5 Events
        events = []
        for _ in range(5):
            # Generate a random date and time
            random_datetime = fake.date_time_this_year(after_now=True, tzinfo=None)
            random_date = random_datetime.date()
            random_time = random_datetime.time()
            
            event = Event(
                title=fake.bs(),
                date=random_date,
                time=random_time
            )
            db.session.add(event)
            events.append(event)

        db.session.commit()

        # Seed Calendar_Events (each user gets 1 random event)
        for user in users:
            selected_event = rc(events)
            calendar_event = Calendar_Event(
                user_id=user.id,
                event_id=selected_event.id
            )
            db.session.add(calendar_event)

        db.session.commit()
        print("Seeding complete!")
