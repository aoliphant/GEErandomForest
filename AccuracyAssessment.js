var testImage = image2;

//Accuracy code from AccuracyAssessment720b file

Map.addLayer(image, {palette:['00f000','ffffff'], min:1, max:2, opacity:0.2}, '1026');
Map.addLayer(image2, {palette:['00ff00','ffffff'], min:1, max:2, opacity:0.2}, '0702');
//throw('stop')

//var testImage = image8;
print(testImage);

//Map.addLayer(testImage, {palette:['00ff00','ff0000'], min:1, max:2, opacity:0.2}, 'TestArea');

var referenceData2 = ee.FeatureCollection('ft:1BOil563RscLtaGeedonvJ15O9hfASuwQyXuRV4j_');

referenceData2 = referenceData2.filterBounds(testImage.geometry());
/*
print(referenceData2.size());
print(referenceData2);
*/

//Display testimage

//var testImage = ee.Image(2).clip(testArea);
//Map.addLayer(image, {palette:['00ff00','ff0000'], min:1, max:2, opacity:0.3}, 'testImage');

// create confusion matrix

var Matrix2 = testImage.reduceRegions({
  collection: referenceData2.map(function(f) {return f.set('class', ee.Number.parse(f.get('class')).int())}),
  reducer: ee.Reducer.first(),
  scale: 30,
  });
  
print(Matrix2.limit(10));

var confusionMatrix2 = Matrix2.errorMatrix('class', 'first');
//var confusionMatrix2 = ee.ConfusionMatrix(Matrix2);

// /*  
// var confusionMatrix2 = testImage.sampleRegions({
//   collection: referenceData2,
//   //collection: referenceData.limit(100), 
//   // properties: ['landcover_actual'],
//   scale: 30
//   });//.errorMatrix('landcover_actual', 'b1');
// */

// // outputs
// print('Confusion Matrix2', confusionMatrix2.array());


// outputs
print('Confusion Matrix', confusionMatrix2);
print('Accuracy', confusionMatrix2.accuracy());
print('Consumers Accuracy', confusionMatrix2.consumersAccuracy());
print('Producers Accuracy', confusionMatrix2.producersAccuracy());
print('Kappa', confusionMatrix2.kappa());

