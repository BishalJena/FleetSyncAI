# llama_agent.py
import pandas as pd
from llama_cpp import Llama

# Initialize Llama model
llm = Llama(model_path="path_to_llama_model")

def optimize_route(source, destination, time, truck_data, hub_data, driver_data):
    # Create a DataFrame for the truck, hub, and driver data
    truck_df = pd.DataFrame(truck_data)
    hub_df = pd.DataFrame(hub_data)
    driver_df = pd.DataFrame(driver_data)

    # Sample optimization logic using Llama model
    input_data = {
        "source": source,
        "destination": destination,
        "time": time,
        "truck_data": truck_df.to_dict(),
        "hub_data": hub_df.to_dict(),
        "driver_data": driver_df.to_dict(),
    }

    # Use Llama model to optimize route
    response = llm(input_data)
    
    return response['optimized_route']
