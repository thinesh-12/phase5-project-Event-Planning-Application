from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

# Initialize SQLAlchemy
db = SQLAlchemy()

# Define a many-to-many relationship table
event_guests = db.Table(
    'event_guests',
    db.Column('event_id', db.Integer, db.ForeignKey('event.id')),
    db.Column('guest_id', db.Integer, db.ForeignKey('guest.id'))
)

class User(db.Model, SerializerMixin):  # Use db.Model as the base class for your models
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

    # Define a one-to-many relationship with Event
    events = db.relationship('Event', backref='user', lazy=True, foreign_keys='Event.user_id')

    # Serialize related models using association proxy
    event_titles = association_proxy('events', 'title')

class Event(db.Model, SerializerMixin):  # Use db.Model as the base class for your models
    __tablename__ = 'event'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(255))

    # Add a foreign key column to link to the User table
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    # Define a many-to-many relationship with Guest
    guests = db.relationship('Guest', secondary=event_guests, back_populates='events')

    # Serialize related models using association proxy
    guest_names = association_proxy('guests', 'name')

class Guest(db.Model, SerializerMixin):  # Use db.Model as the base class for your models
    __tablename__ = 'guest'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)

    # Define a many-to-many relationship with Event
    events = db.relationship('Event', secondary=event_guests, back_populates='guests')
