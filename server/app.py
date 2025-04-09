#!/usr/bin/env python3

# Standard library imports
from flask import Flask, jsonify, request, make_response
from flask_restful import Api, Resource
from models import User, Event, Calendar_Event
from config import app, db, api
from datetime import datetime




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

