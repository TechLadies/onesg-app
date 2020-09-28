# onesg-app
[app description. wip]
<br/>
<br/>

## Table of Contents
- [Requirements](#core-development-requirements)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Naming Conventions](#naming-conventions)
<br/>
<br/>

## Requirements
- node v12.18.3
- npm v6.14.6
<br/>
<br/>

## Quick Start
WIP
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
+- docs/ : documentation
+- controllers/ : business logic
|  +- <feature>/ : controller container for a specific feature
+- db/ : db initialization scripts
|  +- migrations/
|  +- seeds/
+- lib/ : shared functions
|  +- <feature>/ : function container for a specific feature 
+- models/ : db models
+- public/ : for serving static files
+- routers/ : route definitions
|  +- <feature>/ : route container for a specific feature
+- .eslintrc.json
+- .gitignore
+- index.js : app entry point
+- package.json
+- README.md
```
<br/>
<br/>

## Naming Conventions
### Branches
Write branch names in small caps in this convention:
* features: feature/\<ticket-id>-\<ticket-name>
    * e.g.: `feature/on-36-case-creation-progress-bar`
* tasks: chore/\<ticket-id>-\<ticket-name>
    * e.g.: `chore/on-33-express-server-setup`
* bugs:

