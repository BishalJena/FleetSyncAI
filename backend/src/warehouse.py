import mysql.connector
from llama.agents import LlamaAgent

# Database configuration (adjust as per your setup)
db_config = {
    'host': 'db',  # Use 'db' as per docker-compose networking
    'user': 'root',
    'password': 'rootpassword',
    'database': 'mydatabase',
}

def query_warehouse_data():
    # Connect to MySQL database
    db_connection = mysql.connector.connect(**db_config)
    cursor = db_connection.cursor()

    query = "SELECT warehouse_id, city_id, capacity, availability FROM warehouse"
    cursor.execute(query)
    warehouse_data = cursor.fetchall()

    cursor.close()
    db_connection.close()

    return warehouse_data

def optimize_routes(warehouse_data):
    # Implement Llama integration here
    llama_agent = LlamaAgent()
    optimized_routes = llama_agent.optimize(warehouse_data)
    
    # Store optimized routes in database (example implementation)
    store_optimized_routes(optimized_routes)

    return optimized_routes

def store_optimized_routes(optimized_routes):
    # Example implementation to store data in database
    db_connection = mysql.connector.connect(**db_config)
    cursor = db_connection.cursor()

    # Assume optimized_routes is structured data ready to be stored in your database tables
    # Example: Insert optimized routes into a new table or update existing tables

    cursor.close()
    db_connection.close()

def run_warehouse_manager():
    warehouse_data = query_warehouse_data()
    optimized_routes = optimize_routes(warehouse_data)
    return optimized_routes
