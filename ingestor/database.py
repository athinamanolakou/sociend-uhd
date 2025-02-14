import requests
import pymysql
import os

class Database:
    def __init__(self):
        """Initialize database connection settings from environment variables."""
        self.host = os.getenv("DB_HOST", "database")
        self.port = int(os.getenv("DB_PORT", 3306))  # Default 3306
        self.user = os.getenv("DB_USER", "root")
        self.password = os.getenv("DB_PASSWORD", "pwd")
        self.database = os.getenv("DB_DATABASE", "template_db")
        self.connection = None

        # API Config
        self.API_KEY = "V86Jh-BJ91CjEpRAqkyfhxbcOKLjCs-JXgK6lNvLQblTrE30OtCeug"
        self.API_URLS = {
            "housing_starts_completions": "https://cis-data-service.socs.uoguelph.ca/data/housing_starts_completions",
            "housing_under_construction": "https://cis-data-service.socs.uoguelph.ca/data/housing_under_construction",
            "apartment_starts": "https://cis-data-service.socs.uoguelph.ca/data/apartment_starts",
            "apartment_completions": "https://cis-data-service.socs.uoguelph.ca/data/apartment_completions",
        }

    def connect(self):
        """Establish and return a database connection."""
        if self.connection is None:
            self.connection = pymysql.connect(
                host=self.host,
                port=self.port,
                user=self.user,
                password=self.password,
                database=self.database,
                charset="utf8mb4",
                cursorclass=pymysql.cursors.DictCursor
            )
        return self.connection

    def fetch_data(self, key):
        """Generic method to fetch data from any API endpoint."""
        try:
            response = requests.get(self.API_URLS[key], headers={"Apikey": self.API_KEY})
            return response.json() if response.status_code == 200 else []
        except requests.exceptions.RequestException as e:
            print(f"Error fetching {key} data: {e}")
            return []

    def insert_housing_starts_completions(self, data):
        """Insert housing starts & completions data into the database (Toronto & Hamilton only)."""
        conn = self.connect()
        cursor = conn.cursor()

        query = """
            INSERT INTO housing_starts_completions 
                (year, month, city, singles_starts, semis_starts, row_starts, apt_other_starts, total_starts, 
                 singles_complete, semis_complete, row_complete, apt_other_complete, total_complete)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE 
                singles_starts = VALUES(singles_starts),
                semis_starts = VALUES(semis_starts),
                row_starts = VALUES(row_starts),
                apt_other_starts = VALUES(apt_other_starts),
                total_starts = VALUES(total_starts),
                singles_complete = VALUES(singles_complete),
                semis_complete = VALUES(semis_complete),
                row_complete = VALUES(row_complete),
                apt_other_complete = VALUES(apt_other_complete),
                total_complete = VALUES(total_complete),
                last_updated = CURRENT_TIMESTAMP;
        """

        for entry in data:
            city = entry.get("CMA", "")
            if city not in ["Toronto", "Hamilton"]:
                continue

            cursor.execute(query, (
                int(entry.get("Year", 0)), int(entry.get("Month", 0)), city,
                int(entry.get("Singles_starts", 0) or 0), int(entry.get("Semis_starts", 0) or 0),
                int(entry.get("Row_starts", 0) or 0), int(entry.get("Apt_Other_starts", 0) or 0),
                int(entry.get("Total_starts", 0) or 0), int(entry.get("Singles_complete", 0) or 0),
                int(entry.get("Semis_complete", 0) or 0), int(entry.get("Row_complete", 0) or 0),
                int(entry.get("Apt_other_complete", 0) or 0), int(entry.get("Total_complete", 0) or 0)
            ))

        conn.commit()
        cursor.close()

    def insert_apartment_starts(self, data):
        """Insert apartment starts data into the database (Toronto & Hamilton only)."""
        conn = self.connect()
        cursor = conn.cursor()

        query = """
            INSERT INTO apartment_starts (
                year, month, city, 
                struct_15, units_15, 
                struct_619, units_619, 
                struct_2049, units_2049, 
                struct_5099, units_5099, 
                struct_100199, units_100199, 
                struct_200_plus, units_200_plus, 
                total_structure, total_units
            ) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE 
                struct_15 = VALUES(struct_15), 
                units_15 = VALUES(units_15),
                struct_619 = VALUES(struct_619), 
                units_619 = VALUES(units_619),
                struct_2049 = VALUES(struct_2049), 
                units_2049 = VALUES(units_2049),
                struct_5099 = VALUES(struct_5099), 
                units_5099 = VALUES(units_5099),
                struct_100199 = VALUES(struct_100199), 
                units_100199 = VALUES(units_100199),
                struct_200_plus = VALUES(struct_200_plus), 
                units_200_plus = VALUES(units_200_plus),
                total_structure = VALUES(total_structure),
                total_units = VALUES(total_units),
                last_updated = CURRENT_TIMESTAMP;
        """

        for entry in data:
            city = entry.get("CMA", "")
            if city not in ["Toronto", "Hamilton"]:
                continue

            cursor.execute(query, (
                int(entry.get("Year", 0)),
                int(entry.get("Month", 0)),
                city,
                int(entry.get("15 Structure", 0) or 0),
                int(entry.get("15 Units", 0) or 0),
                int(entry.get("619 Structure", 0) or 0),
                int(entry.get("619 Units", 0) or 0),
                int(entry.get("2049 Structure", 0) or 0),
                int(entry.get("2049 Units", 0) or 0),
                int(entry.get("5099 Structure", 0) or 0),
                int(entry.get("5099 Units", 0) or 0),
                int(entry.get("100199 Structure", 0) or 0),
                int(entry.get("100199 Units", 0) or 0),
                int(entry.get("200+ Structure", 0) or 0),
                int(entry.get("200+ Units", 0) or 0),
                int(entry.get("Total Structure", 0) or 0),
                int(entry.get("Total Units", 0) or 0)
            ))

        conn.commit()
        cursor.close()

    def insert_apartment_completions(self, data):
        """Insert apartment completions data into the database (Toronto & Hamilton only)."""
        conn = self.connect()
        cursor = conn.cursor()

        query = """
            INSERT INTO apartment_completions 
                (year, month, city, struct_15, units_15, struct_619, units_619, struct_2049, units_2049,
                 struct_5099, units_5099, struct_100199, units_100199, struct_200_plus, units_200_plus,
                 total_structure, total_units)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE 
                struct_15 = VALUES(struct_15), units_15 = VALUES(units_15),
                struct_619 = VALUES(struct_619), units_619 = VALUES(units_619),
                struct_2049 = VALUES(struct_2049), units_2049 = VALUES(units_2049),
                struct_5099 = VALUES(struct_5099), units_5099 = VALUES(units_5099),
                struct_100199 = VALUES(struct_100199), units_100199 = VALUES(units_100199),
                struct_200_plus = VALUES(struct_200_plus), units_200_plus = VALUES(units_200_plus),
                total_structure = VALUES(total_structure), total_units = VALUES(total_units),
                last_updated = CURRENT_TIMESTAMP;
        """

        for entry in data:
            city = entry.get("CMA", "")
            if city not in ["Toronto", "Hamilton"]:
                continue

            cursor.execute(query, (
                int(entry.get("Year", 0)), int(entry.get("Month", 0)), city,
                int(entry.get("15 Structure", 0) or 0), int(entry.get("15 Units", 0) or 0),
                int(entry.get("619 Structure", 0) or 0), int(entry.get("619 Units", 0) or 0),
                int(entry.get("2049 Structure", 0) or 0), int(entry.get("2049 Units", 0) or 0),
                int(entry.get("5099 Structure", 0) or 0), int(entry.get("5099 Units", 0) or 0),
                int(entry.get("100199 Structure", 0) or 0), int(entry.get("100199 Units", 0) or 0),
                int(entry.get("200+ Structure", 0) or 0), int(entry.get("200+ Units", 0) or 0),
                int(entry.get("Total Structure", 0) or 0), int(entry.get("Total Units", 0) or 0)
            ))

        conn.commit()
        cursor.close()

    def insert_housing_under_construction(self, data):
        """Insert housing under construction data into the database (Toronto & Hamilton only)."""
        conn = self.connect()
        cursor = conn.cursor()

        query = """
            INSERT INTO housing_under_construction 
                (year, month, city, singles_starts, semis_starts, row_starts, apt_other_starts, total_starts)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE 
                singles_starts = VALUES(singles_starts),
                semis_starts = VALUES(semis_starts),
                row_starts = VALUES(row_starts),
                apt_other_starts = VALUES(apt_other_starts),
                total_starts = VALUES(total_starts),
                last_updated = CURRENT_TIMESTAMP;
        """

        for entry in data:
            city = entry.get("CMA", entry.get(" CMA", "")).strip()
            if city not in ["Toronto", "Hamilton"]:
                continue  # Skip if not in Toronto or Hamilton

            cursor.execute(query, (
                int(entry.get("Year", 0)),
                int(entry.get("Month", 0)),
                city,
                int(entry.get("Singles", 0) or 0),
                int(entry.get("Semis", 0) or 0),
                int(entry.get("Row", 0) or 0),
                int(entry.get("Apt. and Other", 0) or 0),
                int(entry.get("Total", 0) or 0)
            ))

        conn.commit()
        cursor.close()

    def get_all_data(self, table):
        """Retrieve all records from any table."""
        conn = self.connect()
        cursor = conn.cursor()

        query = f"SELECT * FROM {table} WHERE city IN ('Toronto', 'Hamilton');"

        try:
            cursor.execute(query)
            result = cursor.fetchall()
            return result
        except pymysql.MySQLError as e:
            print(f"Error fetching data from {table}: {e}")
            return []
        finally:
            cursor.close()
