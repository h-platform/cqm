## CQClient

CQClient is a typescript class which wraps http axios and expose two functions

- Command: for changing system states which results in side effects
- Query: for retreiving data such as find and findAll operations

This simplifies the communication with the server as no need to think about request methods types POST, GET, PATCH, DELETE, PUT
All rest api calls are executed using POST methods internally using axios.

## Usage Client Side:

In your browser client:
```
const cqClient = new CQClient('http://localhost:3000/api');
const createdPost = await cqClient.command('blog', 'post.create', { title: 'Blog post number 1' });
const post = await cqClient.command('blog', 'post.findById', { id: 1 });
const updatedPost = await cqClient.command('blog', 'post.update', { id: 1, title: 'Blog post number 1' });
await cqClient.command('blog', 'post.publish', { id: 1 });
await cqClient.command('blog', 'post.updateTags', { id: 1, tags: [''] });
const comments = await cqClient.command('blog', 'post.findComments', { postId: 1 });
```


Response body from the server expected to match the CommandResponse:
```
{
    success: true,
    message: 'post created successfully',
    code: 'POST_CREATEDE',
    data: {
        // data from the server
        postId: 1
    }
}
```

## Usage Server Side:
The same module has helpers functions can be used in the server:
```
return CommandResponse.success('Post created successfully', 'POST_CREATED', {});
```
