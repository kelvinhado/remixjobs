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
Then define the path to your mongo db in **line 13 of server.js**

- to fill out the local database with remixjobs data :
 ```
  GET : http://localhost:9292/scrap
  ```

#### Use the API

You will first have to launch the server using **node server.js**
Then use PostMan to try out the API

More information in the README.md
