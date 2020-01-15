var { Parser } =  require('json2csv');
const FileSystem = require('fs');
var logs 
var csv
 
const fields = [ 'Items.RequestIp.S', 'Items.Url.S', 'Items.Timestamp.N', 'Items.RequestOn.S', 'Items.RequestBody.S', 'Items.ResponseOn.S', 'Items.HttpCode.N','Items.ResponseBody.S' ];
const json2csvParser = new Parser({ fields, unwind: ['Items', 'Items.Process.L']});

logs = require('./output_fulfill.json');
csv = json2csvParser.parse(logs);

// //grab 429s, or broken entries
// //make an array
// //loop through array with a sleep
// //send it to the api
// //throttle that bitch

 FileSystem.writeFile('./output_fulfill.csv', csv, 'utf-16le',(err) => {
      if (err) throw err;
      console.log('The file has been saved!');
  });

  logs = require('./output_refund.json')
  csv = json2csvParser.parse(logs);

 FileSystem.writeFile('./output_refund.csv', csv, 'utf-16le',(err) => {
     if (err) throw err;
     console.log('The file has been saved!');
 });

logs = require('./output_return.json') 
csv = json2csvParser.parse(logs);

FileSystem.writeFile('./output_return.csv', csv, 'utf-16le',(err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});



