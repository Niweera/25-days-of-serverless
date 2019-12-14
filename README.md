# 25 Days of Serverless

[Microsoft's 25 Days of Serverless Challenge](https://github.com/microsoft/25-days-of-serverless) but with Google Cloud Functions

API Documentation https://us-central1-fsuptutorial.cloudfunctions.net/api/api-docs/

## Table of Contents

- ⭐️[Wk 1 : Challenge 1 : Spin up a Serverless Dreidel ](#challenge-one)
- ⭐️[Wk 1 : Challenge 2 : Lucy's Dilemma](#challenge-two)
- ⭐️[Wk 1 : Challenge 3 : Secret Santa's Gifts](#challenge-three)
- ⭐️[Wk 1 : Challenge 4 : Ezra's Potluck](#challenge-four)
- ⭐️[Wk 1 : Challenge 5 : Naughty or Nice](#challenge-five)
- ⭐️[Wk 1 : Challenge 6 : Durable Pattern](#challenge-six)
- ⭐️[Wk 1 : Challenge 7 : API Endpoint - Picture Challenge](#challenge-seven)
- ⭐️[Wk 2 : Challenge 8 : Build an Incident Status Page](#challenge-eight)
- ⭐️[Wk 2 : Challenge 9 : Automate Your GitHub Issues with Holiday Magic](#challenge-nine)
- ⭐️[Wk 2 : Challenge 10 : Timer Trigger](#challenge-ten)
- ⭐️[Wk 2 : Challenge 11 : Database Trigger](#challenge-eleven)

## Challenge One

### Paths

| Location  | Endpoint                                                   |
| :-------- | :--------------------------------------------------------- |
| Root path | `https://us-central1-fsuptutorial.cloudfunctions.net/api/` |

### HTTP request and query methods

| Method | Endpoint | Description            | Examples                                                             |
| :----- | :------- | :--------------------- | :------------------------------------------------------------------- |
| `GET`  | `/one`   | Get the random letter. | [`one`](https://us-central1-fsuptutorial.cloudfunctions.net/api/one) |

```json
{
  "letter": "ש"
}
```

## Challenge Two:

**Prerequisites**

1. [PushBullet](https://www.pushbullet.com) API KEY (To send push messages)
2. Firebase Blaze Plan (To use Google Cloud Pub/Sub)

#### PoC

![image](/img/1.jpg)
![image](/img/2.jpg)
![image](/img/3.jpg)
![image](/img/4.jpg)
![image](/img/5.jpg)
![image](/img/6.jpg)
![image](/img/7.jpg)
![image](/img/8.jpg)

## Challenge Three

**Prerequisites**

1. Firebase Blaze Plan

#### PoC

![image](/img/challenge_3.jpg)

## Challenge Four

API EndPoints are secured with Firebase Authentication.

### PoC

### Paths

| Location  | Endpoint                                                       |
| :-------- | :------------------------------------------------------------- |
| Root path | `https://us-central1-fsuptutorial.cloudfunctions.net/api/four` |

### HTTP request and query methods

| Method   | Endpoint    | Access  | Description                              | Examples                                                                                                                                         |
| :------- | :---------- | :------ | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST`   | `/register` | Public  | Register the user in the database.       | [`https://us-central1-fsuptutorial.cloudfunctions.net/api/four/register`](https://us-central1-fsuptutorial.cloudfunctions.net/api/four/register) |
| `POST`   | `/login`    | Public  | User login.                              | [`https://us-central1-fsuptutorial.cloudfunctions.net/api/four/login`](https://us-central1-fsuptutorial.cloudfunctions.net/api/four/login)       |
| `POST`   | `/add`      | Private | Create food items in the database.       | [`https://us-central1-fsuptutorial.cloudfunctions.net/api/four/add`](https://us-central1-fsuptutorial.cloudfunctions.net/api/four/add)           |
| `GET`    | `/list`     | Private | List the food items in the database.     | [`https://us-central1-fsuptutorial.cloudfunctions.net/api/four/list`](https://us-central1-fsuptutorial.cloudfunctions.net/api/four/list)         |
| `PATCH`  | `/change`   | Private | Update the food items in the database.   | [`https://us-central1-fsuptutorial.cloudfunctions.net/api/four/change`](https://us-central1-fsuptutorial.cloudfunctions.net/api/four/change)     |
| `DELETE` | `/remove`   | Private | Delete the food items from the database. | [`https://us-central1-fsuptutorial.cloudfunctions.net/api/four/remove`](https://us-central1-fsuptutorial.cloudfunctions.net/api/four/remove)     |

Database

![image](/img/challenge_4_1.jpg)

**Register**

Send a POST request:

`Request Body Payload`

```json
{
  "email": "EMAIL",
  "password": "PASSWORD",
  "returnSecureToken": true
}
```

`Response Payload`

```json
{
  "idToken": "ID_TOKEN",
  "email": "EMAIL",
  "refreshToken": "REFRESH_TOKEN",
  "expiresIn": "EXPIRES_IN_TIME",
  "localId": "LOCAL_ID"
}
```

**Login**

Send a POST request:

`Request Body Payload`

```json
{
  "email": "EMAIL",
  "password": "PASSWORD",
  "returnSecureToken": true
}
```

`Response Payload`

```json
{
  "idToken": "ID_TOKEN",
  "email": "EMAIL",
  "refreshToken": "REFRESH_TOKEN",
  "expiresIn": "EXPIRES_IN_TIME",
  "localId": "LOCAL_ID",
  "registered": true
}
```

**Create a Food Item**

Send a POST request:

`Request Header`

```http request
Authorization: Bearer ID_TOKEN
```

`Request Body Payload`

```json
{
  "dish_name": "DISH_NAME",
  "type": "TYPE",
  "amount": "AMOUNT"
}
```

`Response Payload`

```json
{
  "message": "successfully added",
  "documentID": "DOCUMENT_ID"
}
```

**List Food Items**

Send a GET request:

`Request Header`

```http request
Authorization: Bearer ID_TOKEN
```

`Response Payload`

```json
{
  "food_item_count": 1,
  "data": [
    {
      "email": "w.nipuna@gmail.com",
      "amount": "2 Kg",
      "type": "Dessert",
      "uid": "Ua6FZqUXaNNEtLnSfLjmKVIoeaR2",
      "dish_name": "Kokis"
    }
  ]
}
```

**Update a Food Item**

Send a PATCH request:

`Request Header`

```http request
Authorization: Bearer ID_TOKEN
```

`Request Body Payload`

```json
{
  "dish_name": "DISH_NAME",
  "type": "TYPE",
  "amount": "AMOUNT",
  "document_id": "DOCUMENT_ID"
}
```

`Response Payload`

```json
{
  "message": "Update successful"
}
```

**Delete a Food Item**

Send a DELETE request:

`Request Header`

```http request
Authorization: Bearer ID_TOKEN
```

`Request Body Payload`

```json
{
  "document_id": "DOCUMENT_ID"
}
```

`Response Payload`

```json
{
  "message": "Remove successful"
}
```

## Challenge Five

Uses Cloud Natural Language API and Cloud Translation API

**Prerequisites**

1. Google Billing Account

### PoC

`Request Body Payload`

```json
{
  "who": "Adam",
  "message": "my little brother is so annoying and stupid"
}
```

`Response Payload`

```json
{
  "who": "Adam",
  "message": "my little brother is so annoying and stupid",
  "translation": "my little brother is so annoying and stupid",
  "detected_language": "en",
  "sentiment_magnitude": 0.800000011920929,
  "sentiment_score": -0.800000011920929,
  "naughty_or_nice": "Naughty"
}
```

`Request Body Payload`

```json
{
  "who": "Adam",
  "message": "I really like the bike I got for a present"
}
```

`Response Payload`

```json
{
  "who": "Adam",
  "message": "I really like the bike I got for a present",
  "translation": "I really like the bike I got for a present",
  "detected_language": "en",
  "sentiment_magnitude": 0.6000000238418579,
  "sentiment_score": 0.6000000238418579,
  "naughty_or_nice": "Nice"
}
```

`Request Body Payload`

```json
{
  "who": "Eva",
  "message": "Eu odeio limpar meu quarto"
}
```

`Response Payload`

```json
{
  "who": "Eva",
  "message": "Eu odeio limpar meu quarto",
  "translation": "I hate cleaning my room",
  "detected_language": "pt",
  "sentiment_magnitude": 0.6000000238418579,
  "sentiment_score": -0.6000000238418579,
  "naughty_or_nice": "Naughty"
}
```

`Request Body Payload`

```json
{
  "who": "tracy",
  "message": "爸爸和圣诞老人​​很相似"
}
```

`Response Payload`

```json
{
  "who": "tracy",
  "message": "爸爸和圣诞老人​​很相似",
  "translation": "Dad and Santa are very similar",
  "detected_language": "zh-CN",
  "sentiment_magnitude": 0.10000000149011612,
  "sentiment_score": 0.10000000149011612,
  "naughty_or_nice": "Nice"
}
```

## Challenge Six

Uses Cloud Scheduler API

**Prerequisites**

1. Google Billing Account
2. Slack Workspace

### PoC

![image](/img/challenge_six.jpg)

## Challenge Seven

Uses UNSPLASH Picture API with `unsplash-js`

**Prerequisites**

1. Google Billing Account
2. UNSPLASH Account

### PoC

`Request Body Payload`

```json
{
  "query": "gifts"
}
```

`Response Payload`

```json
{
  "imageURLs": [
    "https://images.unsplash.com/photo-1511885912508-36118d773e55?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwNjI0Mn0",
    "https://images.unsplash.com/photo-1544654187-454deb2b423e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwNjI0Mn0",
    "https://images.unsplash.com/photo-1511895307821-692dc4ad27c5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwNjI0Mn0",
    "https://images.unsplash.com/photo-1448832945950-bc85f82891bd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwNjI0Mn0",
    "https://images.unsplash.com/photo-1528029320621-f02197f47774?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwNjI0Mn0",
    "https://images.unsplash.com/photo-1461092678334-1aa3ab3543ce?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwNjI0Mn0",
    "https://images.unsplash.com/photo-1546813647-30583402ddd7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwNjI0Mn0",
    "https://images.unsplash.com/photo-1544362724-a403d8211f89?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwNjI0Mn0",
    "https://images.unsplash.com/photo-1511953669874-6c617b315332?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwNjI0Mn0",
    "https://images.unsplash.com/photo-1573853019548-c38efdbc2f09?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwNjI0Mn0"
  ]
}
```

## Challenge Eight

Uses ReactJS, Google Cloud Firestore for Client UI (with realtime data updates) and Google Firebase Functions (Uses Firebase Auth for API PATCH requests)

### PoC

**Update Delivery System Status**

Send a PATCH request:

`Request Header`

```http request
Authorization: Bearer ID_TOKEN
```

`Request Body Payload`

```json
{
  "status": "STATUS"
}
```

`Response Payload`

```json
{
  "message": "Update successful"
}
```

**Update ReinDeer Guidance System Status**

Send a PATCH request:

`Request Header`

```http request
Authorization: Bearer ID_TOKEN
```

`Request Body Payload`

```json
{
  "status": "STATUS"
}
```

`Response Payload`

```json
{
  "message": "Update successful"
}
```

Client UI

![image](http://g.recordit.co/zAd2UR8kan.gif)

## Challenge Nine

Uses `octokit/rest.js` and Google Cloud Functions for Firebase

### PoC

![image](/img/challenge_9.jpg)

## Challenge Ten

Still waiting for [Twitter](https://twitter.com) to review my [Twitter](https://twitter.com) developer account application.

## Challenge Eleven

Uses Google Cloud Firestore and Algolia for full text search support

### PoC

**Send a request**

```http request
POST /add
```

`Request Body Payload`

```json
{
  "description": "I want a Tesla",
  "name": "Nipuna Weerasekara",
  "address": "Bad Route Rd, Terry, Mt 59349",
  "type": "Car"
}
```

`Response Payload`

```json
{
  "message": "successfully added",
  "documentID": "DOCUMENT_ID"
}
```

**Get all requests by Santa**

```http request
GET /list
```

`Response Payload`

```json
{
  "requests_count": 2,
  "data": [
    {
      "description": "I want a Tesla",
      "name": "Nipuna Weerasekara",
      "address": "Bad Route Rd, Terry, Mt 59349",
      "type": "Car"
    },
    {
      "description": "I want a Baby Yoda action figure",
      "name": "The Mandalorian",
      "address": "234, Millennium Falcon",
      "type": "Toy"
    }
  ]
}
```

**Query a specific request by a keyword**

```http request
GET /find/:query | /find/car
```

`Response Payload`

```json
{
  "hits_count": 1,
  "data": [
    {
      "description": "I want a Tesla",
      "name": "Nipuna Weerasekara",
      "address": "Bad Route Rd, Terry, Mt 59349",
      "type": "Car"
    }
  ]
}
```
