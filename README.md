## Building the app

`yarn install`

`yarn build`

## Running the app

`yarn start`

## Testing the app

`yarn test`

## Things of note

I have chosen to build this API using the Express framework. In addition, I've used express-validator for data validation.

I have written a couple of tests in `src/routes/tests/users/test.ts` to demonstrate basic testing. I have chosen Jest and SuperTest.

My repositories are returning promises on local data to just simulate/show the async/await code pattern I typically like.

I have included a Postman collection export I used in testing this API, it includes a collection with a few tests to show some testing via this tool.

## Considerations

There are more than a few things that would warrant further time and/or consideration

1. No Authentication, an API of this sort would definitely need an authentication system.
2. No SSL, most likely this would be served via SSL.
3. More hardened error handling and logging.
4. Could use more unit tests!
5. 0 API documentation, especially if providing to a 3rd party, more documentation would be necessary.
6. Potentially better abstraction of validation logic, removed from the inline route definition.
7. Probably some more stuff that we could definitely have a discussion on! Trailing commas? Tabs? Spaces? :)

## Thank you

Finally, thank you for your patience and consideration!
