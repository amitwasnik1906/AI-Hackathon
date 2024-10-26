from meta_ai_api import MetaAI
import json
import sys
import requests

ai = MetaAI()

# Get user ID from stdin or any other means
user_id = sys.stdin.read().strip()

# Fetch user and order information from the backend
def fetch_user_order_info(user_id):
    # Replace 'http://your-backend-url/api/users/' with your actual backend URL
    response = requests.get(f'http://your-backend-url/api/users/{user_id}/order')
    
    if response.status_code == 200:
        return response.json()  # Return the JSON response if successful
    else:
        raise Exception("Failed to fetch user order information")

try:
    # Call the function to fetch user order information
    user_order_info = fetch_user_order_info(user_id)

    # Extract necessary details
    user = user_order_info['user']  # User's ID or name
    items = user_order_info['items']  # List of items in the order
    total_amount = user_order_info['totalAmount']  # Total amount of the order
    shipping_address = user_order_info['shippingAddress']  # Shipping address
    status = user_order_info['status']  # Status of the order

    # Construct the prompt for product recommendations
    order_details = {
        "user": user,
        "items": items,
        "total_amount": total_amount,
        "shipping_address": shipping_address,
        "status": status
    }

    recommendation_prompt = "(Give me product recommendations for smartphones and electronics based on this order) {\"order_details\": " + json.dumps(order_details) + "}. Based on this, recommend products that are related to smartphones and electronics that complement the items in the user's order in a structured JSON format. Provide an array of objects named as recommended_products inside of it. No description required. Give me the overall recommendation based on the order details."

    # Get response
    response = ai.prompt(message=recommendation_prompt)

    # Attempt to parse the AI's response into the expected structure
    try:
        # Parse response to get the recommended products
        recommended_products = json.loads(response["message"])

        # Check if it matches the expected structure
        if "recommended_products" in recommended_products and isinstance(recommended_products["recommended_products"], list):
            output_response = json.dumps(recommended_products, separators=(',', ':'))
        else:
            # If the structure is not as expected, create an empty response
            output_response = json.dumps({"recommended_products": []}, separators=(',', ':'))

    except json.JSONDecodeError:
        # Handle invalid JSON responses
        output_response = json.dumps({"recommended_products": []}, separators=(',', ':'))

except Exception as e:
    # Handle any errors that occurred during the fetching of user order info
    print(json.dumps({"error": str(e)}, separators=(',', ':')))
    sys.exit(1)

# Print the result
print(output_response)