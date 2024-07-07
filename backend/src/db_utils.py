import mysql.connector

# Database configuration
db_config = {
    'host': 'db',
    'user': 'root',
    'password': 'rootpassword',
    'database': 'mydatabase',
}

def query_database(query):
    try:
        db_connection = mysql.connector.connect(**db_config)
        cursor = db_connection.cursor()
        cursor.execute(query)
        result = cursor.fetchall()
        cursor.close()
        db_connection.close()
        return result
    except Exception as e:
        raise Exception(f"Error querying database: {str(e)}")

def update_database(query, data):
    try:
        db_connection = mysql.connector.connect(**db_config)
        cursor = db_connection.cursor()
        cursor.execute(query, data)
        db_connection.commit()
        cursor.close()
        db_connection.close()
    except Exception as e:
        raise Exception(f"Error updating database: {str(e)}")
