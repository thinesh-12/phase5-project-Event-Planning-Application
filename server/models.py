from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from extensions import db

Base = declarative_base()

# Define a many-to-many relationship table
event_guests = Table(
    'event_guests',
    Base.metadata,
    Column('event_id', Integer, ForeignKey('event.id')),
    Column('guest_id', Integer, ForeignKey('guest.id'))
)

class User(Base, SerializerMixin):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    username = Column(String(80), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(128), nullable=False)

    # Define a one-to-many relationship with Event
    events = relationship('Event', backref='user', lazy=True, foreign_keys='Event.user_id')

    # Serialize related models using association proxy
    event_titles = association_proxy('events', 'title')

class Event(Base, SerializerMixin):
    __tablename__ = 'event'
    id = Column(Integer, primary_key=True)
    title = Column(String(80), nullable=False)
    description = Column(String(255))

    # Add a foreign key column to link to the User table
    user_id = Column(Integer, ForeignKey('user.id'))

    # Define a many-to-many relationship with Guest
    guests = relationship('Guest', secondary=event_guests, back_populates='events')

    # Serialize related models using association proxy
    guest_names = association_proxy('guests', 'name')

class Guest(Base, SerializerMixin):
    __tablename__ = 'guest'
    id = Column(Integer, primary_key=True)
    name = Column(String(80), nullable=False)

    # Define a many-to-many relationship with Event
    events = relationship('Event', secondary=event_guests, back_populates='guests')
