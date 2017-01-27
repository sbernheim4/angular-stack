#Installation

1. Clone the repo and `cd` into it
2. Run `npm install`
3. Run `npm start` in one terminal tab
4. Run `gulp` in another terminal tab
5. Go to `localhost:1337` in your broswer (Google Chrome for live reload functionality --> See note below)

Note: For live reload functionality download the chrome extension:
https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
Make sure the extension is running. The small circle of the chrome extension should be filled in when running. Click on it to turn it on and off

#What is this Repo

This repo is an easy and quick way to get an angular website running. It uses AngularJS and its UI-Router for the front end and NodeJS/ExpressJS for the backend.
Gulp is used to compile SCSS, transpile ES6 JS and minify it along with HTML and allow for livereloading.
It is essientially, a very simple version of the MEAN stack without MongoDB.

# File Structure

Below is the file structure for this stack. Each state goes in its own folder, and each folder contains the html, controller.js and state.js files. All the scss files go in the scss folder
|--app/
|------browser/
|----------js/
|--------------angular_state --> (Each angular state goes in its own folder)
|------------------stateName.state.js
|------------------stateName.template.html
|------------------stateName.controller.js
|----------scss/ --> (All the scss files go here. index.scss imports all the other listed files)
|--------------stateName.scss
|--------------index.scss
|------server/
|----------public/ --> (Contains the gulp generated css and js files)
|--------------index.css
|--------------main.js
|----------index.html
|----------index.js --> (Runs the Express server)
|------gulpfile.js
|------package.json
