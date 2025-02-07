from database import Database

if __name__ == "__main__":
    db = Database()
    db.insert_into_db(db.fetch_data())  # Fetch and insert data

