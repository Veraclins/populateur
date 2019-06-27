# populateur

Populateur is a population management API that helps you manage the population of different locations.

## Installation

To run the app locally, setup a local development environment. Ensure that [`Nodejs`](https://nodejs.org/en/download/) and [`PostgreSQL`](https://www.postgresql.org/download/) are installed on your machine.

- clone the app `git clone git@github.com:Veraclins/populateur.git`
- move into the folder and install dependencies `cd populateur && yarn`
- create the database `createdb populateur`
- run migrations `yarn db:migrate`
- run the app in dev mode (with auto-refresh using [nodemon](https://nodemon.io/)) `yarn dev`
- Or build and run `yarn build && yarn start`
- Visit `http://localhost:4000` to access the app. Note: `4000` is the port number and can be configured by setting the `PORT` variable in your .env file.

## Features/Endpoints

The API has the following features/endpoints:

**Sign up or login.**

To use the API, you need to sign up/login by sending a `post` request to `/auth` with `username` and `password`. This returns a token which should be passed in the header of subsequent requests as `x-access-token`.

**Create a location.**

To create a location, send a `post` request to `/locations` with `name`, `female`, `male` and `parentId`(optional). Note: `male` and `female` represents the population of male and female in the location respectively, and must be numbers. You can specify the id of the containing location if the new location is within another

Response:

```JSON
{
    "status": "success",
    "message": "Location created successfully",
    "data": {
        "id": 5,
        "name": "Abuja",
        "male": 6008778,
        "female": 3266454,
        "total": 9275232,
        "parentId": null,
        "updatedAt": "2019-06-27T14:26:45.184Z",
        "createdAt": "2019-06-27T14:26:45.184Z"
    }
}
```

**Fetch all locations.**

To fetch all the available locations, send a `get` request to `/locations`,

Response:

```JSON
{
    "status": "success",
    "message": "Locations fetched successfully",
    "data": [
        {
            "id": 1,
            "name": "Madrid",
            "male": 3454353456,
            "female": 5466454679,
            "total": 8920808135
        },
        {
            "id": 4,
            "name": "Barcelona",
            "male": 5000059950,
            "female": 2466454679,
            "total": 7466514629
        },
        {
            "id": 2,
            "name": "Updated place",
            "male": 2088787665,
            "female": 2466454679,
            "total": 4555242344
        },
        {
            "id": 3,
            "name": "Updated Spain",
            "male": 6008778787,
            "female": 3266454679,
            "total": 9275233466
        },
        {
            "id": 5,
            "name": "Abuja",
            "male": 6008778,
            "female": 3266454,
            "total": 9275232
        }
    ]
}
```

**Get a location by id.**

You can get a location by passing the id as a parameter `/locations/2`. This also returns all locations within this location as shown below.

```JSON
{
    "status": "success",
    "message": "Location fetched successfully",
    "data": {
        "overallTotal": 21296990439,
        "total": 4555242344,
        "female": 2466454679,
        "male": 2088787665,
        "subLocations": [
            {
                "id": 4,
                "name": "Barcelona",
                "male": 5000059950,
                "female": 2466454679,
                "total": 7466514629
            },
            {
                "id": 3,
                "name": "Updated Spain",
                "male": 6008778787,
                "female": 3266454679,
                "total": 9275233466
            }
        ]
    }
}
```

**Update a location.**

To update a location, send a `put` request to `/locations` passing the id as a parameter, e.g. `/locations/4` with `name`, `female` and `male`. Inputs follow the same validation as in creating above.

Response:

```JSON
{
    "status": "success",
    "message": "Location updated successfully",
    "data": [
        1,
        [
            {
                "id": 4,
                "name": "Onitsha",
                "parentId": 2,
                "male": 3009766,
                "female": 3266454,
                "total": 6276220,
                "createdAt": "2019-06-27T13:36:15.241Z",
                "updatedAt": "2019-06-27T14:40:47.664Z"
            }
        ]
    ]
}
```

**Delete location.**

To delete a location just send a `delete` request passing the phone number as a parameter e.g. `/locations/3`. It returns 1 if the delete is successful.
