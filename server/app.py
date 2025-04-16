#!/usr/bin/env python3

# Standard library imports
from flask import Flask, jsonify, request, make_response, session
from flask_restful import Api, Resource
from models import User, Event, Calendar_Event
from config import app, db, api
from datetime import datetime
from dateutil import parser
import ipdb



# class Signup(Resource):
#     def post(self):
#         json = request.json
#         username = json.get('username', '').strip()
#         password = json.get('password', '').strip()

#         # Check if username or password is empty
#         if not username or not password:
#             return {'errors': ['Username and password cannot be empty']}, 400

#         try:
#             user = User(username=username)
#             user.password_hash = password
#             db.session.add(user)
#             db.session.commit()

#             session['user_id'] = user.id
#             print("Successfully created user:", user.username)
#             return user.to_dict(), 201

#         except Exception as e:
#             return {'error': 'Unprocessable Entity'}, 422


class Signup(Resource):
    
    def post(self):
        json = request.get_json()
        user = User(
            username=json['username']
        )
        user.password_hash = json['password']
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id

        return user.to_dict(), 201




class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return make_response(user.to_dict(), 200)
        else:
            return {'error': 'Unauthorized'}, 401


class Login(Resource):
    def post(self):
        json=request.json
        user = User.query.filter(User.username == json['username']).first()
        password = json['password']
        if user and user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200

        return {'error': 'Invalid username or password'}, 401 




class Logout(Resource):
    def delete(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            session['user_id']=None
            return make_response("", 204)
        else:
            return {'error': 'not logged in'}, 401 
        

class UserById(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response({"error": "User not found"}, 404)
        
        return make_response(user.to_dict(), 200)

    def delete(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response({"error": "User not found"}, 404)
        
        db.session.delete(user)
        db.session.commit()
        return make_response("", 204)
    
    def patch(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response({"error": "User not found"}, 404)
        
        data = request.get_json()

        if "username" in data:
            user.username = data['username']
        if "password" in data:
            user.password_hash = data['password']
        
        db.session.commit()
        return make_response(user.to_dict(), 200)



class EventList(Resource):
    def post(self):
        data = request.json
        date_obj = datetime.strptime(data["date"], "%Y-%m-%d").date()
        time_obj=datetime.strptime(data["time"], "%H:%M:%S").time()
        new_event = Event(title=data['title'], date=date_obj, time=time_obj)
        db.session.add(new_event)
        db.session.commit()
        return make_response(new_event.to_dict(), 201)


class EventById(Resource):
    def patch(self, id):
        event = Event.query.filter(Event.id == id).first()
        data = request.json
        for attr in data:
            value = data[attr]
            if attr == "date":
                value = datetime.strptime(value, "%Y-%m-%d").date()
            elif attr == "time":
                value = datetime.strptime(value, "%H:%M:%S").time()
            setattr(event, attr, value)
        db.session.commit()
        return make_response(event.to_dict())

    def delete(self, id):
        event = Event.query.filter(Event.id == id).first()
        db.session.delete(event)
        db.session.commit()
        return make_response({'message': 'deleted'})


class EventByDate(Resource):
    def get(self, date):
        try:
            parsed_date = datetime.strptime(date, "%Y-%m-%d").date()
        except ValueError:
            return make_response(jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400)

        events = Event.query.filter(Event.date == parsed_date).all()

        if events:
            return make_response(jsonify([event.to_dict() for event in events]), 200)
        else:
            return make_response(jsonify({"message": "No events found for this date."}), 404)


class CalendarEvent(Resource):
    def post(self):
        data = request.json
        new_cal_event = Calendar_Event(user_id=data['user_id'], event_id=data['event_id'])
        db.session.add(new_cal_event)
        db.session.commit()
        return make_response(new_cal_event.to_dict(), 201)


class CalendarEventById(Resource):
    def delete(self, id):
        cal_event = Calendar_Event.query.filter(Calendar_Event.id == id).first()
        db.session.delete(cal_event)
        db.session.commit()
        return make_response("", 204)

class CalendarEventByUserId(Resource):
    def get(self, user_id):
        calendarevents = Calendar_Event.query.filter(Calendar_Event.user_id == user_id).all()
        user_Events = [calendarevent.event.to_dict() for calendarevent in calendarevents]
        return make_response(user_Events, 200)

class CalendarEventByUserAndDate(Resource):
    def get(self, user_id, date):
        try:
            parsed_date = datetime.strptime(date, "%Y-%m-%d").date()
        except ValueError:
            return make_response(jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400)

        # Correct filtering using comma-separated arguments
        calendar_events = Calendar_Event.query.join(Event).filter(
            Calendar_Event.user_id == user_id,
            Event.date == parsed_date
        ).all()

        user_events = [calendar_event.event.to_dict() for calendar_event in calendar_events]

        if user_events:
            return make_response(user_events, 200)
        else:
            return make_response(jsonify({"message": "No events found for this date."}), 404)


# Add to API
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(EventList, '/events')
api.add_resource(EventById, '/events/<int:id>')
api.add_resource(EventByDate, '/events/<string:date>')
api.add_resource(CalendarEvent, '/calendar_event')
api.add_resource(CalendarEventById, '/calendar_event/<int:id>')
api.add_resource(CalendarEventByUserId, '/calendar_event/user/<int:user_id>')
api.add_resource(CalendarEventByUserAndDate, '/calendar_event/<int:user_id>/<string:date>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

