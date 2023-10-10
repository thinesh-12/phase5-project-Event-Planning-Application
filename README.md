# Event Planning Application

The Event Planning Application is a web-based platform that allows users to create, manage, and organize events, invite guests, and track event details. This project is implemented using Flask, SQLAlchemy, and other technologies.

## Features

- User Registration and Authentication: Users can create accounts and log in to access the application.
- Event Creation: Authenticated users can create new events, providing details such as event title and description.
- Guest Management: Users can add guests to their events and keep track of guest lists.
- Event Ownership: Each event is associated with a user who can manage and update event details.
- API Integration: The application provides a RESTful API for programmatic access to event and user data.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/Event-Planning-Application.git
   cd Event-Planning-Application

   npm install
This will install the necessary front end dependancies. Then run

npm start
This will launch the application on your local host.

Now open a new terminal, and navigate into the 'server' directory. After doing so run

pipenv install && pipenv shell
This will install the necessary backend dependancies and launch a virtual environment where the application will run.

To start the application, from the virtual environment run:

python app.py

This will start up the backend!
Now that both the Front and Back ends are up and running, the application can be used!

## Usage
Register a new user account or log in with existing credentials.
Create new events and add guests to those events.
Explore the API for additional functionalities.

## Contributing
Contributions to the project are welcome! To contribute:

Fork the repository.
Create a new branch for your feature or bug fix: git checkout -b feature-name.
Make your changes and commit them: git commit -m "Add feature-name".
Push your changes to your fork: git push origin feature-name.
Create a pull request on the main repository.

## License
This project is licensed under the MIT License. See the LICENSE file for details.