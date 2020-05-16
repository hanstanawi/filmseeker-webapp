# FilmSeeker

## Project setup

Clone the git repository and run these commands

```bash
npm install
```

### To run in development mode

```bash
npm run serve
```

## Project Overview

### About FilmSeeker

FilmSeeker is actually my own fictional startup idea during my second year of college. It's a web application where users can search for movies, add them to a watchlist, add ratings to the movies, etc. Because I hadn't learned web development back then, so that idea only remained as an idea. Fortunately, now I have the opportunity to really develop it into a real web application.
The logo was made by myself using Adobe Illustrator.

### Frameworks and Libraries

- Vue.js - JavaScript Framework
  - Vuex - State management library
  - Vue Router - Routing library
  - Vuetify - Plugin for Vue.js based on Material Design
- Axios - Library for fetching the data from the API
- [TMDB API](https://developers.themoviedb.org/3/discover/movie-discover) - The API source
- ESLint AirBnB - Code Linter

### Tools

- Visual Studio Code - Code editor
- Postman - Used to test out API call before hooking up to the components
- Adobe Illustrator - Designing the logo
- Adobe XD - Designing the rough sketch of the app

## About the Project

- The web app basically lets the user to search for a movie from top 100 movies from TMDB API. The movies are first fetched from the API using Axios. The user can enter the title of the movie and the movies list will be filtered according to the search query. I use the filter array method for this.
- I use Vue Router to make the routes. There are three router views:
  - Movies: Lists of all the movies
  - Movie Details: Showing the detail of the movie which the user clicks into. The user can add that particular movie to the watchlist
  - Watchlist: List out the movies that have been added to the watchlist. The users can sort them based on the rating or the alphabetical of the movie title
- All of the components are hooked into the Vuex, where the state is managed. Therefore, all of the components can communicate properly. I split the store into two separate modules to avoid any confusion between the movies list and the watchlist. Thus, I can manage the state, actions, mutations, and getters of each functionality properly.
- The axios API call is done on a separate file. I make an axios instance and export some of the API methods to clean up the API call paramaters from the store.
- I use the ESLint Airbnb style, although some of the times I turn it off, especially in the store because it sometimes disrupts the access to the state.

## Some of the features I want to add in the future:

- Better search queries, where users can choose how many movies that they want to search or any options of more search parameters
- A user ratings section where users can rate the movies and save them into the database
- Develop a backend server and database with Node, Express, and any databases (SQL or MongoDB)
- User authentication
- More movie details, like the cast, pictures, link to the trailer, reviews
- A section where users can pick two movies and compare them
