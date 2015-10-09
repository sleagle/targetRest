Documentation
====================

To use the Sandbox mock service using the sandbox url:-

    1) open up a Rest Client like Postman
    2) URL should be: http://targetrest.getsandbox.com
    3) path should be: /api/cards/v1/{token}
    4) to mock addCard, request type should be PUT
    5) to mock removeCard, request type should be DELETE
    6) for the addCard request the body type should be: application/json
    
    Final url should be like 'http://targetrest.getsandbox.com/api/cards/v1/123456'
    

To use the Sandbox mock service locally:-
    
    1) build the sandbox-master project using Gradle 
    2) make the jar file using Gradle (use command: 'gradle shadowJar')
    3) run the jar file: 'Java -jar sandbox-master-1.0-all.jar --port=8080 run'
    4) could use Postman Rest Client
    5) URL should be: http://localhost:8080/api/cards/v1/{token}