#!/bin/sh

# Wait for the database to be ready
until nc -z -v -w30 $DB_HOST 3306
do
  echo "Waiting for database connection..."
  # wait for 5 seconds before check again
  sleep 5
done

# Run the Node.js script
node init-db.js

# Start your main application
exec "$@"