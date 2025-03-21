FROM python:3.11-slim

# Set working directory
WORKDIR /usr/app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Cron
#RUN apt-get update && apt-get -y install cron

# Copy Application
#COPY src .

# Copy and set up the cron job
# COPY ingester-cron /etc/cron.d/ingester-cron
# RUN chmod 644 /etc/cron.d/ingester-cron
# RUN crontab /etc/cron.d/ingester-cron
# RUN touch /var/log/cron.log
# RUN printenv > /etc/environment
# CMD cron && tail -f /var/log/cron.log
