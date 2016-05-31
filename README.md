Send email using SES

### Usage

You can call this Lambda from another Lambda or application.

```js
const lambda = new AWS.Lambda();
lambda.invoke({
    FunctionName: 'this-lmabda-function-name',
    InvocationType: 'Event',
    Payload: JSON.stringify({
        from: 'source@email.com',
        to: ['destination@email.com', 'another@email.com'],
        subject: 'Automated email',
        body: 'text or html'
    })
}, callback);
```

The code above will execute the Lambda asynchronously. If you want to know whether the email was sent or not, you can use `InvocationType: RequestResponse`.


### Templating

By default the lambda expects an email body, but you can also use [nunjucks templates](http://mozilla.github.io/nunjucks/).

```js
const lambda = new AWS.Lambda();
lambda.invoke({
    FunctionName: 'this-lmabda-function-name',
    InvocationType: 'Event',
    Payload: JSON.stringify({
        from: 'source@email.com',
        to: ['destination@email.com', 'another@email.com'],
        subject: 'Automated email',
        template: 'Hello {{ name }}!',
        env: {
            name: 'World'
        }
    })
}, callback);
```


### Unit tests

* `npm test` to run your tests once.
* `nodemon --exec 'npm test' --ignore tmp` to watch your files and run tests on save.
