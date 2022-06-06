[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

_All necessary services are started from this repository._

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Description](#description)
- [Technologies Stack](#technologies-stack)
- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Environment variables](#environment-variables)
- [Requirements](#requirements)
- [License](#license)

## Description

Educt learning management system (LMS) is an application where you can create and edit your courses by uploading each video lesson. You can also register your students and give them access to specific courses. With the help of the role system, you can assign your teachers so that they can also edit or create new courses. There are only three roles in the system, these are _STUDENT_, _TEACHER_ and _ADMINISTRATOR_. Your students can also correspond with you via online chat. To install the application on your server, take a look at the [installation](#Installation) chapter.

## Technologies Stack

- Backend (AdonisJS)
- Frontend (ReactJS)
- ChakraUI (React component library)
- Database (PostgreSQL & Redis)
- Web server (nginx)
- Socket.IO for chat
- Deployment tool (Docker)

## Features

- Сourse and lesson management
- Role-based access control
- Sorting courses by category
- Cloud (Amazon AWS) or local storage for lesson materials
- User Authentication
- Chat between users
- User management
- Editing your profile personal data (password, e-mail, contacts)
- Changing e-mail with verification code
- Deployment with Docker
- Adaptive design
- Night/Light theme

<!-- ## Demo

---

You can see the demo application [here](#). -->

## Screenshots

You can see the screenshots of the application in [this](./resources//screenshots/README.md) folder.

## Installation

1. Download the project from the git repository

```bash
git clone --recursive https://github.com/sergeyyarkov/educt.git
```

2. Configure your environment variables in `docker-compose.yml` file in `client` and `api` services. See the [environment variables](#environment-variables) chapter.
3. Write your domain name to `default.conf` file in `nginx` folder instead of localhost.
4. Build application:

```bash
make build
```

5. Start the application and run migrations

```bash
make up
make migrate
```

6. Seed database with some data

```bash
make seed
```

Now the application is completely ready to work. Go to the http://localhost to check if it works. Log in as an administrator.

```text
login: admin
password: 123456
```

Then you can change your password in your personal profile.

## Environment variables

Here are the environment variables you may need to set.

- _🔴 - required_
- _🟡 - optional_

#### 🔴 **API_URL**

Link to the API server for authentication, obtaining the necessary data and interacting with the system.

_Example:_

```text
API_URL=http://api.educt.edu
```

---

#### 🔴 **WS_URL**

Link to the WebSocket server. Used for chat functionality

_Example:_

```text
WS_URL=ws://api.educt.edu
```

---

#### 🔴 **APP_KEY**

App key is a randomly generated 16 or 32 characters long string required to encrypted cookies, sessions and other sensitive data.

_Example:_

```text
APP_KEY=IP387l45rlNO3t7Qgjd89qr-a2G4oUgz
```

---

#### 🔴 **PG_HOST**

#### 🔴 **PG_USER**

#### 🔴 **PG_PASSWORD**

#### 🔴 **PG_DB_NAME**

This envs required to connect to the database.

_Example:_

```text
PG_HOST=postgres
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=1234
PG_DB_NAME=educt
```

---

#### 🔴 **REDIS_HOST**

#### 🔴 **REDIS_PORT**

#### 🔴 **REDIS_PASSWORD**

The Redis server connection is used to store sessions, conversations, chat history, and more.

_Example:_

```text
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=
```

---

#### 🔴 **MAILER**

You can choose which mail transfer service to use. Available values: `mailgun` or `smtp`.

_Example:_

```text
MAILER=smtp
```

---

#### 🟡 **SMTP_HOST**

#### 🟡 **SMTP_PORT**

#### 🟡 **SMTP_USERNAME**

#### 🟡 **SMTP_PASSWORD**

SMTP credentials and configuration the server should use to send emails. If you do not want to use SMTP, then do not change the fields and leave them as default

_Example:_

```text
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=example@gmail.com
SMTP_PASSWORD=1234
```

---

#### 🟡 **MAILGUN_API_KEY**

#### 🟡 **MAILGUN_DOMAIN**

Mailgun is a service that will allow you to send messages. If you do not want to use Mailgun, then do not change the fields and leave them as default

_Example:_

```text
MAILGUN_API_KEY=115hd9db10cd10ed682edc01b887efd8-156db0f1-4yd8hd99
MAILGUN_DOMAIN=sandbox2717ddf9j8ab6666a508dbb2c0045acb.mailgun.org
```

---

#### 🔴 **DRIVE_DISK**

Choose where you want to store content for your courses. (video, attached materials, pictures). Available values: `local` or `s3` (Amazon AWS).

_Example:_

```text
DRIVE_DISK=local
```

---

#### 🟡 **S3_KEY**

#### 🟡 **S3_SECRET**

#### 🟡 **S3_BUCKET**

#### 🟡 **S3_REGION**

Enter data to connect to Amazon AWS cloud storage. If you do not want to use Amazon AWS, then do not change the fields and leave them as default

_Example:_

```text
S3_KEY=CJIB4ASE6I9IKSGV7KHI
S3_SECRET=2vHfGE+TBMqVKxkjBohBqGwWcE01SclXf5YJIXbs
S3_BUCKET=example
S3_REGION=eu-central-1
```

---

## Requirements

- NodeJS v14+
- Docker
- Git

## License

Educt is under the [MIT License](https://github.com/sergeyyarkov/educt/blob/main/LICENSE)
