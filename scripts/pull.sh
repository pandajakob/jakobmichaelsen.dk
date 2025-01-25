cd /home/jakob/Desktop/jakobmichaelsen.dk/ || {
  echo "Error: Directory not found. Exiting.";
  exit 1;
}

# Pull the latest changes
echo "Pulling latest changes in $(pwd)..."
sudo git pull
