node-less-http
==============

Simple wrapper for LESS to serve up CSS directly.

## Install

    npm install less-http

## Usage

    var less_http = require('less-http');
    less_http('/path/to/less',8000); // listen on port 8000
    
You can now get your CSS from `http://127.0.0.1:8000/my_file.css` and this will render the LESS file at `/path/to/less/my_file.less` and return it.