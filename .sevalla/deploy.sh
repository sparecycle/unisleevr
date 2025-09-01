# deploy.sh
#!/bin/bash
echo "=== Sevalla Deploy Script Starting ==="
touch database/database.sqlite
chmod 664 database/database.sqlite
chmod 775 database/
echo "=== Deploy Script Completed ==="