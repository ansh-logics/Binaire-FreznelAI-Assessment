
# Solution Notes

## Problem 1: The starter project was empty

The repository already had the folder structure, but most of the important files were empty. So the first thing I had to do was make the project runnable without changing the given structure.

## Solution

I set up React, TypeScript, Vite and Tailwind around the existing folders.

I kept separate folders for API calls, models, hooks, layout components, pages and utilities. This made it easier to add features without putting everything inside one component.

---

## Problem 2: The reference was Steam, but the API was TMDB

The UI reference was based on Steam, but the task asked to use TMDB. TMDB gives movie data, not game data.

## Solution

I used Steam as the UI and interaction reference, but used TMDB for real movie data like titles, descriptions, genres, ratings, posters and backdrop images.

So the project is called **Game Store**. It has a Steam-inspired layout, but it does not pretend that TMDB movies are real Steam games.

---

## Problem 3: Building the UI within limited time

There was limited time remaining, so I needed to focus on the features that matter most instead of spending too much time setting up extra libraries.

## Solution

Shadcn was allowed, but I decided to build the main UI components myself with React, Tailwind and CSS.

This helped me control the layout and interactions properly, especially for the featured carousel, movie cards, navigation, focus states and responsive behaviour.

The main parts built are:

- Header and store navigation
- Search UI
- Featured movie carousel
- Previous and next carousel controls
- Carousel dot indicators
- TMDB movie cards
- Sidebar navigation
- Responsive layout
- Hover, focus, active and target states

---

## Problem 4: Managing TMDB data cleanly

TMDB gives raw JSON data. I did not want UI components to directly depend on raw API fields everywhere.

## Solution

I created a `Movie` model class which converts raw TMDB data into values that are easier to use in the UI.

For example, the model handles:

- Release year
- Genre names
- Poster URL
- Backdrop URL
- TMDB score

The `TmdbClient` class handles API calls and converts raw TMDB responses into `Movie` objects.

---

## Problem 5: Pagination and loading more movies

Loading every movie at once is not efficient and makes the page heavier.

## Solution

I created a `PaginationController` class to manage:

- Current page
- Total pages
- Loading state
- Whether more movies are available

This prevents duplicate requests and is used as the base for manual pagination and lazy loading.

---

## Verification

I checked that the project builds successfully using:

```bash
npm run build
```

TMDB movie data is also loading successfully in the browser.

---

## Video walkthrough

I will add the short build walkthrough video here after uploading it. The video shows the starting point, the work done, and the time remaining during the assessment.
