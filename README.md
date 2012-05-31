node-less-http
==============

Simple wrapper for LESS to serve up CSS directly.

## Install

    npm install less-http

## Usage

    var less_http = require('less-http');

	less_http({
		port : 1337,              // listen on port 1337
		path : '/path/to/less',   // this is where your less files live
		compress : true           // if you want to compress the output
	});
    
You can now get your CSS from `http://127.0.0.1:1337/my_file.css` and this will render the LESS file at `/path/to/less/my_file.less` and return it.