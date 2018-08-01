var request = require('request');
var keys = require('./keys')



var requestId = ["647", "648", "649"]
// Get API keys
var userId = keys.getuserID()
var privateKey = keys.getprivateKey()

// Abort if any of these weren't provided
if (!requestId) {
    console.log('Request ID not provided.');
    return;
}
if (!userId) {
    console.log('User ID not provided.');
    return;
}
if (!privateKey) {
    console.log('Private key not provided.');
    return;
}
// Proxy if needed
var proxyUrl = "http://webdefence.global.blackspider.com:8081"
var proxiedRequest = request.defaults({ 'proxy': proxyUrl })


proxiedRequest.post(
    // Authenthicate API keys
    'https://uk.api.microedge.com/auth/token/me-auth',
    { json: { userId: userId, privateKey: privateKey } },
    function (error, response, body) {
        console.log(body)
        // Status code 200 = OK (success) and we are authenthicated
        if (!error && response.statusCode == 200 && body.authenticated) {
            console.log("authenticated")
            // JSON web token obtained
            var token = body.token;
            var options = {
                // End point - change for contact, request, etc
                url: 'https://uk.api.microedge.com/goapi/request/getRequestsById ',
                method: 'POST',
                // Prove you authenthication with your received token
                headers: { 'Authorization': 'bearer ' + token },
                json: true,
                // Send over which request ID you require
                body: { ids: requestId }
            };

            // use the auth JWT to call the request endpoint
            proxiedRequest(options, function (requestError, requestResponse, requestBody) {
                // If successful
                console.log(requestResponse.statusCode)
                if (requestResponse.statusCode == 200) {
                    var requests = requestResponse.body.requests;
                    //console.log(JSON.stringify(request.customFields))
                    console.log(requests)
                    // Get contact object
                    console.log("Correct 200")
        
                    for (i = 0; i < requests.length; i++) {
                        var request = requests[i]
                        console.log("Request " + i)
                        if (request) {
                            console.log('ID: ' + request.id)
                            console.log('Reference No of Request: ' + request.referenceNumber);
                            console.log('Type of Request: ' + request.type.description)
                            // Caps matters! case sensitive
                            console.log('Request Amount: ' + request.requestAmount)
                            console.log('Request Disposition: ' + request.disposition)
                            console.log('Disposition Date: ' + request.dispositionDate)
                            console.log('Disposition Date: '  + request.dispositionDate.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$3-$2-$1'))
                            console.log('----------------------------------------------')
                        } else {
                            console.log('Request not found');
                        }  

                    }
                   
                } else {
                    console.log('There was an error retrieving the request:');

                    //console.log(requestResponse);
                }
            });
        }
    }
);

