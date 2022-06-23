This defines and formalize the expected response from commands api
It is a core package used in h-platform nest boilerplate

basicly a CommandResponse should looks like:
```
{
    success: true,
    message: 'post updated successfully',
    code: 'POST_UPDATE',
    data: {
        // any other data to be sent in the reposnse
        postId: 123
    }
}
```