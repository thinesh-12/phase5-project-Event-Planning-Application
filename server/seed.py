#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from config import app, db
from models import User, Event, Guest
from flask_bcrypt import Bcrypt

if __name__ == '__main__':
    fake = Faker()
    bcrypt = Bcrypt()
    
    with app.app_context():
        print("Starting seed...")

        # Create users
        users = []
        for _ in range(5):
            hashed_password = bcrypt.generate_password_hash('flatiron555').decode('utf-8')
            user = User(
                username=fake.user_name(),
                email=fake.email(),
                password=hashed_password
            )
            users.append(user)
        
        db.session.add_all(users)
        db.session.commit()

        # Create events and guests
        for _ in range(10):
            event = Event(
                title=fake.sentence(),
                description=fake.text(),
                user=rc(users)
            )
            db.session.add(event)
            
            guests = []
            for _ in range(randint(1, 5)):
                guest = Guest(
                    name=fake.name(),
                )
                guests.append(guest)
            
            event.guests = guests
        
        db.session.commit()

        print("Seeding complete!")
