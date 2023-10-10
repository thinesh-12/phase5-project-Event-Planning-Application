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
        used_usernames = set()  # Keep track of used usernames
        used_emails = set()  # Keep track of used emails

        for _ in range(5):
            username = fake.user_name()
            while username in used_usernames:
                username = fake.user_name()

            email = fake.email()
            while email in used_emails:
                email = fake.email()

            hashed_password = bcrypt.generate_password_hash('flatiron555').decode('utf-8')
            user = User()
            user.username = username
            user.email = email
            user.password = hashed_password
            users.append(user)
            used_usernames.add(username)
            used_emails.add(email)

        db.session.add_all(users)
        db.session.commit()

        # Create events and guests
        for _ in range(10):
            event = Event()
            event.title = fake.sentence()
            event.description = fake.text()
            # event.user = rc(users)

            guests = []
            for _ in range(randint(1, 5)):
                guest = Guest()
                guest.name = fake.name()
                db.session.add(guest)  # Add guest to the session
                guests.append(guest)

            event.guests.extend(guests)

        db.session.commit()

        print("Seeding complete!")
