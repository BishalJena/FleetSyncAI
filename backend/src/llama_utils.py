import requests

class LlamaAgent:
    def __init__(self, api_key):
        self.api_key = api_key

    def generate_response(self, messages, model_name):
        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        data = {
            "messages": messages,
            "model": model_name
        }
        response = requests.post(url, json=data, headers=headers)
        return response.json()

    for item in data:
    # Check if 'name' exists in item before accessing
        if 'name' in item:
            optimized_routes[item['id']] = f"Optimized route for {item['name']}"
        else:
            # Handle case where 'name' key is missing
            optimized_routes[item['id']] = "Optimized route"

