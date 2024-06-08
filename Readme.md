# Orbit Wallet Api

[_v1_](https://orbitwalletapi.onrender.com/api)

Api for fullstack developer assignment.

## Api routes

- `/user/:id`
  get details of a user by id

- `/transactions`
  get all transactions in the database

- `/transactions/user/:id`
  get all transactions of a user by id

## Api filters

Filters are only available for transactions api routes.

List of valid filters

- status [success/pending/failed]
- from [DateTime]
- to [DateTime]
- type [debit/credit]

usage:

```
    /transactions?status=success
```

# Pagination

Pagination is available for transactiosn only

usage:

```
    /transactions?page=1&limit=10&status=pending
```
