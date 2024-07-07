import mysql.connector
from mysql.connector import Error

# Database connection details
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = 'rootpassword'
DB_NAME = 'mydatabase'

# Initialize database connection
def initialize_db():
    try:
        connection = mysql.connector.connect(host=DB_HOST,
                                             user=DB_USER,
                                             password=DB_PASSWORD,
                                             database=DB_NAME)
        if connection.is_connected():
            print('Connected to MySQL database')
            return connection
    except Error as e:
        print(f"Error connecting to MySQL database: {e}")

# Fetch data from the database
def fetch_data(query):
    try:
        connection = initialize_db()
        if connection:
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query)
            records = cursor.fetchall()
            return records  # Returns None if no records found, handle accordingly
    except Error as e:
        print(f"Error fetching data from MySQL database: {e}")
        return None  # Handle database error gracefully
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()
            print('MySQL connection closed')

def fetch_fleet_data():
    query = "SELECT id, name FROM fleet"
    return fetch_data(query)


def fetch_warehouse_data():
    query = "SELECT id, name FROM warehouse"
    return fetch_data(query)


def fetch_booking_data():
    query = "SELECT id, item_name, quantity FROM booking"
    return fetch_data(query)
