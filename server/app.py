#!/usr/bin/env python3

# Standard library imports
from flask import Flask, jsonify, request, make_response
from flask_restful import Api, Resource
from models import User, Event, Calendar_Event
from config import app, db, api
from datetime import datetime
from dateutil import parser




# Views go here!

@app.route('/users/<int:id>', methods=['GET','DELETE'])
def users_by_id(id):
    user = User.query.filter(User.id==id).first()
    if request.method == 'GET':
        return make_response(user.to_dict(), 200)
    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        return make_response("", 204)

@app.route('/events', methods=['POST'])
def events():
    data = request.json
    date_obj = datetime.fromisoformat(data['date'])
    newEvent = Event(title= data['title'], date=date_obj)
    db.session.add(newEvent)
    db.session.commit()
    return make_response(newEvent.to_dict(), 201)

@app.route('/events/<string:date>', methods=["GET"])
def event_by_date(date):
    try:
        # Convert the date string to a datetime.date object
        parsed_date = datetime.strptime(date, "%Y-%m-%d").date()
    except ValueError:
        return make_response(jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400)

    # Query events by date (ignoring the time)
    events = Event.query.filter(Event.date == parsed_date).all()

    if events:
        return make_response(jsonify([event.to_dict() for event in events]), 200)
    else:
        return make_response(jsonify({"message": "No events found for this date."}), 404)


@app.route('/events/<int:id>', methods=['PATCH', 'DELETE'])
def event_by_id(id):
    event = Event.query.filter(Event.id==id).first()
    if request.method == "PATCH":
        data = request.json
        for attr in data:
            setattr(event, attr, data[attr])
        db.session.commit()
        return make_response(event.to_dict())
    elif request.method == "DELETE":
        db.session.delete(event)
        db.session.commit()
        return make_response("", 204)
    
# POST

@app.route('/calendar_event', methods=['POST'])
def calendarevent():
    data = request.json
    newCalendarevent = Calendar_Event(user_id= data['user_id'], event_id = data['event_id'])
    db.session.add(newCalendarevent)
    db.session.commit()
    return make_response(newCalendarevent.to_dict(), 201)

@app.route('/calendar_event/<int:id>', methods=['DELETE'])
def calendarevent_by_id(id):
    calendarevent = Calendar_Event.query.filter(Calendar_Event.id==id).first()
    db.session.delete(calendarevent)
    db.session.commit()
    return make_response("", 204)



if __name__ == '__main__':
    app.run(port=5555, debug=True)

