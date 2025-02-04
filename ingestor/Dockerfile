# Use the latest stable Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /usr/app/

# Install system dependencies required for MariaDB
RUN apt-get update && apt-get install -y \
    libmariadb-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file into the container
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Python code into the container
COPY ingestor.py database.py .  

# Run the script on container start
CMD ["python", "ingestor.py"]
