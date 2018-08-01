# Prerequisite
* [Bash terminal](https://gitforwindows.org/), or equivalent 
* Ensure [NodeJS](https://nodejs.org/en/) is installed
If you are in an office enviroment you may require permissions from IT to install them
* API key from GiftsOnline
# Company firewalls
* Get address of company firewall (PAC or equivalent) - ***chrome://net-internals/#proxy*** may help

NPM is a package manager that comes with NodeJS. This lets you download packages quickly from the command line. However, since it requires an external connection, it needs to go through your coporate firewall.

Run and set the proxy for npm  ( replace http://company.com:8000 with your companies proxy ) - via bash terminal
```
npm config set proxy http://company.com:8000
npm config set https-proxy http://company.com:8000
```
![image](https://user-images.githubusercontent.com/2521843/43068924-aeacad7a-8e63-11e8-9df9-c8d4767c6f48.png)

# Setup
Ensure prerequisites are installed
- Open terminal (e.g. [Bash terminal](https://gitforwindows.org/)), in any directory

You can do this by right clicking and selecting `git bash`, if you are using git bash
![image](https://user-images.githubusercontent.com/2521843/43067963-eb9a134c-8e60-11e8-8778-919911c97b48.png)


- Clone this project `git clone git@github.com:jovanhan2/MicroEdge-API-Tutorial.git`
Cloning basically downloads the project from github

- Navigate to the directory via commands

You can right click -> git bash here to navigate, or alternatively use these unix commands:
* `ls` - display all current files and folders in the current directory
* `cd` - enter a given folder, e.g. `cd MicroEdge-API-Tutorial` - pressing tab will give autocompletion when you are typing it out partially
* `cd ..` moves up one directory -> e.g. `C:\Users\kuehl\Documents\MicroEdge-API-Tutorial` to `C:\Users\kuehl\Documents`


Make sure you are in inside the correct directory, like so 
![image](https://user-images.githubusercontent.com/2521843/43067874-a7b71594-8e60-11e8-8448-b148d3f6103b.png)


- Execute: `npm install` to install dependencies

Installs all the required libraries for the project

![image](https://user-images.githubusercontent.com/2521843/43068165-92859dde-8e61-11e8-946c-abbb7a2c7f61.png)

# Contacting the API
- Open VS code in the directory (or any other editor)
- Get a user ID and private key that can access the GO API (fill in the return statement in keys.js)
![image](https://user-images.githubusercontent.com/2521843/43068729-2cff90da-8e63-11e8-9305-6e34411ba6e9.png)


- Change ```var contactId = "149"``` on line 7 to any contact ID
- Set ```var proxyUrl = "http://company.com:8000"``` on line 25 to your company proxy 
- Execute: `node test.js` in the terminal 

This runs the program, contained in a testfile called `test.js`, using nodeJS

- Console should log the correct contact id

# High level explanation of code
Minute details can be found in code comments. 

From a top level perspective, the code:
* Sends our keys to get an authenthication token (JWT)
* Use that token to prove we are authenthicated by sending it along with our search parameters# BBGM-api
