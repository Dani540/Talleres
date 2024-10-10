# Simple API Consumption SPA

This is a **Single Page Application (SPA)** built with **Vue.js** as part of a quick university test project. The app consumes data from different APIs through four buttons, each triggering a different API call using the **fetch** method and implementing the **Strategy design pattern** for flexible and scalable data fetching.

The app is fully deployed on **Netlify**, providing a live and easy-to-access example of its functionality.

## Features

- **Vue.js SPA**: The project is built using Vue.js, making it a dynamic and responsive single-page application.
- **API Consumption**: The application fetches data from 4 different APIs (anime, manga, country population, and random anime recommendations) using the `fetch` method.
- **Strategy Design Pattern**: Implemented to manage API calls, allowing easy integration of new APIs without modifying existing code.
- **Responsive UI**: A simple user interface with four buttons, each corresponding to a specific API call, showing formatted data retrieved from the APIs.
- **Deployed on Netlify**: The app is hosted and accessible via Netlify, demonstrating ease of deployment and real-world accessibility.

## Demo

You can check the live version of the app here: [Live Demo](https://api-consumer.netlify.app/) 
## How It Works

The app displays four buttons, each triggering a different API call:

- **Country Population**: Fetches population data for various countries.
- **Anime Recommendations**: Retrieves anime recommendations from an anime database.
- **Random Anime**: Displays information about a random anime.
- **Random Manga**: Shows data about a random manga.

All API calls are handled using the **Strategy pattern**, which allows different fetching strategies to be added or modified independently.

## Technologies Used

- **Vue.js**: The main framework for building the application.
- **Fetch API**: Used for making HTTP requests to different APIs.
- **Strategy Design Pattern**: For handling multiple API fetching strategies.
- **Netlify**: For deploying and hosting the app.
