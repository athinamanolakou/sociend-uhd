FROM python:3.11-slim

# Set working directory
WORKDIR /usr/app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Cron
#RUN apt-get update && apt-get -y install cron

# Copy Application
COPY . /usr/app

# Copy and set up the cron job
COPY ingestor-cron /etc/cron.d/ingester-cron
RUN chmod 644 /etc/cron.d/ingester-cron
RUN crontab /etc/cron.d/ingester-cron
RUN touch /var/log/cron.log
RUN printenv > /etc/environment

# Make the script executable
#RUN chmod +x /usr/app/ingestor.py

# Start cron and keep the container alive
CMD ["sh", "-c", "cron && tail -f /var/log/cron.log"]