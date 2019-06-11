# Job Skills

a React and Redux web application that displays lists of jobs and skills taken from the [Open Skills API](https://github.com/workforce-data-initiative/skills-api).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

Before running any of the available scripts, from the project directory run 

### `npm install`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Overview

The application allows users to search for jobs and view a list of skills associated with that job. Alternatively, the user is able to search for skills and find a list of jobs associated with that skill. From the display of results the user is able to navigate between the skills and results pages by selecting one of the results.

The application is the work of approximately 9 hours of coding and testing and 2 hours of planning and documenting.

The application is laid out into four main screens. The design and possible improvements to each of these is described in more detail below.

### Landing Page

The landing page is a simple screen that displays the name of the application and a brief description. It makes use of the Button component that was designed to meet the Airbnb JavaScript Style Guide for accessibility. By selecting the enter button, the user is able to navigate to the main search screen of the application. The page could have been removed and the information moved to the search screen, but I felt like it would look cluttered when searching for jobs and skills.

#### Possible Improvements

* The background image should not be rendered on mobile to improve load time and data usage.

### Search Page

The search page allows the user to select a search-type (jobs, or skills). Once selected the user is shown a search bar that they can search for jobs or skills. The search bar is a custom Autocomplete component that will update as the user modifies the text in the search bar. A change in value of the input will trigger and API request that returns a list of possibilities that contain the value of the input string. The list is sorted and the most likely search results are displayed as options. To reduce the number of requests the Autocomplete component only makes the request if the user has stopped typing for a short amount of time. It also does not make the request if too few characters are entered which would lead to a slow request with too many possible options. Selecting an item from the list, or selecting the go Button, navigates the user to the results page associated with the job or skill. If an invalid value is submitted the user is notified and they are not navigated to the results page.

#### Possible improvements

* The API request should be moved to an action creator in Redux and triggered by dispatching instead of directly from the component. This will prevent setState from sometimes being called on an unmounted component.
* The results page could be separated into two components for job search and skill search. A presentational component could be shared by the components providing different props rather than handling both cases within the component which caused the code to be cluttered.

### Results Page 

The results screen receives the unique ID of the job or skill as a prop which is taken from the url. After mounting the screen makes a request to the api for the name of the job/skill as well as a list of the unique IDs of the associated jobs/skills. A subset of the related jobs/skills is displayed as a list of buttons that are connected to the redux store. The buttons are given the unique identifier as a prop and they dispatch an action to request the name if needed. If it has been requested earlier in the session the value can be found in the store. If it has not yet been requested the value will be requested from the API and put in the store. This will prevent repeated requests for the same value. Selecting the More button will cause more related jobs/skills to be rendered. This does not trigger an API request as all of the related jobs/skills are already known. Selecting any of the jobs/skills will navigate the user to the associated page. THe user can return to the search page by selecting the arrow in the corner.

### Chart Page

From the search page, a user may navigate to a bar chart which displays the importance of skills to jobs. The labels of the chart have been hard coded and the values of the importance are retrieved by an API request after mounting. Time constraints lead to some of the data being hard coded but the Bar Chart component is generalized and the page could easily be generalized to work for any combination of jobs and skills.

#### Possible improvements

* The page is not mobile friendly. The chart dimensions are taken as props and should be modified based on window parameters.

### Overall

Overall, the application is functional. The application is somewhat responsive as it is mostly built using flexbox components, but it needs a bit more work to be super mobile friendly. It could also use some additional functionality around failing API requests, in terms of informing the user what has happened. There was also a bit of difficulty caused by the Open Skills API, which seems to have out of date documentation. The data shape and information return by the actual API is not consistent with what is shown in the documentation. With a bit more work the application could be very robust.
