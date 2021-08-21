# Samantha
## Getting Started

1. Get a copy of .env.local from Grace
2. Start the postgres container
```bash
docker-compose up -d
```
3. (One-time) Initialize the postgres container
```bash
PGPASSWORD=postgres psql -h localhost -U postgres PGDATABASE=dating_journal -c 'CREATE DATABASE dating_journal'
PGPASSWORD=postgres psql -h localhost -U postgres dating_journal -f ./scripts/2021-08-10.sql
```
4. (One-time) Install project dependencies:
```bash
yarn
```
5. Run the development server:
```bash
PGHOST=localhost PGUSER=postgres PGPASSWORD=postgres PGDATABASE=dating_journal yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
