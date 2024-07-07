from flask import Flask, jsonify, request
from warehouseAgent import WarehouseAIAgent
from bookingAgent import BookingAIAgent
from fleetAgent import FleetAIAgent
from db_utils import initialize_db

app = Flask(__name__)

initialize_db()

groq_api_key = "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"

warehouse_agent = WarehouseAIAgent()
booking_agent = BookingAIAgent(groq_api_key)
fleet_agent = FleetAIAgent()

@app.route('/api/warehouse', methods=['GET'])
def optimize_warehouse():
    optimized_routes = warehouse_agent.optimize_warehouse()
    return jsonify({"message": "Warehouse data fetched", "warehouse_data": optimized_routes})

@app.route('/api/booking', methods=['POST'])
def book_item():
    data = request.json
    response = booking_agent.book_item(data)
    return jsonify(response)

@app.route('/api/fleet', methods=['GET'])
def optimize_fleet():
    optimized_routes = fleet_agent.optimize_fleet()
    return jsonify({"message": "Fleet data fetched", "fleet_data": optimized_routes})

if __name__ == '__main__':
    app.run(debug=True)
