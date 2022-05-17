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
│   │   index.tsx
│   │
│   └─── api
│       │   file111.txt
│       │   file112.txt   
└─ components
  │   
  └─ Conversation // conversation related components
  │     
  └─ Message // message related components
```

`src/pages/index.tsx` will be the root url of our project that displays current signed in user conversation

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
