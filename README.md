# 25 Days of Serverless

[Microsoft's 25 Days of Serverless Challenge](https://github.com/microsoft/25-days-of-serverless) but with Google Cloud Functions

API Documentation https://us-central1-fsuptutorial.cloudfunctions.net/api/api-docs/

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