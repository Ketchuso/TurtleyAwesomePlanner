from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from datetime import datetime

from config import db

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)

    calendar_event = db.relationship('Calendar_Event', back_populates='user')

    serialize_rules = ("-calendar_event.user",)

class Event(db.Model, SerializerMixin):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    calendar_event = db.relationship('Calendar_Event', back_populates='event')

    serialize_rules = ("-calendar_event.event",)

    @validates('date')
    def validate_date(self, key, value):
        if not isinstance(value, datetime):
            raise ValueError("date must be datetime")
        return value
        

class Calendar_Event(db.Model, SerializerMixin):
    __tablename__ = "calendar_events"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"), nullable=False)

    user = db.relationship('User', back_populates='calendar_event')
    event = db.relationship('Event', back_populates='calendar_event')

    serialize_rules = ("-user.calendar_event", "-event.calendar_event")

