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
2. run `DOMAIN_NAME=example.com yarn deploy`

#### Custom domain

To setup a custom domain:
1. Register a domain - e.g. `example.com`
2. Create a new Route53 Hosted zone for the domain in the AWS dashboard
3. Create a new ACM certificate for the domain in the AWS dashboard
4. run `DOMAIN_NAME=example.com yarn deploy:domain`
5. Wait for the API Gateway certificate to provision (it can take up to 40 minutes).

[Serverless framework]: https://serverless.com
