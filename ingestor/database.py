import requests
import pymysql
import os

class Database:
    def __init__(self):
        """Initialize database connection settings from environment variables."""
        self.host = os.getenv("DB_HOST", "localhost")
        self.port = int(os.getenv("DB_PORT", 3306))  # Default 3306
        self.user = os.getenv("DB_USER", "root")
        self.password = os.getenv("DB_PASSWORD", "pwd")
        self.database = os.getenv("DB_DATABASE", "template_db")
        self.connection = None

        # API Config
        self.API_KEY = "RSUR_J6bE2NWdpcw8aT-3cHBfmnrZY2x8E4tDeBxMr-pSVi_uTRa8g"
        self.API_URLS = {
            "housing_starts_completions": "https://cis-data-service.socs.uoguelph.ca/data/housing_starts_completions",
            "housing_under_construction": "https://cis-data-service.socs.uoguelph.ca/data/housing_under_construction",
            "apartment_starts": "https://cis-data-service.socs.uoguelph.ca/data/apartment_starts",
            "apartment_completions": "https://cis-data-service.socs.uoguelph.ca/data/apartment_completions",
            "labour_market": "https://cis-data-service.socs.uoguelph.ca/data/labour_market",
        }

    def safe_int(self, value):
        """Convert a value to int after removing commas. Return 0 if the value is empty or invalid."""
        try:
            if value is None or str(value).strip() == "":
                return 0
            return int(str(value).replace(',', '').strip())
        except ValueError:
            return 0

    def safe_float(self, value):
        """Convert a value to float after removing commas. Return 0.0 if the value is empty or invalid."""
        try:
            if value is None or str(value).strip() == "":
                return 0.0
            return float(str(value).replace(',', '').strip())
        except ValueError:
            return 0.0

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
            data = response.json()
            return data if isinstance(data, list) else [] 
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
                self.safe_int(entry.get("Year", 0)),
                self.safe_int(entry.get("Month", 0)),
                city,
                self.safe_int(entry.get("Singles_starts", 0)),
                self.safe_int(entry.get("Semis_starts", 0)),
                self.safe_int(entry.get("Row_starts", 0)),
                self.safe_int(entry.get("Apt_Other_starts", 0)),
                self.safe_int(entry.get("Total_starts", 0)),
                self.safe_int(entry.get("Singles_complete", 0)),
                self.safe_int(entry.get("Semis_complete", 0)),
                self.safe_int(entry.get("Row_complete", 0)),
                self.safe_int(entry.get("Apt_other_complete", 0)),
                self.safe_int(entry.get("Total_complete", 0))
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
                self.safe_int(entry.get("Year", 0)),
                self.safe_int(entry.get("Month", 0)),
                city,
                self.safe_int(entry.get("15 Structure", 0)),
                self.safe_int(entry.get("15 Units", 0)),
                self.safe_int(entry.get("619 Structure", 0)),
                self.safe_int(entry.get("619 Units", 0)),
                self.safe_int(entry.get("2049 Structure", 0)),
                self.safe_int(entry.get("2049 Units", 0)),
                self.safe_int(entry.get("5099 Structure", 0)),
                self.safe_int(entry.get("5099 Units", 0)),
                self.safe_int(entry.get("100199 Structure", 0)),
                self.safe_int(entry.get("100199 Units", 0)),
                self.safe_int(entry.get("200+ Structure", 0)),
                self.safe_int(entry.get("200+ Units", 0)),
                self.safe_int(entry.get("Total Structure", 0)),
                self.safe_int(entry.get("Total Units", 0))
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
                self.safe_int(entry.get("Year", 0)),
                self.safe_int(entry.get("Month", 0)),
                city,
                self.safe_int(entry.get("15 Structure", 0)),
                self.safe_int(entry.get("15 Units", 0)),
                self.safe_int(entry.get("619 Structure", 0)),
                self.safe_int(entry.get("619 Units", 0)),
                self.safe_int(entry.get("2049 Structure", 0)),
                self.safe_int(entry.get("2049 Units", 0)),
                self.safe_int(entry.get("5099 Structure", 0)),
                self.safe_int(entry.get("5099 Units", 0)),
                self.safe_int(entry.get("100199 Structure", 0)),
                self.safe_int(entry.get("100199 Units", 0)),
                self.safe_int(entry.get("200+ Structure", 0)),
                self.safe_int(entry.get("200+ Units", 0)),
                self.safe_int(entry.get("Total Structure", 0)),
                self.safe_int(entry.get("Total Units", 0))
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
            # Notice the slight variation in key names (e.g., " CMA") that might be present in the data
            city = entry.get("CMA", entry.get(" CMA", "")).strip()
            if city not in ["Toronto", "Hamilton"]:
                continue

            cursor.execute(query, (
                self.safe_int(entry.get("Year", 0)),
                self.safe_int(entry.get("Month", 0)),
                city,
                self.safe_int(entry.get("Singles", 0)),
                self.safe_int(entry.get("Semis", 0)),
                self.safe_int(entry.get("Row", 0)),
                self.safe_int(entry.get("Apt. and Other", 0)),
                self.safe_int(entry.get("Total", 0))
            ))

        conn.commit()
        cursor.close()

    def insert_labour_market(self, data):
        """
        Insert labour market data into the database.
        Assumes that the database table "labour_market" exists with columns matching:
        rec_num, survyear, survmnth, lfsstat, prov, cma, age_12, age_6, sex, marstat, educ,
        mjh, everwork, ftptlast, cowmain, immig, NAICS_21, NOC_10, NOC_43, HRLYEARN, `UNION`,
        PERMTEMP, ESTSIZE, FIRMSIZE, DURUNEMP, FLOWUNEM, SCHOOLN, EFAMTYPE, FINALWT.
        """
        conn = self.connect()
        cursor = conn.cursor()

        query = """
            INSERT INTO labour_market (
                rec_num, survyear, survmnth, lfsstat, prov, cma, age_12, age_6, sex, marstat, educ,
                mjh, everwork, ftptlast, cowmain, immig, NAICS_21, NOC_10, NOC_43, HRLYEARN, `UNION`,
                PERMTEMP, ESTSIZE, FIRMSIZE, DURUNEMP, FLOWUNEM, SCHOOLN, EFAMTYPE, FINALWT
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
                %s, %s, %s, %s, %s, %s, %s, %s
            )
            ON DUPLICATE KEY UPDATE
                survyear = VALUES(survyear),
                survmnth = VALUES(survmnth),
                lfsstat = VALUES(lfsstat),
                prov = VALUES(prov),
                cma = VALUES(cma),
                age_12 = VALUES(age_12),
                age_6 = VALUES(age_6),
                sex = VALUES(sex),
                marstat = VALUES(marstat),
                educ = VALUES(educ),
                mjh = VALUES(mjh),
                everwork = VALUES(everwork),
                ftptlast = VALUES(ftptlast),
                cowmain = VALUES(cowmain),
                immig = VALUES(immig),
                NAICS_21 = VALUES(NAICS_21),
                NOC_10 = VALUES(NOC_10),
                NOC_43 = VALUES(NOC_43),
                HRLYEARN = VALUES(HRLYEARN),
                `UNION` = VALUES(`UNION`),
                PERMTEMP = VALUES(PERMTEMP),
                ESTSIZE = VALUES(ESTSIZE),
                FIRMSIZE = VALUES(FIRMSIZE),
                DURUNEMP = VALUES(DURUNEMP),
                FLOWUNEM = VALUES(FLOWUNEM),
                SCHOOLN = VALUES(SCHOOLN),
                EFAMTYPE = VALUES(EFAMTYPE),
                FINALWT = VALUES(FINALWT),
                last_updated = CURRENT_TIMESTAMP;
        """

        for entry in data:
            cursor.execute(query, (
                self.safe_int(entry.get("rec_num", 0)),
                self.safe_int(entry.get("survyear", 0)),
                self.safe_int(entry.get("survmnth", 0)),
                self.safe_int(entry.get("lfsstat", 0)),
                self.safe_int(entry.get("prov", 0)),
                self.safe_int(entry.get("cma", 0)),
                self.safe_int(entry.get("age_12", 0)),
                self.safe_int(entry.get("age_6", 0)),
                self.safe_int(entry.get("sex", 0)),
                self.safe_int(entry.get("marstat", 0)),
                self.safe_int(entry.get("educ", 0)),
                self.safe_int(entry.get("mjh", 0)),
                self.safe_int(entry.get("everwork", 0)),
                self.safe_int(entry.get("ftptlast", 0)),
                self.safe_int(entry.get("cowmain", 0)),
                self.safe_int(entry.get("immig", 0)),
                self.safe_int(entry.get("NAICS_21", 0)),
                self.safe_int(entry.get("NOC_10", 0)),
                self.safe_int(entry.get("NOC_43", 0)),
                self.safe_int(entry.get("HRLYEARN", 0.0)),  # if necessary, use safe_float here
                self.safe_int(entry.get("UNION", 0)),
                self.safe_int(entry.get("PERMTEMP", 0)),
                self.safe_int(entry.get("ESTSIZE", 0)),
                self.safe_int(entry.get("FIRMSIZE", 0)),
                self.safe_int(entry.get("DURUNEMP", 0)),
                self.safe_int(entry.get("FLOWUNEM", 0)),
                self.safe_int(entry.get("SCHOOLN", 0)),
                self.safe_int(entry.get("EFAMTYPE", 0)),
                self.safe_float(entry.get("FINALWT", 0.0))
            ))

        conn.commit()
        cursor.close()


    def get_all_data(self, table):
        """Retrieve all records from any table while ensuring compatibility."""
        conn = self.connect()
        cursor = conn.cursor()

        # Determine which column to use for filtering
        filter_column = "city" if table != "labour_market" else "CMA"

        query = f"SELECT * FROM {table} WHERE {filter_column} IN ('Toronto', 'Hamilton');"

        try:
            cursor.execute(query)
            result = cursor.fetchall()
            return result
        except pymysql.MySQLError as e:
            print(f"Error fetching data from {table}: {e}")
            return []
        finally:
            cursor.close()
