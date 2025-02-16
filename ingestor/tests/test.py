#import pytest
#import mariadb
#from unittest.mock import patch, MagicMock
#from database import Database

## Test configuration
#TEST_DB_HOST = "database"
#TEST_DB_PORT = 3306
#TEST_DB_USER = "root"
#TEST_DB_PASSWORD = "pwd"
#TEST_DB_NAME = "template_db"


#@pytest.fixture
#def db():
#    """Fixture to create a Database instance for testing."""
#    return Database(
#        host=TEST_DB_HOST,
#        port=TEST_DB_PORT,
#        user=TEST_DB_USER,
#        password=TEST_DB_PASSWORD,
#        database=TEST_DB_NAME
#    )


#@patch("requests.get")
#def test_fetch_data(mock_get, db):
#    """Test if API call is successful and returns JSON data."""
#    mock_response = MagicMock()
#    mock_response.json.return_value = [{"Description": "Test Note", "Status": "NOT STARTED"}]
#    mock_response.status_code = 200
#    mock_get.return_value = mock_response

#    result = db.fetch_data()

#    assert isinstance(result, list)
#    assert len(result) > 0
#    assert result[0]["Description"] == "Test Note"
#    assert result[0]["Status"] == "NOT STARTED"


## 2️⃣ Test Database Connection
#def test_connect_to_db(db):
#    """Test if database connection is established."""
#    conn = db.connect()
#    assert isinstance(conn, mariadb.Connection)


## 3️⃣ Test Data Insertion
#def test_insert_into_db(db):
#    """Test if data is inserted into the database."""
#    test_data = [{"Description": "Test Insert", "Status": "IN PROGRESS"}]  # Flat list

#    db.insert_into_db(test_data)

#    conn = db.connect()
#    with conn.cursor() as cur:
#        cur.execute("SELECT text, status FROM note WHERE text = 'Test Insert'")
#        result = cur.fetchone()

#    assert result is not None
#    assert result[0] == "Test Insert"
#    assert result[1] == "IN PROGRESS"

