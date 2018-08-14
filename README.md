# jamxio-web-client

## Requirements: 

- Node (https://nodejs.org/en/download/)
- Yarn (https://yarnpkg.com/en/docs/install)

    ### Environment variables: 

    src/.env

    ``` bash
    MAPBOX_TOKEN=
    IDENTITY_POOL_NAME=
    IDENTITY_POOL_ID=
    IDENTITY_POOL_REGION=
    GRAPHQL_SERVER_URL=
    GRAPHQL_SERVER_ENDPOINT=
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    ```

## install app and run in dev mode

Install dependencies:
``` bash
$ yarn install
```

Run the App in dev mode:
``` bash
$ yarn start:dev
```

Remote Redux DevTools
``` bash
http://remotedev.io/local/
```

## Build and pack the App
To build the App:
``` bash
$ yarn prestart:prod
```

