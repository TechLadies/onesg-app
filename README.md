# OneSG App
This is an application that is made for [OneSG](http://onesingapore.org/), that aims to provide a centralised platform for users to access, create and update cases.

The development of this application was done as part of [Techladies Bootcamp #6](https://github.com/TechLadies/bootcamp6-info). [Techladies](http://www.techladies.co/) is a community for women in Asia to connect, learn, and advance as programmers.
<br/>
<br/>

## Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Project Structure](#project-structure)
<br/>
<br/>

## Requirements
- body parser v1.19.0
- cors v2.8.5
- express v4.17.1
- morgan v1.10.0
- node v12.18.3
- npm v6.14.6
<br/>
<br/>

## Installation
Code and setup instructions for frontend and backend can be accessed in their respective subdirectories.
1. Install dependencies
```
git clone https://github.com/TechLadies/onesg-app.git
npm install
```
2. Get development.js file from the coaches/team lead and put in config > env
3. Run the application
```
npm run dev
```
4. Go to http://localhost:8080
<br/>
<br/>

## Project Structure
```
onesg-app
+- config/ : configuration folder
|  +- env/
|  |  +- index.js : loads env file based on environment
|  |  +- development.js
|  |  +- production.js
|  +- index.js : home to your configs, can scale by adding folders and files
+- controllers/ : business logic
|  +- <feature>/ : controller container for a specific feature
+- db/ : db initialization scripts
|  +- migrations/
|  +- seeds/
+- docs/ : documentation
+- middleware/ : custom middleware
+- models/ : db models
+- public/ : for serving static files
+- routers/ : route definitions
|  +- <feature>/ : route container for a specific feature
+- utils/ : shared functions
|  +- errors/ : custom error classes
|  +- index.js : entry point to the utils folder
+- .eslintrc.json
+- .gitignore
+- index.js : app entry point
+- package.json
+- README.md
```
<br/>
<br/>
