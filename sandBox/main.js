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
    
	//checking for the type of the add card request and setting the card number for the response
	if(accountType.trim().match(/LoyaltyCartwheel/) == "LoyaltyCartwheel"){
		cartwheelNumber = req.body.cartwheelNumber;
        cardNumber = cartwheelNumber.substr(cartwheelNumber.length - 4);
        console.log("cartwheel #: " + cartwheelNumber + " card #: " + cardNumber);
    }
    
    else if(accountType.trim().match(/LoyaltyTeamMember/) == "LoyaltyTeamMember"){
        teamMemberNumber = req.body.teamMemberNumber;
        cardNumber = teamMemberNumber.substr(teamMemberNumber.length - 4);
        console.log("teamMember #: " + teamMemberNumber + " card #: " + cardNumber);
    }
    
    else{
        return res.send(403, 'Invalid card type, expected LoyaltyCartwheel or LoyaltyTeamMember');
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
    
    var paymentToken = req.params.paymentToken;
    if(paymentToken.indexOf("null") !== "0"){
        console.log("not null");
    }
    
    else{
        console.log("null");
    }
    
	if(paymentToken !== null || paymentToken !== ""){
			
		if(paymentToken.trim().indexOf('4') > -1){

            //setting the status code for a successful response.
    		res.status(200);
    		
			res.json({
				"actionStatus": "8",
				"actionMessage": "Invalid Card"
			});
		}
		
		else if(paymentToken.trim().match(/1iCYYENDltJk/) == "1iCYYENDltJk"){
			
			//setting the status code for a successful response.
    		res.status(200);
			res.json({
				"actionStatus": "2",
				"actionMessage": "Not Success"
			});
		}
			
		else{
		    //setting the status code for a successful response.
    		res.status(200);
    		
    		//send the response body.
    		res.json({
    			"actionStatus": "1",
    			"actionMessage": "Success"
    		});
		}
	}
	
	else{
		return res.send(406, "Not Acceptable");
	}
    
});