# from flask import Blueprint, request, jsonify
# from app.services.vector_service import update_vector_db
# from app.services.llama_service import optimize_route
#
# api = Blueprint('api', __name__)
#
# @api.route('/booking', methods=['POST'])
# def create_booking():
#     # Your existing booking creation logic here
#     # After creating the booking:
#     booking_id = 123  # Replace with actual booking ID
#     update_vector_db(booking_id)
#     return jsonify({"message": "Booking created and vector DB updated"}), 201
#
# @api.route('/optimize_route', methods=['POST'])
# def get_optimized_route():
#     data = request.json
#     optimized_route = optimize_route(
#         data['truck_owner_id'],
#         data['source'],
#         data['destination'],
#         data['time']
#     )
#     return jsonify({"optimized_route": optimized_route})