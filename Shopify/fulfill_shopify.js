const axios = require('axios');
var FileSystem = require('fs');
const csv = require('csvtojson');
var sleep = require('sleep');

var orderID
var logID
var fulfillmentEndpoint = '/fulfillments.json'
var fulfillment
var logError = []
var logSuccess = []

const instance = axios.create({
  baseURL: 'https://d2078551b87b63f1ec7574d8c813a7da:f32b47b52c46e198158b9143ebd9ee95@staples-canada.myshopify.com/admin/api/2019-10/orders/',
  timeout: 5000,
  method: 'post'
});

csv({
  headers: ['LogID', 'ReferenceNumber', 'Payload'],
  output: "csv"
})
  .fromFile('Fulfillments.csv')
  .then((shopifyJSON) => {
    shopifyJSON.forEach(row => {
      logID = row[0]
      orderID = row[1]
      fulfillment = JSON.parse(row[2])
      sendFulfillment(logID, orderID, fulfillment)
      console.log(orderID + ' processed')
    });
  });

async function sendFulfillment(logID, orderID, fulfillment) {
  sleep.sleep(2);
  try {
    const response = await instance.post(orderID + fulfillmentEndpoint, {
      fulfillment
    })
    logSuccess = [logID, orderID, response.status, response.data.fulfillment.status, response.data.fulfillment.created_at]
    logs(logSuccess);
    console.log(response.data.fulfillment.status)
    console.log(logID + ' ' + orderID + ' oh yeah ' + response.status)
  } catch (error) {
    logError = [logID, orderID, error.message, error.response.data.errors.base[0]]
    logs(logError);
    console.error(error.response.data.errors.base[0])
    console.error(logID + ' ' + orderID + ' oh no ' + error.message)
  }
}

async function logs(log) {
  FileSystem.appendFile('./log_file.txt', log + '\n', (err) => {
    if (err) throw err;
  })
}