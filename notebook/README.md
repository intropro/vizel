# Notebook

## How to use

To run this web app, you can use any server.
For example nginx, looking at:
 	1.This directory - to develop the frontend
 	2.Or at the directory build/dist - if you just need to run the project


As the backend you can use nodejs.
The default port is 9090.
To start the server, run the following command on the console from the current directory:
	node notebookServer.js
	
Default database is MySQL.
Default settings:
   	host     : 'localhost',
   	user     : 'admin',
   	password : '1234'



### Contribute

Run it using command:
	npm install
then:
	bower install

Build project using commands:
	grunt build:dev
   	grunt build:dist
   	grunt build - both :dev and :dist
   
Compile css using commands:
  	grunt less:dev
  	grunt less:dist
  	grunt less - both :dev and dist