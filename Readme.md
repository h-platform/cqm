## CQClient

CQClient is a wrapper class around http axios. It is warps axios and expose two functions instead:

- Command: for changing system state which results in side effects such as updateing your database
- Query: for retreiving data such as find and findAll operations

This simplifies the communication with the server. No need to think about request methods anymore like POST, GET, PATCH, DELETE, PUT. All rest api calls are executed using http POST method only.

## Philosiphy
Expressing your api should be more clear and directly linked to the intended purpose. The api should be more elaborate and self explanatory. Seperating the operations into  two types command and query gives a direct meaning of the intention of the declared api. Giving specific names for commands and queries gives a strong meaning leaving no room for guessing. Eventually you will build your own domain language that can be easily read and absorbed by your consumers.

## Client Side:

In your browser client:
```
// create client
const cqClient = new CQClient('http://localhost:3000/api');

// execute some commands:
const createdPost = await cqClient.command('blog', 'post.create', { title: 'This how we cook our dinner' });
const updatedPost = await cqClient.command('blog', 'post.update', { id: 1, title: 'This is why we cook this way' });
await cqClient.command('blog', 'post.publish', { id: 1 });
await cqClient.command('blog', 'post.updateTags', { id: 1, tags: ['kitchen'] });

// execute some queries:
const post = await cqClient.query('blog', 'post.findById', { id: 1 });
const comments = await cqClient.query('blog', 'post.findComments', { postId: 1 });
```

The first parameter for the command is called the moduleName. Relative commands and queries should be grouped together in a module. The second parameter is the topic name of the command, the third parameter is the payload object to be sent to the server for processing. The same goes for the query.

```
CQClient.command(moduleName: string, commandName: string, payload: any);
```


## Server Side:
The server api urls should follows this format:

- POST /api/${moduleName}/commands/${commandName}
- POST /api/${moduleName}/queries/${queryName}

For the above blog post samples, the actual api urls would be:
```
POST /api/blog/commands/post.create
POST /api/blog/commands/post.update
POST /api/blog/commands/post.publish
POST /api/blog/commands/post.updateTags

POST /api/blog/queries/post.findById
POST /api/blog/queries/post.findComments
```


Response body from the server expected to match the CommandResponse class:
```
{
    success: true,
    message: 'post created successfully',
    code: 'POST_CREATED',
    data: {
        // data from the server
        postId: 1
    }
}
```

To make it easier to generate such response, you can use CommandResponse helper in server code:


```
return CommandResponse.success('Post created successfully', 'POST_CREATED', {});
```


This is a sample express server with typescript using CommandResponse helpers functions:

```
import express, { Express, Request, Response } from 'express';
import { CommandResponse } from '@h-platform/cqm';

const app: Express = express();
const port = process.env.PORT;

app.post('/api/blog/commands/post.create', (req: Request, res: Response) => {
    // some logic for creating the post goes here
    
    if (everyThingIsOk) {
        // generating the response:
        const cqResponse =  CommandResponse.success('Post created successfully', 'POST_CREATED', {});
        res.send(cqResponse);
    else {
        // in case of error
        const cqResponseError =  CommandResponse.error('You are not allowed to create post', 'AUTH_ERR', {});
        res.send(cqResponseError).status(500);
    }
});

app.listen(3000, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:3000/`);

```
