# react4movies :clapper:

[![VERSION](https://img.shields.io/badge/VERSION-v2.5.0-sucess)](https://github.com/charan379/moviebunkers) [![LAST UPDATE](https://img.shields.io/badge/LAST--UPDATED-21--May--2023-sucess)](https://github.com/charan379/react4movies) [![AGPL License](https://img.shields.io/badge/LICENSE-GNU%20AGPLv3-informational)](https://www.gnu.org/licenses/agpl-3.0.en.html)
[![Netlify Status](https://api.netlify.com/api/v1/badges/286d2ee8-b609-4db1-886a-99b2f3a4bab2/deploy-status)](https://app.netlify.com/sites/moviebunkers01/deploys)

React/NextJs based web client for [MovieBunkers](https://github.com/charan379/moviebunkers)

## `Features`

- Add movies to collection from tmdb
- Search movies
- Know where movie is available for streaming
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

![site-preview](documentation/screenshots/site.gif)
![login-preview](documentation/screenshots/login.jpg)
![sidebar-preview](documentation/screenshots/sidebar.jpg)
![collection-preview](documentation/screenshots/collection.jpg)
![title-light-preview](documentation/screenshots/title_modal_light.jpg)
![title-dark-preview](documentation/screenshots/title_modal_dark.jpg)
![cast-dark-preview](documentation/screenshots/cast2.jpg)
![cast-light-preview](documentation/screenshots/cast.jpg)

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

## Requirements

#### Backend APIs

- [MovieBunkers API](https://github.com/charan379/moviebunkers) it is main backend server for which react4movies acts as frontend
- [tmdb-api-wrapper](https://github.com/charan379/tmdb-api-wrapper) for retriving movies data from Tmdb ( AWS Serverless function )

## License

[![AGPL License](https://img.shields.io/badge/LICENSE-GNU%20AGPLv3-brightgreen)](https://www.gnu.org/licenses/agpl-3.0.en.html)

react4movies is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY, without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with react4movies. If not, see https://www.gnu.org/licenses/agpl-3.0.en.html.
