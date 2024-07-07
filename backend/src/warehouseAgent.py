from db_utils import fetch_warehouse_data

class WarehouseAIAgent:
    def __init__(self, groq_api_key):
        self.groq_api_key = groq_api_key

    def optimize_warehouse(self):
        warehouse_data = fetch_warehouse_data()

        if warehouse_data is None:
            return {"message": "No warehouse data available"}

        optimized_routes = {}

        for item in warehouse_data:
            optimized_routes[item['id']] = f"Optimized route for {item['name']}"

        return {"message": "Warehouse optimized", "optimized_routes": optimized_routes}
