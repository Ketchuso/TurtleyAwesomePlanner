#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Event, Calendar_Event

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        db.session.query(Calendar_Event).delete()
        db.session.query(Event).delete()
        db.session.query(User).delete()

        # Commit the deletions
        db.session.commit()

        # Seed Users
        for _ in range(10):  # Create 10 users
            user = User(
                username=fake.user_name()
            )
            db.session.add(user)

        # Seed Events
        for _ in range(5):  # Create 5 events
            event = Event(
                title=fake.bs(),
                date=fake.date_time_this_year(after_now=True, tzinfo=None)
            )
            db.session.add(event)

        # Commit the users and events
        db.session.commit()

        # Seed Calendar_Events (Many-to-Many relationship between users and events)
        users = User.query.all()
        events = Event.query.all()
        
        for user in users:
            # Choose random events for each user
            selected_events = rc(events)  # Pick one random event
            calendar_event = Calendar_Event(
                user_id=user.id,
                event_id=selected_events.id
            )
            db.session.add(calendar_event)

        # Commit the Calendar_Events
        db.session.commit()

        print("Seeding complete!")