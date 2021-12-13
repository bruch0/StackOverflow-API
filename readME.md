# StackOverflow API

## Documentation 🧾

### Create your user

```
POST /users
```

#### Possible response status

```bash
- 400: You have sent a invalid body, check your params
- 200: Success
```

#### What you will receive from this route

```jsx
[
  {
    token: uuid,
  },
];
```

---

### Create a question

```
POST /questions
```

#### Expected body

```jsx
{
  question: String, at least 10 characters, maximum 220 characters
  userToken: String, is the token given on creating a user
  tags: String, at least 2 characters, maximum 220 characters
}
```

#### Possible response status

```bash
- 400: You have sent a invalid body, check your params
- 401: You have not sent your token or your token is invalid
- 404: The user was not found
- 200: Success
```

#### What you will receive from this route

```jsx
[
  {
    id: questionId,
  },
];
```

---

### Answer a question

```
POST /questions/:questionId
```

#### Expected body

```jsx
{
  answer: String, at least 10 characters, maximum 220 characters
}
```

#### Possible response status

```bash
- 400: You have sent a invalid body, check your params
- 401: You have not sent your token or your token is invalid
- 403: The question is already answered
- 404: The question was not found
- 200: Success
```

---

### Get a question

```
GET /questions/questionId
```

#### Possible response status

```bash
- 400: Invalid id
- 404: Question not found
- 200: Success
```

#### What you will receive from this route

```jsx
{
  "question": question,
  "student": studentName,
  "class": studentClass
  "tags": tags,
  "answered": Boolean,
  "submitAt": submitionDate,
  ...
  "answeredAt": answerDate,
  "answeredBy": answerUserName,
  "asnwer": asnwer,
}
```

---

### Get all unanswered questions

```
GET /questions
```

#### What you will receive from this route

```jsx
[
  {
    "question": question,
    "student": studentName,
    "class": studentClass
    "tags": tags,
    "answered": Boolean,
    "submitAt": submitionDate,
  },
]
```

---

### Upvote a question

```
PUT /questions/:questionId/up-vote
```

#### Possible response status

```bash
- 404: Question not found
- 200: Success
```

---

### Down a question

```
PUT /questions/:questionId/down-vote
```

#### Possible response status

```bash
- 404: Question not found
- 200: Success
```

---

### Get the top 10 users on the ranking

```
GET /ranking
```

#### What you will receive from this route

```jsx
[
  {
    name: username,
    answers: totalUserAnswers,
    points: totalUserPoints,
  },
];
```

## How to run in your machine 🖥️

```
git clone https://github.com/bruch0/StackOverflow-API.git
```

```
cd StackOverflow-API
```

```
npm i --force
```

Create a .env.dev file and fill it using your environment variables following <a href="https://github.com/bruch0/StackOverflow-API/blob/main/.env.example">this example</a>

### In your terminal

```
sudo su postgres
```

```
psql
```

```
CREATE DATABASE stack
```

```
\c stack
```

Copy everything in the <a href="https://github.com/bruch0/StackOverflow-API/blob/main/dump.sql">dump.sql</a> file and paste on the terminal</br>
You can not exit the postgres admin, and run

```
npm start
```

</br>

### Contact

<div align="center">
  
  [![Gmail Badge](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:lucas.bruch0@gmail.com)
  [![Linkedin Badge](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lucas-bruch/)
  
</div>
