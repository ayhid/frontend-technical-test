# Context

At leboncoin, our users can share messages about a transaction, or ask for informations about any products.

The application purpose is to create the interface to consult those messages.
The interface works on both desktop & mobile devices.

# Installation & running

- clone the code repository

`git clone https://github.com/ayhid/frontend-technical-test`

- Install dependecies

go to the cloned project code and run the following command

`cd frontend-technical-test && yarn`

- run the application for development

`yarn dev`


# Technical Stack

## Frontend

The application is built with [NextJS framework](https://nextjs.org/)

### Design and Styling

Theme and styles are built using [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) wich is a utility first framework. Simple yet very powerful providing sleek design, rich color palette and backedup with a huge community: ~56k stars on github at the time of writing this documentation.


## Backend 
In addition of being a frontend framework NextJS provides a solution to build APIs.




# Application Building Blocks

From the NextJS offcial routing documentation: 

> Next.js has a file-system based router built on the concept of pages.

>When a file is added to the pages directory, it's automatically available as a route.

>The files inside the pages directory can be used to define most common patterns.

```
src  
└─ pages
│   └─  index.tsx //home page
│  
└─ components // application components
```

`src/pages/index.tsx` will be the root url of our project that displays current signed in user conversations

## Authentication

The application uses [NextAuth.js](https://next-auth.js.org/) to mock real authentication mechanisms.

The current system is just using users nicknames to signin a user.

It can be easily updated to handle any other authentication strategy 

## Data Fetching

The application uses the [SWR react hooks](https://swr.vercel.app/) and the [axios](https://axios-http.com/) library to handle data fetching.

From the SWR official documentation:

> The name “SWR” is derived from stale-while-revalidate, a HTTP cache invalidation strategy popularized by HTTP RFC 5861. SWR is a strategy to first return the data from cache (stale), then send the fetch request (revalidate), and finally come with the up-to-date data.
> With SWR, components will get a stream of data updates constantly and automatically.
> And the UI will be always fast and reactive.

## Testing

In this context, the bias for playing the tests is in favor of end-to-end testing.

Because these repeat exactly the actions performed by the real user of the application.

The choice is fixed on the [cypress](https://www.cypress.io/) library to run these tests.

## Running Tests.

First of all make sure that the server application is running.

Run the command: `yarn e2e` in a terminal to run the tests.

The `yarn e2e` command performs a production build in order to be as close as possible to the application that will be deployed in production.

It then launches the next application in production mode to finally run the tests on it.

The `start-server-and-test` library guarantees that the tests will only be launched when the application is ready to be used.


