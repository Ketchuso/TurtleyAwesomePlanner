from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from datetime import datetime, time
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
from werkzeug.security import generate_password_hash, check_password_hash

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)


    calendar_event = db.relationship('Calendar_Event', back_populates='user', cascade='all, delete-orphan')

    serialize_rules = ("-calendar_event.user",)


    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))



class Event(db.Model, SerializerMixin):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)

    calendar_event = db.relationship('Calendar_Event', back_populates='event', cascade='all, delete-orphan')

    serialize_rules = ("-calendar_event.event",)
        

class Calendar_Event(db.Model, SerializerMixin):
    __tablename__ = "calendar_events"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"), nullable=False)

    user = db.relationship('User', back_populates='calendar_event')
    event = db.relationship('Event', back_populates='calendar_event')

    serialize_rules = ("-user.calendar_event", "-event.calendar_event")

