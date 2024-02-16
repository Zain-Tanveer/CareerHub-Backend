# CareerHub - Backend

CareerHub is the name of my final year university project. It is a job portal for students that provides various functionalities such as job recommendation, quizzing etc. The jobs displayed were scrapped in real time using BeautifulSoup4 library in python. Its frontend is written in [Angular][angular], backend in [NodeJS][nodejs] using [ExpressJS][express]
framework.

My contribution in my FYP was implementing frontend using [Angular][angular] and writing scraping code using [BeautifulSoup4][beautifulsoup] in python (Can be found at [Scrapers][scrapers]). So during my internship I decided to create the backend as well.

**NOTE**: **This does not contain every single API used in the FYP.**

## Installation

CareerHub - Backend requires the latest [Node.js](https://nodejs.org/) version to run.
My version at the time of developing this app is v20.11.0.

Install the dependencies and devDependencies and start the server.

```sh
npm i
npm run dev
```

**NOTE**: You need to rename the example.env file to .env and populate it with your own personal information.
Only the `JWT_SECRET` and `MONGO_URI` need to be populated.

## Routes

These are all the routes implemented in this backend.

`API_URL = localhost:5000/api/v1 `

**NOTE**: The json data below is what is needed to be sent in the body of said request.

**Authentication Routes**

- POST - `API_URL/auth/register`
  ```
  {
    "name":"john doe",
    "email":"john@gmail.com",
    "password":"secret"
  }
  ```
- POST - `API_URL/auth/login`
  ```
  {
    "email":"john@gmail.com",
    "password":"secret"
  }
  ```

**User Profile Routes**

**NOTE**: These are private routes. You need to provide the token in header of each request. You can get the token from the succesful response of `register` or `login` requests.
| Headers | Value |
| ------ | ------ |
| Authorization | Bearer TokenProvidedAfterRegisterOrLogin |

- GET - `API_URL/user/getProfile`

- PATCH - `API_URL/user/updateProfile`
  ```
  {
    "name":"Zain Tanveer",
    "email":"zain@gmail.com",
    "phone":"03246474289",
    "bio":"My name is Zain. I'm a CS graduate.",
    "country":"Pakistan",
    "city":"Lahore",
    "state":"Punjab",
    "zipcode":"54000"
  }
  ```
- PATCH - `API_URL/user/updatePassword`
  ```
  {
    "password":"newSecret"
  }
  ```

**NOTE**: The next two routes only work on a development environment. If you want to deploy this project then checkout my [upload file api][uploadfile] repository which uses a free image storage service known as [cloudinary][cloudinary] to upload images.

- POST - `API_URL/user/uploadPhoto`
  ```
  {
    "image":profile-pic.jpg
  }
  ```
- POST - `API_URL/user/uploadResume`
  ```
  {
    "resume":resume.jpg
  }
  ```

**User Skill Routes**

**NOTE**: These are private routes. You need to provide the token in header of each request. You can get the token from the succesful response of `register` or `login` requests.
| Headers | Value |
| ------ | ------ |
| Authorization | Bearer TokenProvidedAfterRegisterOrLogin |

For the skills API you need to first populate the database by running the `populate.js` file using the following command:

```
node populate.js
```

- GET - `API_URL/user/skills/getSkills`

  - This api will get all of the skills that are already in the database along with their id so that you can display them in a list on the frontend.

- POST - `API_URL/user/skills/addSkills`
  ```
  [
    {
        "_id": "64353a19cfee9856371fb019",
        "skill": "HTML"
    },
    {
        "_id": "64353a19cfee9856371fb01a",
        "skill": "CSS"
    },
    {
        "_id": "64353a19cfee9856371fb01d",
        "skill": "Blockchain"
    },
    {
        "_id": "64353a19cfee9856371fb01e",
        "skill": "Cryptography"
    }
  ]
  ```
- GET - `API_URL/user/skills/getUserSkills`

- DELETE - `API_URL/user/skills/removeUserSkill/:skill_id`

**User Jobs Routes**

**NOTE**: These are private routes. You need to provide the token in header of each request. You can get the token from the succesful response of `register` or `login` requests.
| Headers | Value |
| ------ | ------ |
| Authorization | Bearer TokenProvidedAfterRegisterOrLogin |

- GET - `API_URL/user/jobs/getSavedJobs`

- POST - `API_URL/user/jobs/saveJob`
  ```
  {
    "job_id": "1343946",
    "title": "Unity Developer",
    "company": "Fikafy",
    "job_type": "Full Time/Permanent",
    "skills": [
      "CCHANNEL",
      "Unity3D",
      "Scripting"
    ],
    "experience": "Less than 1 Year",
    "description": "If you have the power and knowledge to make your imagination a reality by using Unity, we need you to join our team.Core Needs:Proven Knowle..",
    "created_at": "Jan 25, 2023",
    "min_salary": 25000,
    "max_salary": 35000,
    "city": "Islamabad",
    "total": 1312,
    "msg": "Showing 1-20",
    "permaLink": "https://www.rozee.pk/fikafy-unity-developer-islamabad-jobs-1343946",
    "job_expiry_date": "2023-02-25T00:00:00Z",
    "status_code": 200
  }
  ```

**NOTE**: This information is scraped from rozee.pk on the frontend side using BeautifulSoup4 in python. To know more about how the scraper works, check out my [Scrapers][scrapers] github repository.

- DELETE - `API_URL/user/jobs/removeSavedJob/:job_id`

- DELETE - `API_URL/user/jobs/removeExpiredJobs`

## Deployment

If you want to deploy it then you can use any free hosting services like [Cyclic][cyclic] or [Railway][railway]. But you do need to replace every http://localhost:5000 throughout the code with the deployed app URL. Just search http://localhost:5000 in VS Code and replace it. Its better to follow a youtube guide on how to deploy nodeJS apps.

## License

NONE

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job."
[angular]: https://angular.io/
[nodejs]: https://nodejs.org/en
[express]: https://expressjs.com/
[cyclic]: https://www.cyclic.sh/
[railway]: https://railway.app/
[beautifulsoup]: https://beautiful-soup-4.readthedocs.io/en/latest/
[scrapers]: https://github.com/Zain-Tanveer/Scrapers
[uploadfile]: https://github.com/Zain-Tanveer/upload-file-api
[cloudinary]: https://cloudinary.com/
