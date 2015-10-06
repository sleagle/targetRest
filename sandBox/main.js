/**
 * Using SandBox API to mock the TargetRest Service
 * 
 */

 /*
  * this method mocks a addCard request
  */
Sandbox.define('/api/cards/v1/{paymentToken}','PUT', function(req, res) {
    
	//checking the request to see if it's in the proper format
    if (!req.is('application/json')) {
        return res.send(400, 'Invalid content type, expected application/json');
    }
    
    //getting the payment token from the request parameter
    var paymentToken = req.params.paymentToken;
       
    /* ************** getting the values from the request body ************** */
    
	var accountType = req.body.accountTypeURI;
    var networkType = req.body.networkTypeURI;
    var walletId = req.body.walletId;
    var customerId = req.body.customerId;
    var teamMemberNumber;
    var cartwheelNumber;
    
	// printing to the console for checking
    console.log("paymentToken: " + paymentToken);
    console.log("accountType: " + accountType);
    console.log("networkType: " + networkType);
    console.log("walletId: " + walletId);
    console.log("customerId: " + customerId);
    
    //card number for response
    var cardNumber;
    
	//checking for the type of the add card request
	if(accountType.trim().match(/LoyaltyCartwheel/) == "LoyaltyCartwheel"){
		cartwheelNumber = req.body.cartwheelNumber;
        cardNumber = cartwheelNumber.substr(cartwheelNumber.length - 4);
        console.log("cartwheel #: " + cartwheelNumber + " card #: " + cardNumber);
    }
    
    else{
        teamMemberNumber = req.body.teamMemberNumber;
        cardNumber = teamMemberNumber.substr(teamMemberNumber.length - 4);
        console.log("teamMember #: " + teamMemberNumber + " card #: " + cardNumber);
    }
    
    /* ************** generating the respond ************** */

	//setting the type of response, sets the Content-Type header.
    res.type('application/json');
	
    //setting the status code for a successful response.
    res.status(200);
    
    //response body for a cartwheel request
    if(cartwheelNumber !== undefined){
        res.json({
            "href": "http://targettest.getsandbox.com" + req.url,
            "accountTypeURI": accountType,
            "networkTypeURI": networkType,
            "walletId": walletId,
            "customerId": customerId,
            "cartwheelNumber": cardNumber,
            "paymentToken": paymentToken,
            "cardType": "60", 
            "actionStatus": "1", 
            "actionMessage": "Success"
        });
    }
    
    //response body for a teamMember request
    else{
        res.json({
            "href": "http://targettest.getsandbox.com" + req.url,
            "accountTypeURI": accountType,
            "networkTypeURI": networkType,
            "walletId": walletId,
            "customerId": customerId,
            "teamMemberNumber": cardNumber,
            "paymentToken": paymentToken,
            "cardType": "70", 
            "actionStatus": "1", 
            "actionMessage": "Success"
        });
    }
});

 /*
  * this method mocks a removeCard request
  */
Sandbox.define('/api/cards/v1/{paymentToken}','DELETE', function(req, res) {
	
    //checking the request to see if it's in the proper format
    if (!req.is('application/json')) {
        return res.send(400, 'Invalid content type, expected application/json');
    }
    
    //setting the type of response, sets the Content-Type header.
    res.type('application/json');
    
    //setting the status code for a successful response.
    res.status(200);
    
    //send the response body.
    res.json({
        "status": "ok",
		"actionStatus": "1",
		"actionMessage": "Success"
    });
});