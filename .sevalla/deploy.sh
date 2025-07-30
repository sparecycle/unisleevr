# deploy.sh


apt-get update && apt-get install -y sqlite3

# Create the database file if it doesn't exist
touch database/database.sqlite
chmod 664 database/database.sqlite
chmod 775 database/

