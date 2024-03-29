# AUDIENCE SECTION
-------------------------------------------------------------------------------------------------
# CREATING AN AUDIENCE
To create an audience, make a post request and make sure you include the user id.
There is no need to add an audience id as it is auto generated for each audience.

# Example.

METHOD: post
URL: localhost:5000/audience?userId=1
BODY: {
    "userId": "as844ladi303adg382k302",
    "description": "Educating users about the Aerospace field",
    "audienceName": "Aero space"
}

# RETRIEVING AN ARRAY OF ALL AUDIENCES
To retrieve data about all the available audience, make a get request with the user id alone.
There is no need for specifying an audience id.

# Example
METHOD: get
URL: localhost:5000/audience?userId=1

# RETRIEVING DATA OF ONE PARTICULAR AUDIENCE
To retrieve data about a particular audience, make a get request with a 
user id and the audience id.
specifying an audience id is a must.

# Example
METHOD: get
URL: localhost:5000/audience?userId=1&audienceId=abcdefghijklm

# DELETING A PARTICULAR AUDIENCE
To delete a particular audience, make a delete request using the user id and audience id.
If the audience does not exist, you'll be prompted with response. "This item does not exist."

# Example
METHOD: delete
URL: localhost:5000/audience?userId=1&audienceId=abcdefghijklm

# UPDATING A PARTICULAR AUDIENCE
To update particular information on an audience, ensure you use both the user id and their audience id.

If the audience does not exist, you'll be prompted with a response. "This audience does not exits."

# Example
METHOD: patch
URL: localhost:5000/audience?userId=1&audienceId=abcdefghijklm
BODY: {
    "userId": "as844ladi303adg382k302",
    "description": "Exploring the different galactic groups in our universe",
    "audienceName": "Galactic groupings"
}



# CAMPAIGN SECTION
-------------------------------------------------------------------------------------------------

# CREATING A CAMPAIGN
To create an audience, make a post request and make sure you include the user id.
There is no need to add an audience id as it is auto generated for each audience.

# Example.

METHOD: post
URL: localhost:5000/audience?userId=1
BODY: {
        "senderEmail": "riddicksmith37@gmail.com",
        "senderName": "Riddick Smith",
        "recipient": "cranelux.manuel@gmail.com",
        "subject": "Test Email",
        "body": "This is a test email",
        "dateSent": "2024-01-15T21:00:00.000Z",
        "timeSent": "19:23:00",
        "campaignType": "Marketing",
        "campaignGoal": "List Growth",
        "campaignStatus": "Draft",
        "userId": "1",
        "audienceId": "567eaf02-d124-4862-b877-e19b21a3c6f0"
    }

# RETRIEVING AN ARRAY OF CAMPAIGNS
----------------------------------
To retrieve data about all the available campaign, make a GET request with the user id alone.
There is no need for specifying an campaign id, but you must specify the page you're retrieving from the database using the json property page.

# Example
METHOD: get
URL: localhost:5000/campaign?userId=1
BODY: {
    "page": 1
}



# RETRIEVING A PARTICULAR CAMPAIGN
----------------------------------
To retrieve data of a particular campaign, make a GET request with a 
user id and the campaign id.

specifying the campaign id is a must. If the audience does not exist, you'll be prompted with the message "This Campaign does not exist"

# Example
METHOD: get
URL: localhost:5000/campaign?userId=1&audienceId=abcdefghijklm

# DELETING A PARTICULAR CAMPAIGN
To delete a particular Campaign, make a DELETE request using the user id and campaign id.
If the campaign does not exist, you'll be prompted with response. "This campaign does not exist."

# Example
METHOD: delete
URL: localhost:5000/campaign?userId=1&campaignId=abcdefghijklm


