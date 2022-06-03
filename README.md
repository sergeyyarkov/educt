[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

_All necessary services are started from this repository._

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Description](#description)
- [Technologies Stack](#technologies-stack)
- [Features](#features)
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
- Editing your profile personal data (password, mail, contacts)
- Deployment with Docker
- Adaptive design
- Night/Light theme

<!-- ## Demo

---

You can see the demo application [here](#). -->

<!-- ## Installation

--- -->

## Requirements

- NodeJS v14+
- Docker
- Git

## License

Educt is under the [MIT License](https://github.com/sergeyyarkov/educt/blob/main/LICENSE)
