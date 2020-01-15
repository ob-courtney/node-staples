const axios = require('axios');
var FileSystem = require('fs');
const csv = require('csvtojson');
var sleep = require('sleep');
var { Parser } = require('json2csv');

var ids = '1228898664577'
var counter = 0

csv({
    noheader: true,
    output: "line"
})
    .fromFile('orders.csv')
    .then((orderIds) => {
        orderIds.forEach(order => {
            ids = ids + ',' + order
            counter++;
            if(counter == 249){
                getOrders(ids)
                ids = '1228898664577';
                counter = 0;
            }
        })
        getOrders(ids)
    })

function getOrders(orders) {
    axios.get('https://d2078551b87b63f1ec7574d8c813a7da:f32b47b52c46e198158b9143ebd9ee95@staples-canada.myshopify.com/admin/api/2019-10/orders.json', {
        params: {
            status: 'any',
            limit: 250,
            ids: orders
        }
    })
        .then(function (response) {
            saveOrders(response.data)
            console.log(response.request.path)
        })
        .catch(function (error) {
            console.log(error.response);
        })
}


function saveOrders(json) {
    var fields = ['orders.id', 'orders.name', 'orders.line_items.id', 'orders.fulfillment_status', 'orders.line_items.sku', 'orders.line_items.quantity', 'orders.line_items.fulfillment_status', 'orders.line_items.fulfillable_quantity'];
    var json2csvParser = new Parser({ fields, unwind: ['orders', 'orders.line_items'] });
    var csv = json2csvParser.parse(json);

    FileSystem.appendFileSync('./shopify_output.csv', csv, 'utf-8');

}