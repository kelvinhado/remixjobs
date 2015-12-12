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

We could define a job by its

1. Job title
1. Company
1. Localization
1. Category
1. Description
1. Contract
1. Date
1. Tags

### /jobs

* Return all jobs
* Create a new job
* Return information of a job
* Update a jobs

#### Non exhaustive parameters

parameters | description
---------- | -----------
q | the query
contract | filter by contract (cdi, cdd...)
category | design, dev...
where | localization
limit | Jobs number

### /jobs/latest

* Return all jobs of the current day

### /companies

* Return all companies
* Return all jobs of a the given companies

## Jobs model

I think that the first step is to scrap datas from RemixJobs website and fill a [mongoDB](https://www.mongodb.org/) database.

Once database filled, your api will fetch/save/update data from this database in a real API consuming.


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
