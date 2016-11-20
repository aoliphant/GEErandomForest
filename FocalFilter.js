//Map.addLayer(image, {palette:['00ff00','ff0000'], min:1, max:2, opacity:0.3}, 'JapanNSkorea');
//throw('stop')


//Run focal filter (smoother)
var focalCircle = image.focal_mode(35,'circle','meters',2);

//Export Smoothed Map
var jsonCoordString = testArea.toGeoJSON();
Export.image(focalCircle, 'pNG_Solom_603_120day_9bGCE_median_35_2', {
 scale: 30, 
 region: jsonCoordString, 
 maxPixels:9990000000000
 });
