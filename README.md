# Remixjobs

> Unofficial Remixjobs API

## Introduction

[RemixJobs](https://remixjobs.com/) is the best French job board for the Web Industry.

Today, no (un)official API was developed to allow developers to add jobs in their web application

## What is a REST API ?

Rest stand for Representational State Transfer (REST)  
* Use HTTP methods explicitly.
* Be stateless : “don't store state information on the server”
* Expose directory structure-like URIs.
* Transfer XML, JavaScript Object Notation (JSON), or both





## Workshop in 1 sentence

*Build a remixjobs RESTful API*

## How to do that?

Transcript the API description in code ;)

The goal is write enough endpoints with the right filters and fields to build a specific job boards as:

* A job board for JavaScript intership
* A job board for remote jobs on Big Data
* A job board for Designers who want sunny weather... so in South Of France

Etc, etc, etc...

## Stack

* Node.js
* Express 4
* MongoDB
* Postman

## Api description

*Json exemple*

#### Available parameters

parameters | description
---------- | -----------
id | (Number) the id of the job
title | (String) title
url | (String) link to the job
company | (String) name of the company
place | (String) localization
contract | (String) Type of the contract (CDD, Stage..)
tags  | (String) filters by tags

### /jobs

* **Return all jobs**
You can add parameters to the request to sort your results
```
GET : http://localhost:9292/api/v1/jobs
GET : http://localhost:9292/api/v1/jobs?company=Google
```

* **Create a new job**
```
POST : http://localhost:9292/api/v1/jobs
```
with POST parameters from form

```
POST /api/v1/jobs HTTP/1.1
Host: localhost:9292
Cache-Control: no-cache
Postman-Token: feeff084-b6da-6fd7-0ab0-d665c05663ef
Content-Type: application/x-www-form-urlencoded

title=Awesome+Job&company=Google&url=http%3A%2F%2Fremixjob.com%2FAwesomeJob%2F808080&workplace_name=Los+Angeles&workplace_lat=34.052235&workplace_lng=-118.243683&contract=CDI&tags=AngularJS%2CHTML
```

* **Return information of a job**
```
GET : http://localhost:9292/api/v1/jobs/33680
```
```
{
    "_id": "5670057d37946bd307b7d8e1",
    "date": "1450182013809",
    "contract": "Stage",
    "company": "Alxdr",
    "url": "https://remixjobs.com/emploi/Developpement/Developpeur-Ruby-on-Rails-logiciel-SaaS-H-F/33680",
    "title": "Développeur Ruby on Rails (logiciel SaaS) H/F",
    "id": 33680,
    "__v": 0,
    "tags": [
      "ruby-on-rails",
      "ruby",
      "saas",
      "ror",
      "B2B"
    ],
    "localization": {
      "data_workplace_lng": 2.3425712,
      "data_workplace_lat": 48.8717774,
      "data_workplace_name": "Paris"
    }
}
```

* **Update a jobs**
```
PUT : http://localhost:9292/api/v1/jobs/{id}
```


### /jobs/latest

* Return all jobs of the current day

### /companies

* Return all companies
* Return all jobs of a the given companies

## Jobs model

I think that the first step is to scrap datas from RemixJobs website and fill a [mongoDB](https://www.mongodb.org/) database.

Once database filled, your api will fetch/save/update data from this database in a real API consuming.

You can find the model in the the file **remixjob-model.js**

## API rules (at least to follow)

1. RESTful URLs and actions
1. Plural noun
1. Version via the url
1. Query parameters for advanced filtering, sorting and searching
1. Limit fields are returned from the APO
1. JSON only
1. snake_case for resources
1. Use HTTP Status codes

## Licence

[Uncopyrighted](http://zenhabits.net/uncopyright/)
