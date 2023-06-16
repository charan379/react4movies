# react4movies :clapper:

[![VERSION](https://img.shields.io/badge/VERSION-v2.5.0-sucess)](https://github.com/charan379/moviebunkers) [![LAST UPDATE](https://img.shields.io/badge/LAST--UPDATED-15--June--2023-sucess)](https://github.com/charan379/react4movies) [![AGPL License](https://img.shields.io/badge/LICENSE-GNU%20AGPLv3-informational)](https://www.gnu.org/licenses/agpl-3.0.en.html)
[![Netlify Status](https://api.netlify.com/api/v1/badges/286d2ee8-b609-4db1-886a-99b2f3a4bab2/deploy-status)](https://app.netlify.com/sites/moviebunkers01/deploys)

React/NextJs based web client for [MovieBunkers](https://github.com/charan379/moviebunkers)

## `Features`

- Add movies to collection from tmdb
- Search movies
- Know where movie is available for streaming
- Play Youtube Trailers
- Filters
  - filter by language
  - filter by genre
  - filter by movie/tv
  - filter by Age/Film Board Certification
  - filter by seen/unseen
  - filter by favourite
  - filter by starred
- Sort
  - year asc
  - year desc
  - added asc
  - added desc
- Set movie as seee, unseen, star, favourite
- Toggle between light/dark themes
- Multi user view
  - Guest
  - User
  - Moderator
  - Admin

## Keyboard Shortcuts

- CTRL+Q => Opens Sidebar, If sidebar already opened focus search field
- CTRL+D => Clears all filters and search query
- Esc => closes sidebar, movie modal

## Screenshots

![website-preview](documentation/screenshots/website-ss.jpg)
![title-modal-1](documentation/screenshots/title-modal-1.jpg)
![title-modal-2](documentation/screenshots/title-modal-2.jpg)
![title-modal-3](documentation/screenshots/title-modal-3.jpg)
![title-modal-4](documentation/screenshots/title-modal-4.jpg)
![tmdb-movie.jpg](documentation/screenshots/tmdb-movie.jpg)
![mbdb-light.jpg](documentation/screenshots/mbdb-light.jpg)
![tmdb-light.jpg](documentation/screenshots/tmdb-light.jpg)
![yt-1.jpg](documentation/screenshots/yt-1.jpg)
![mbdb-sb-dark.jpg](documentation/screenshots/mbdb-sb-dark.jpg)
![mbdb-movie-light.jpg](documentation/screenshots/mbdb-movie-light.jpg)
![episodes-list.jpg](documentation/screenshots/episodes-list.jpg)
![ext-cast.jpg](documentation/screenshots/ext-cast.jpg)
![links-section.jpg](documentation/screenshots/links-section.jpg)
![logout-2.jpg](documentation/screenshots/logout-2.jpg)
![login](documentation/screenshots/login.jpg)
![logout](documentation/screenshots/logout.jpg)

## Installation

##### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`GENERATE_SOURCEMAP`  
`NEXT_PUBLIC_MOVIEBUNKERS_API`  
`NEXT_PUBLIC_MOVIEBUNKERS_IMAGES`  
`NEXT_PUBLIC_TMDB_API_WRAPPER`
`NEXT_PUBLIC_MOVIEBUNKERS_GUEST_TOKEN`  
`NEXT_PUBLIC_GUEST_USERNAME`  
`NEXT_PUBLIC_GUEST_PASSWORD`
`NODE_ENV`
`NEXTAUTH_SECRET`
`NEXTAUTH_URL`

##### Clone this repository

```bash
    git clone https://github.com/charan379/react4movies.git
```

```bash
    cd react4movies
```

##### To run dev env

```bash
    npm run dev
```

##### Build

```bash
    npm run build
```

##### Deployment

```bash
    npm start
```

## Todo

- Admin page to manage users
- Password reset page
- User Registration page
- Code cleaning
- [PWA](https://en.wikipedia.org/wiki/Progressive_web_app)

## Requirements

#### Backend APIs

- [MovieBunkers API](https://github.com/charan379/moviebunkers) it is main backend server for which react4movies acts as frontend
- [tmdb-api-wrapper](https://github.com/charan379/tmdb-api-wrapper) for retriving movies data from Tmdb ( AWS Serverless function )

## License

[![AGPL License](https://img.shields.io/badge/LICENSE-GNU%20AGPLv3-brightgreen)](https://www.gnu.org/licenses/agpl-3.0.en.html)

react4movies is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY, without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with react4movies. If not, see https://www.gnu.org/licenses/agpl-3.0.en.html.
