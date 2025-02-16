import os
import sys
import pytest
import pymysql
import requests
from unittest.mock import patch, MagicMock

# Ensure the parent directory (ingestor) is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from database import Database  # ✅ Now Python should find it
from ingestor import run_ingestor


@pytest.fixture
def db():
    """Fixture to create a Database instance for testing."""
    return Database()

### ✅ 1️⃣ Test API Success Case
@patch("requests.get")
def test_fetch_data_success(mock_get, db):
    """Test API call success with a mock response."""
    mock_response = MagicMock()
    mock_response.json.return_value = [{"Year": 2024, "Month": 1, "CMA": "Toronto", "Total_starts": 500}]
    mock_response.status_code = 200
    mock_get.return_value = mock_response

    result = db.fetch_data("housing_starts_completions")

    assert isinstance(result, list)
    assert len(result) > 0
    assert result[0]["Year"] == 2024
    assert result[0]["CMA"] == "Toronto"


### ✅ 2️⃣ Test API Failure (Handles API Errors Gracefully)
@patch("requests.get")
def test_fetch_data_api_failure(mock_get, db):
    """Test API call failure handling."""
    mock_get.return_value.status_code = 500  # Simulate an API error
    mock_get.return_value.json.return_value = {}

    result = db.fetch_data("housing_starts_completions")

    assert result == []  # Expecting an empty list when API fails


### ✅ 3️⃣ Test API Returns Invalid Data (Handles Unexpected API Response)
@patch("requests.get")
def test_fetch_data_invalid_json(mock_get, db):
    """Test API call with invalid JSON response."""
    mock_get.return_value.status_code = 200
    mock_get.return_value.json.return_value = None  # Simulating bad data

    result = db.fetch_data("housing_starts_completions")

    assert result == []  # Expecting an empty list on invalid JSON


### ✅ 4️⃣ Test Mocked Database Connection Success
@patch("pymysql.connect")
def test_connect_to_db(mock_connect, db):
    """Test if database connection is established (mocked)."""
    mock_conn = MagicMock()
    mock_connect.return_value = mock_conn

    conn = db.connect()

    assert conn == mock_conn
    mock_connect.assert_called_once()


### ✅ 5️⃣ Test Database Connection Failure
@patch("pymysql.connect")
def test_connect_to_db_failure(mock_connect, db):
    """Test database connection failure handling."""
    mock_connect.side_effect = pymysql.MySQLError("Connection Failed")

    try:
        db.connect()
        assert False, "Expected MySQLError but none was raised!"
    except pymysql.MySQLError as e:
        assert str(e) == "Connection Failed"


### ✅ 6️⃣ Test Empty Database Query (When No Data Exists)
@patch("pymysql.connect")
def test_get_all_data_empty(mock_connect, db):
    """Test fetching data when database table is empty."""
    mock_conn = MagicMock()
    mock_cursor = mock_conn.cursor.return_value
    mock_cursor.fetchall.return_value = []  # Simulate empty table

    mock_connect.return_value = mock_conn

    result = db.get_all_data("housing_starts_completions")

    assert result == []  # Should return an empty list
    mock_cursor.execute.assert_called_once()


### ✅ 7️⃣ Test Database Insert Query Execution
@patch("pymysql.connect")
def test_insert_housing_starts_completions(mock_connect, db):
    """Test data insertion using a mock database connection."""
    fake_data = [{
        "Year": 2024, "Month": 1, "CMA": "Toronto",
        "Singles_starts": 10, "Semis_starts": 5, "Row_starts": 3, 
        "Apt_Other_starts": 2, "Total_starts": 20,
        "Singles_complete": 8, "Semis_complete": 4, "Row_complete": 2, 
        "Apt_other_complete": 1, "Total_complete": 15
    }]

    mock_conn = MagicMock()
    mock_cursor = MagicMock()
    mock_conn.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_conn

    db.insert_housing_starts_completions(fake_data)

    assert mock_cursor.execute.called
    assert mock_conn.commit.called


### ✅ 8️⃣ Test Full Ingestor Workflow (Mocking Everything)
@patch("database.Database.fetch_data")
@patch("database.Database.insert_housing_starts_completions")
def test_run_ingestor(mock_insert, mock_fetch):
    """Test the full ingestor workflow with mocked API and DB."""
    mock_fetch.return_value = [{"Year": 2024, "Month": 1, "CMA": "Toronto", "Total_starts": 500}]
    
    run_ingestor()

    assert mock_fetch.called
    assert mock_insert.called



