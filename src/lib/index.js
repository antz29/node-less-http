var http    = require('http'),
    less    = require('less'),
    fs      = require('fs'),
    url     = require('url'),
    path    = require('path');

module.exports = function(options) {
	
	options = options || {};

	var path_to_less = options.path || process.env.PWD;
	var port = options.port || 1337;
	var compress = (options.compress !== undefined) ? options.compress : true;

	http.createServer(function (req, res) {

	    var uri = url.parse(req.url);

	    if (req.method !== 'GET' || uri.pathname.indexOf('.css') == -1) {
	        res.writeHead(400, {'Content-Type': 'text/plain'});
	        res.end('Invalid request. :(');
	        return; 
	    }

	    var less_path = path.join(path_to_less,uri.pathname.replace('.css','.less'));

	    console.log('Processing: ' + less_path);

	    function handleLessError(e) {
	        res.writeHead(500, {'Content-Type': 'text/plain'});
	        res.end('Error processing LESS\nPath: ' + less_path + '\nLine: ' + e.line);
	        console.log(e);
	        return; 
	    }

	    fs.readFile(less_path, 'utf8', function(err,less_data) {

	        if (err) { 
	            res.writeHead(500, {'Content-Type': 'text/plain'});
	            res.end('Error reading file.\n');
	            console.log(err);
	            return;
	        }           

	        try {	        	
	        	var parser = new(less.Parser)(options);

	        	parser.parse(less_data, function (err, tree) {
	        		if (err) handleLessError(err);
			    
			    	res.writeHead(200, {'Content-Type': 'text/css'});
			    	res.end(tree.toCSS({ compress: compress }));
				});
	        }
	        catch (err) {
	            return handleLessError(err);
	        }

	    });

	}).listen(port);

	console.log('Server running on port ' + port);
	
}