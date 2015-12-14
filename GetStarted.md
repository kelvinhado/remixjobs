## Get started, 3, 2, 1, Go !

#### Setup JS environment
launch **npm i** to install all the needed modules.

#### Setup DB environment

We are now working with MongoDB database, so you'll need to create a new db :
```
1st terminal
$ mongod                        // launch mongo services

2nd terminal
$ mongo                         // launch mongo shell interface
> use db-remixjob               // will create or use the db mentionned
> db.createCollection('jobs')   // will create the jobs createCollection

```

#### Use the API

You will first have to launch the server using **node server.js**
Then use PostMan to try out the API

#### Import data

- to fill out the local database with remixjobs data :
 ```
  GET : http://localhost:9292/scrap
  ```

- to see all jobs
  ```
  GET : http://localhost:9292/api/v1/jobs
  ```

- add a new job
  ```
  POST http://localhost:9292/api/v1/jobs
  ```
  *request exemple*
  ```
  POST /api/v1/jobs HTTP/1.1
  Host: localhost:9292
  Cache-Control: no-cache
  Postman-Token: feeff084-b6da-6fd7-0ab0-d665c05663ef
  Content-Type: application/x-www-form-urlencoded

  title=Awesome+Job&company=Google&url=http%3A%2F%2Fremixjob.com%2FAwesomeJob%2F808080&workplace_name=Los+Angeles&workplace_lat=34.052235&workplace_lng=-118.243683&contract=CDI&tags=AngularJS%2CHTML
  ```
