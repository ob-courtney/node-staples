# node-staples

# get_orders.js -> get order data from Shopify
* populate orders.csv with a single column of Shopify orderIds
* in the terminal, navigate to the folder containing both orders.csv and get_orders.js and run 'npm install'
* then, run 'node get_orders.js'
* the data is saved in shopify_output.csv
* data is always appended, so delete the data in the file before running again for a clean set of data.

# fulfill_shopify.js -> send fulfillments to Shopify
* populate fulfillments.csv with 3 columns. LogKey (orderid+sku) | ReferenceNumber (Shopify Order ID) | Payload (The fulfillment payload)
  * Payload Example: ```{"created_at":"12/31/201904:20:30PM","tracking_company":"Manual","tracking_numbers":[" "],"line_items":[{"id":"2614568255617","quantity":"31"}],"updated_at":"12/31/201904:20:30PM","notify_customer":true,"location_id":"16084140101"}```
* in the terminal, navigate to the folder containing both fulfillments.csv and fulfill_shopify.js and run 'npm install'
* then, run 'node fulfill_shopify.js'
* log data is saved in log_file.txt
* it is recommended to download the updated status of the orders using get_orders.js to verify if the fulfillment was successful.

# Parse_AWSLogs.js -> converts a JSON dynamo db export to CSV for easier reading and excel manipulation.
* save the AWS log file in the same folder as Parse_AWSLogs.js  
  * ensure they are named accordingly. Fulfillments -> output_fulfill.json, Refunds -> output_refund.json, Returns -> output_return.json
* in the terminal, navigate to the folder containing both log outputs and Parse_AWSLogs.js and run 'npm install'
* then, run 'node Parse_AWSLogs.js'
