# How to launch locally the front-end

## Prerequisites

1. Node version 15.14.0

2. Npm version 7.7.6

- **Note:** npm comes along with Nodejs, thus no need to do any installation. 

3. Check versions

```
node -v
npm version
```

## Source code

- Download and unzip the provided source code that corresponds to the front-end of the web application.

## Running frontend

1. Please ensure that the backend server is operational.

2. Open the `.env` file situated at the following path: `appfolder/lu.uni.e4l.platform.frontend.dev/`

and append the following line to the file:

```
API_URL=http://localhost:8080/e4lapi
```

3. Run the following command in the terminal:

```
npm i && npm start
```

4. A browser opens showing the web application's home page.


# Extra information about the front-end
## Project technologies

### Components

This project is based on the [React](https://reactjs.org) JavaScript Library. It is meant to be structured in a way that fits as best as possible how React applications work.

It is revolving around so called components managing their state and rendering html content. The principle is that once the state changes, the component is re-rendered.

Such components can be found in the [container folder](./src/js/container/).

The index.html file is left almost untouched and instead a [index.js](./src/js/index.js) file will be the entry point for all React components.


### Router

This project is using a [Router](./src/js/e4lRouter.js) to deal with page management and avoid `href` (refreshing page). It is also in that component that the header information are updated (language, token, etc.).

### Other Libraries
#### Redux

[Redux](https://github.com/reduxjs/react-redux) is a library to manage states that allows to share data accross different components. One can store and manipulate JavaScript objects in the `store` being the aggregation of different reducers created at the convenience of the developer.

`Reducers` are basically a way to interact with the state in a detached way, meaning that the components won't be modifying the store/global state directly, instead they will be dispatching functions, also called `actions` that will themself perform different tasks, from carrying requests to an API to changing the global state. 

Reducers can be found in the [reducer folder](/src/js/reducer) and actions in the [action folder](/src/js/action). 

One important thing to note is that reducers should not change the state, instead it should create a new state being an updated version of the previous one and replace it. This is the principle of immutability (see [link](https://daveceddia.com/react-redux-immutability-guide/#redux-update-an-object-in-an-array) for complete guide). 

The project is still using local state in different situations. For example where we have normal forms, it is an easier process to store intermediate form entries in the local state and send everything together than dispatch an action every time the user inputs something. 

#### Axios

Axios is a Promise based Javascript library which is used to make http requests. It is comparable to Fetch in features but better manages JSON data.

It is used in several actions/reducers.
