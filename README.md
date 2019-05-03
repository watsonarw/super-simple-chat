# super-simple-chat
A super simple chatroom API, built using serverless.com framework

This API was built for use in a workshop. It is a super simple, unauthenticated API for sending and retrieving messages.

## Usage

Available endpoints:

- `GET /v1/messages`
  Returns a list of messages in the following format:
  ```json
  {
    "messages": [
      {
        "id": "uuid",
        "timestamp": "unix timestamp",
        "user": "string",
        "message": "string"
      }
    ],
    "count": "number"
  }
  ```

- `GET /v1/messages/:id`
  Returns a single message by id
  ```json
  {
    "id": "uuid",
    "timestamp": "unix timestamp",
    "user": "string",
    "message": "string"
  }
  ```

- `POST /v1/messages`
  Creates a new message.
  Expected payload:
  ```json
  {
    "message": "string",
    "user": "string"
  }
  ```

  Required headers:
  - `Content-Type: application/json`

  Response:
  ```json
  {
    "id": "uuid",
    "timestamp": "unix timestamp",
    "user": "string",
    "message": "string"
  }
  ```

## Development

This API is deployed using [Serverless framework], and [serverless-http]

You will need:
- Node
- An AWS account

### Deployment

1. Setup credentials for the aws account you want to deploy to
2. run `yarn deploy`


[Serverless framework]: https://serverless.com
