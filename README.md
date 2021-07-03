# Record Store: The Backend

The API for the [Record Store project](https://github.com/TO-RecordStore/recordstore_client), made by [Tomas Eliz](https://github.com/TomasEliz) and [Olha Halat](https://github.com/olhanotolga).

[See the Record Store live on Vercel](https://record-store.vercel.app/).

[Read the API Documentation on Heroku](https://awesome-recordstore.herokuapp.com/).

## Tech

- Node.js with Express
- MongoDB via Mongoose

Additional:

- dotenv
- CORS
- axios
- bcrypt JS
- JSON Web Token
- faker.js
- Last.fm API

Frontend:

- React (with Hooks & Context)
- React Router DOM
- Styled Components
- Material UI

## Development process

The app's main functionality was built via pair programming using Live Share VSCode extention.

Additional functionality and final brushes workflow:

- collaborator creates a feature branch and works on it;
- upon completion, a Pull Request is made;
- the other collaborator reviews the code and merges into master.

## Running locally

Clone the repo, navigate into it, and install dependencies with `npm install`.

`npm start` — runs the app locally on port 5001

`npm run seed` — populates the specified MongoDB database

You will need environment variables for:

- database access credentials
- Last.fm API key
- JWT secret key
- your frontend origin
