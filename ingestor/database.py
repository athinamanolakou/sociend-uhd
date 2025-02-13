#import requests
#import mariadb
#from datetime import datetime, timezone

#class Database:
#    def __init__(self, host="database", port=3306, user="root", password="pwd", database="template_db"):
#        """Initialize database connection settings."""
#        self.host = host
#        self.port = port
#        self.user = user
#        self.password = password
#        self.database = database
#        self.connection = None

#        # API Config
#        self.API_URL = "https://cis-data-service.socs.uoguelph.ca/data/tasks"
#        self.API_KEY = "V86Jh-BJ91CjEpRAqkyfhxbcOKLjCs-JXgK6lNvLQblTrE30OtCeug"

#    def connect(self):
#        """Establish and return a database connection."""
#        if self.connection is None:
#            self.connection = mariadb.connect(
#                host=self.host,
#                port=self.port,
#                user=self.user,
#                password=self.password,
#                database=self.database
#            )
#        return self.connection

#    def fetch_data(self) -> list:
#        """Fetch data from the API."""
#        try:
#            response = requests.get(self.API_URL, headers={"Apikey": self.API_KEY})
#            response.raise_for_status()
#            return response.json()
#        except requests.exceptions.RequestException as e:
#            print(f"Error fetching data: {e}")
#            return []

#    def normalize_data(self, raw_response: list) -> list:
#        """Normalize raw data for insertion into the database."""
#        note_list = []

#        for note in raw_response:
#            status = note.get("Status", "NOT STARTED").upper()
#            text = note.get("Description", "")
#            formatted_date = datetime.fromtimestamp(int(note.get("Due Date")), tz=timezone.utc).strftime('%Y-%m-%d')

#            if status == "COMPLETED":
#                status = "DONE"

#            note_list.append({"text": text, "status": status, "Due Date": formatted_date}) #add something here

#        return note_list

#    def insert_into_db(self, raw_response: list | dict) -> None:
#        """Insert data retrieved from the web service into the database."""
#        note_list = self.normalize_data(raw_response)
#        try:
#            conn = self.connect()
#            with conn.cursor() as cur:
#                for note in note_list:
#                    cur.execute(
#                        """INSERT INTO note (text, status, due_date) VALUES (%s, %s, %s)""",
#                        (note["text"], note["status"], note["Due Date"])
#                    )
#                conn.commit()
#        except Exception as e:
#            print(f"Error inserting data: {e}")
