/*
	Helper to get info from an image file

	Usage:
	$.when(ImageInfo("file.png")).then
	(
		function(e)
		{
			console.debug("Image is " + e.height + "px by " + e.width + "px");
		},
		function(err)
		{
			throw("FATAL: Could not load image");
		}
	);

	Kris McCann, 2013
*/
var ImageInfo = function(path, $)
{
	// allow for passed in jQuery object, default to jQuery if not passed
	$ = $ || jQuery;
	// set up promise
	var deferred = $.Deferred();
	// create image object
	var image = new Image();
	// and wait for it to either load or fail
	$(image).bind
	(
		"load error",
		function(e)
		{
			// we came back with an error
			if(e.type == "error")
			{
				// reject and pass the error along
				deferred.reject(e);
			}
			else
			{
				// yay, pass back the image
				deferred.resolve(e.target);
			}
		}
	);
	// set source
	image.src = path;
	// return promise
	return deferred;
};