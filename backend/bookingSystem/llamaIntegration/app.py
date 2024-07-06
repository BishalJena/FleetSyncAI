from flask import Flask, request, jsonify
from llama_agent import optimize_route

app = Flask(__name__)


truck_data = [...]  # Populate with truck information
hub_data = [...]    # Populate with hub information
driver_data = [...] # Populate with driver information

@app.route('/api/book', methods=['POST'])
def book_truck():
    data = request.json
    source = data['source']
    destination = data['destination']
    time = data['time']
    
    optimized_route = optimize_route(source, destination, time, truck_data, hub_data, driver_data)
    
    # Save booking to database (not implemented here)
    
    return jsonify({"message": "Booking successful", "optimized_route": optimized_route})

@app.route('/api/recommendations', methods=['GET'])
def get_recommendations():
    source = request.args.get('source')
    destination = request.args.get('destination')
    time = request.args.get('time')
    
    optimized_route = optimize_route(source, destination, time, truck_data, hub_data, driver_data)
    
    return jsonify({"recommendations": optimized_route})

if __name__ == '__main__':
    app.run(debug=True)
