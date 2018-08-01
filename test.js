var request = require('request');
var keys = require('./keys')



var contactId = "149"
// Get API keys
var userId = keys.getuserID()
var privateKey = keys.getprivateKey()

// Abort if any of these weren't provided
if (!contactId) {
    console.log('Contact ID not provided.');
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
var proxiedRequest = request.defaults({'proxy':proxyUrl})


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
                url: 'https://uk.api.microedge.com/goapi/contact/getContact',
                method: 'POST',
                // Prove you authenthication with your received token
                headers: { 'Authorization': 'bearer ' + token },
                json: true,
                // Send over which contact ID you require
                body: { id: contactId }
            };
    
            // use the auth JWT to call the contact endpoint
            proxiedRequest(options, function (contactError, contactResponse, contactBody) {
                // If successful
                if (contactResponse.statusCode == 200) { 
                    var contact = contactResponse.body.contact;
                    console.log(JSON.stringify(contact.customFields))
                    console.log(contact.email)
                    // Get contact object
                    console.log("Correct 200")
                    if (contact) {
                        console.log('Name of contact: ' + contact.firstName + ' ' + contact.lastName);
                    } else {
                        console.log('Contact not found');
                    }
                } else {
                    console.log('There was an error retrieving the contact:');
                    console.log(contactResponse);
                }
            });
        }
    }
);
