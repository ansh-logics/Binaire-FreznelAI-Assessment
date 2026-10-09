
# Solution

The starter repository mostly had the structure, so first I made the app runnable with React, TypeScript, Vite and Tailwind.

The main thing I understood from the task was that the reference was a game store UI but the API data was for movies. I did not want to copy game content into it, so I used the reference for the layout and interaction ideas and changed the content into a movie discovery product.

For example, game price and reviews do not make sense for a movie browser, so I used release dates, genres and TMDB ratings instead. The UI is made with custom React components, Tailwind and CSS instead of a UI component library.

Main things I built:

- TMDB client and Movie model class
- Featured movie carousel with controls, thumbnails and pause on interaction
- Search, genre filtering and movie detail pages
- Manual pagination and lazy loading without an external library
- Firebase sign up, login and My List
- Offline status and cached TMDB responses
- Hover, focus, active and target states
- About, Support and footer

For Home, I kept the movie list limited so it works as a landing page. Browse is where users can keep exploring with pagination and lazy loading.

I also ran `npm run build` before submission.

