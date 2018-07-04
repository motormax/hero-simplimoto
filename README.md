# Hero digital

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need to have installed elixir, nodejs and postgresql to get the project running.

To install elixir follow [these](https://elixir-lang.org/install.html) instructions for windows or install it with the package manager on linux

To install node follow [these](https://nodejs.org/en/) instructions for windows or install it with the package manager on linux

To install postgres follow [these](https://www.postgresql.org/download/) instructions for windows or install it with the package manager on linux

To check if elixir and node are installed run these commands:

```bash
$ elixir --version
Erlang/OTP 21 [erts-10.0] [source] [64-bit] [smp:4:4] [ds:4:4:10] [async-threads:1] [hipe]

Elixir 1.6.5 (compiled with OTP 20)
$ node --version
v10.5.0
$ psql postgresql://postgres:postgres@localhost:5432/ # this should give you a console, use \q to quit
```

### Setup

A step by step series of examples that tell you how to get a development env running

#### Backend

Say what the step will be

```bash
cd backend # Go to the backend directory
mix deps.get # Install dependencies with 
mix ecto.create && mix ecto.migrate # Create and migrate your database with 
cd assets && npm install # Install Node.js dependencies with 
```

These commands are the ones that get the backend ready, to start it run

```bash
cd backend # Go to the backend directory
mix phx.server # Start Phoenix endpoint with 
```

Now go to http://localhost:4000/admin and you should see the admin page

#### Frontend

To get the frontend running we will run:

```bash
cd frontend # Go to the frontedn directory
yarn install # Install the dependencies
```

That's all the setup needed, now to run the server run:

```bash
yarn start
```

In production the elixir server serves the frontend after built, so localhost:4000/ will return a 404 on development (and that's ok)

The frontend forwards requests to the backend whenever the url starts with `/api`, if you see 503s on api requests you probably don't have the elixir server running

## Running the tests

Running the tests in the backend: `mix test` and in the frontend `yarn test`

## Deployment

The project is defined in heroku using the `.buildpacks` and it's roughly outlined as:

* In the backend, install elixir and project dependencies
* In the backend, build the brunch js dependencies
* In the frontend, build the project into static files and copy them over to the static directory in the backend

To run the project we just start the elixir server which server the frontend static files.

## Add a new model to the Backoffice (ExAdmin)

### Create model

1. On the `${PROJECT_HOME}/backend/` folder run:

```
$ mix phx.gen.schema Context.ModelName table_name field_1:type field_2:type
```

Example:

```
$ mix phx.gen.schema Product.Motorcycle motorcycles name:string price:integer
```

2. Run the migrations

```
$ mix ecto.migrate
```

### Generate and configure ExAdmin for the new model

1. On the `${PROJECT_HOME}/backend/` folder run:

```
$ mix admin.gen.resource Context.ModelName
```

Example:

```
$ mix admin.gen.resource Product.Motorcycle
```

2. Edit the file `${PROJECT_HOME}/backend/config/config.exs` 

3. Add the generated ExAdmin module to the ex_admin module list. 

```
config :ex_admin,
  modules: [
    HeroDigitalWeb.ExAdmin.Dashboard,
    HeroDigital.ExAdmin.Context.ModuleName,
  ]
```

Example:
```
config :ex_admin,
  modules: [
    HeroDigitalWeb.ExAdmin.Dashboard,
    HeroDigital.ExAdmin.Product.Motorcycle,
  ]
```

4. Find more about ExAdmin configuration [here](https://github.com/smpallen99/ex_admin/tree/phx-1.3#customizing-the-index-page) and [here](https://github.com/smpallen99/ex_admin/wiki)
