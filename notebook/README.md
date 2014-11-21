# Notebook

## How to use

To run this web app, you can use any server.
For example nginx, looking at:

- This directory - to develop the frontend
- Or at the directory build/dist - if you just need to run the project




As the backend you can use nodejs.

The default port is 9090.

Start the server using command:

	$ node notebookServer.js


	
Default database is MySQL.

Default settings:

    host     : 'localhost',	    
    user     : 'admin',	    
    password : '1234'
	     

### Build

Prerequisites:

    $ npm -g install grunt (sudo)
    $ npm -g install bower (sudo)
    $ npm install
    $ bower install
    Choose: 
       3) d3#~3.4 which resolved to 3.4.13 and is required by angular-nvd3#0.1.1Prefix the choice with ! to persist it to bower.json
       6) angular#* which resolved to 1.3.3 and is required by notebookPrefix the choice with ! to persist it to bower.json


Build project using commands:

	$ grunt build:dev
    $ grunt build:dist
    $ grunt build - both :dev and :dist
   
Compile css using commands:

    $ grunt less:dev
    $ grunt less:dist
    $ grunt less - both :dev and dist
