"""
Simple test script to check the yantra generation API
"""
import requests
import json

# Test data
test_request = {
    "coordinates": {
        "latitude": 12.9716,
        "longitude": 77.5946, 
        "elevation": 920
    },
    "yantra_type": "samrat_yantra",
    "reference_location": "jaipur",
    "scale_factor": 1.0
}

# Test with empty yantra_type to reproduce the error
error_request = {
    "coordinates": {
        "latitude": 12.9716,
        "longitude": 77.5946,
        "elevation": 920
    },
    "yantra_type": "",  # Empty string to reproduce the error
    "reference_location": "jaipur",
    "scale_factor": 1.0
}

def test_api():
    print("Testing YANTRA.AI API")
    print("=" * 40)
    
    # Test 1: Valid request
    print("TEST 1: Valid Request")
    try:
        response = requests.post(
            "http://localhost:8000/yantras/generate",
            json=test_request,
            timeout=10
        )
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"Success: Generated {result['name']}")
            print(f"Dimensions: {len(result['dimensions'])} parameters")
            print(f"Angles: {len(result['angles'])} parameters")
        else:
            print(f"Error: {response.text}")
    except requests.exceptions.ConnectionError:
        print("ERROR: Cannot connect to API server. Is it running on localhost:8000?")
    except Exception as e:
        print(f"ERROR: {e}")
    
    print()
    
    # Test 2: Empty yantra_type (reproduce the original error)
    print("TEST 2: Empty yantra_type (reproducing original error)")
    try:
        response = requests.post(
            "http://localhost:8000/yantras/generate",
            json=error_request,
            timeout=10
        )
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
    except requests.exceptions.ConnectionError:
        print("ERROR: Cannot connect to API server")
    except Exception as e:
        print(f"ERROR: {e}")

if __name__ == "__main__":
    test_api()