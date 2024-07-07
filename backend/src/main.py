from flask import Flask, jsonify, request
import mysql.connector
from db_utils import query_database, update_database
from llama_utils import LlamaAgent

app = Flask(__name__)

# Database configuration
db_config = {
    'host': 'localhost',  # Use 'db' as per docker-compose networking
    'user': 'root',
    'password': 'rootpassword',
    'database': 'mydatabase',
}

# Initialize Llama agent
llama_agent = LlamaAgent()

@app.route('/optimize_routes', methods=['POST'])
def optimize_routes():
    try:
        # Query warehouses from database
        warehouses = query_database("SELECT * FROM warehouse")
        
        # Optimize routes using Llama
        optimized_routes = llama_agent.optimize_routes(warehouses)

        # Update database with optimized routes (example)
        update_database("UPDATE warehouse SET optimized_route = %s WHERE warehouse_id = %s", optimized_routes)

        return jsonify({'message': 'Routes optimized successfully', 'optimized_routes': optimized_routes}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

def get_db_connection():
    return mysql.connector.connect(**db_config)

@app.route('/bookings', methods=['GET'])
def get_bookings():
    try:
        # Connect to the database
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Execute a query to fetch all bookings
        cursor.execute("SELECT * FROM booking")
        bookings = cursor.fetchall()

        # Close cursor and connection
        cursor.close()
        conn.close()

        # Return JSON response
        return jsonify(bookings)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

