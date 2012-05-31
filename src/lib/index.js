var http    = require('http'),
    less    = require('less'),
    fs      = require('fs'),
    url     = require('url'),
    path    = require('path');

module.exports = function(path_to_less,port) {

	http.createServer(function (req, res) {
	    
	    var uri = url.parse(req.url);

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
	            less.render(less_data, function (e, css) {

	                if (e) return handleLessError(e);

	                res.writeHead(200, {'Content-Type': 'text/css'});
	                res.end(css);
	            });
	        }
	        catch (e) {
	            return handleLessError(e);
	        }

	    });

	}).listen(port);

	console.log('Server running on port ' + port);
	
}