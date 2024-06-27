echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r dist/* root@157.230.43.225:/var/www/html/
echo "Done!"