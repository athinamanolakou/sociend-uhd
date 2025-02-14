from database import Database
import json

def run_ingestor():
    """Runs the ingestor to fetch and store data in the database."""
    db = Database()


    print("Starting data ingestion...\n")

    # Fetch and insert Housing Starts & Completions
    print(" Fetching housing starts & completions...")
    housing_starts_completions = db.fetch_data("housing_starts_completions")
    db.insert_housing_starts_completions(housing_starts_completions)
    print(" Inserted Housing Starts & Completions data\n")


    # Fetch and insert Housing Under Construction
    print("Fetching housing under construction...")
    housing_under_construction = db.fetch_data("housing_under_construction")
    db.insert_housing_under_construction(housing_under_construction)
    print("Inserted Housing Under Construction data\n")


    # Fetch and insert Apartment Starts
    print(" Fetching apartment starts...")
    apartment_starts = db.fetch_data("apartment_starts")
    db.insert_apartment_starts(apartment_starts)
    print("Inserted Apartment Starts data\n")

    #Fetch and insert Apartment Completions
    print(" Fetching apartment completions...")
    apartment_completions = db.fetch_data("apartment_completions")
    db.insert_apartment_completions(apartment_completions)
    print(" Inserted Apartment Completions data\n")

    print(" Data ingestion completed successfully!")


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
        data = db.get_all_data(table)
        print(f"\n First 5 records from `{table}`:")
        print(json.dumps(data[:5], indent=4, default=str))





