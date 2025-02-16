import pymysql
from database import Database
import json

def run_ingestor():
    """Runs the ingestor to fetch and store data in the database."""
    db = Database()

    print("Starting data ingestion...\n")

    # List of tables to process
    tables = [
        ("housing_starts_completions", db.insert_housing_starts_completions),
        ("housing_under_construction", db.insert_housing_under_construction),
        ("apartment_starts", db.insert_apartment_starts),
        ("apartment_completions", db.insert_apartment_completions),
    ]

    for table_name, insert_function in tables:
        try:
            print(f"Fetching {table_name}...")
            data = db.fetch_data(table_name)
            insert_function(data)
            print(f"✅ Inserted {table_name} data successfully.\n")
        except pymysql.err.ProgrammingError as e:
            if "doesn't exist" in str(e):
                print(f"⚠️ Warning: Skipping `{table_name}` (table missing). Error: {e}")
            else:
                raise  # Re-throw unexpected errors
        except Exception as e:
            print(f"❌ Error processing `{table_name}`: {e}")

    print("✅ Data ingestion completed successfully!\n")

if __name__ == "__main__":
    run_ingestor()

    db = Database()
    tables = [
        "apartment_starts",
        "apartment_completions",
        "housing_starts_completions",
        "housing_under_construction"
    ]

    for table in tables:
        try:
            data = db.get_all_data(table)
            print(f"\n First 5 records from `{table}`:")
            print(json.dumps(data[:5], indent=4, default=str))
        except pymysql.err.ProgrammingError as e:
            if "doesn't exist" in str(e):
                print(f"⚠️ Warning: Cannot retrieve `{table}` (table missing). Error: {e}")
            else:
                raise
