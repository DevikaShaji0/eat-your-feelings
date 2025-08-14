#!/usr/bin/env python3
"""
Backend API Testing for Eat Your Feelings Website
Tests the Gemini AI integration and mood-suggestion endpoints
"""

import requests
import json
import sys
from datetime import datetime

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return None

BASE_URL = get_backend_url()
if not BASE_URL:
    print("ERROR: Could not get REACT_APP_BACKEND_URL from frontend/.env")
    sys.exit(1)

API_URL = f"{BASE_URL}/api"
print(f"Testing backend API at: {API_URL}")

def test_health_check():
    """Test the basic health check endpoint"""
    print("\n=== Testing Health Check Endpoint ===")
    try:
        response = requests.get(f"{API_URL}/", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Hello World":
                print("✅ Health check PASSED")
                return True
            else:
                print("❌ Health check FAILED - Wrong message")
                return False
        else:
            print(f"❌ Health check FAILED - Status code: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Health check FAILED - Network error: {e}")
        return False
    except Exception as e:
        print(f"❌ Health check FAILED - Error: {e}")
        return False

def test_mood_suggestion(mood_text, test_name):
    """Test mood suggestion endpoint with specific mood"""
    print(f"\n=== Testing Mood Suggestion: {test_name} ===")
    print(f"Input mood: '{mood_text}'")
    
    try:
        payload = {"mood": mood_text}
        response = requests.post(f"{API_URL}/mood-suggestion", 
                               json=payload, 
                               timeout=30)  # Longer timeout for AI processing
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            
            # Validate response structure
            required_fields = ["food", "recipe", "roast", "mood"]
            missing_fields = [field for field in required_fields if field not in data]
            
            if missing_fields:
                print(f"❌ FAILED - Missing fields: {missing_fields}")
                return False
            
            # Check if fields have content
            empty_fields = [field for field in required_fields if not data[field].strip()]
            if empty_fields:
                print(f"❌ FAILED - Empty fields: {empty_fields}")
                return False
            
            # Validate mood matches input
            if data["mood"] != mood_text:
                print(f"❌ FAILED - Mood mismatch. Expected: '{mood_text}', Got: '{data['mood']}'")
                return False
            
            print("✅ Mood suggestion PASSED")
            return True
            
        else:
            print(f"❌ FAILED - Status code: {response.status_code}")
            try:
                error_data = response.json()
                print(f"Error response: {error_data}")
            except:
                print(f"Error response: {response.text}")
            return False
            
    except requests.exceptions.Timeout:
        print("❌ FAILED - Request timeout (AI processing took too long)")
        return False
    except requests.exceptions.RequestException as e:
        print(f"❌ FAILED - Network error: {e}")
        return False
    except Exception as e:
        print(f"❌ FAILED - Error: {e}")
        return False

def test_mood_suggestion_error_handling():
    """Test error handling with invalid inputs"""
    print("\n=== Testing Error Handling ===")
    
    # Test empty mood
    try:
        payload = {"mood": ""}
        response = requests.post(f"{API_URL}/mood-suggestion", json=payload, timeout=10)
        print(f"Empty mood - Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if all(field in data for field in ["food", "recipe", "roast", "mood"]):
                print("✅ Empty mood handled gracefully")
            else:
                print("❌ Empty mood - Invalid response structure")
        else:
            print("❌ Empty mood - Server error")
            
    except Exception as e:
        print(f"❌ Empty mood test failed: {e}")
    
    # Test missing mood field
    try:
        payload = {}
        response = requests.post(f"{API_URL}/mood-suggestion", json=payload, timeout=10)
        print(f"Missing mood field - Status: {response.status_code}")
        
        if response.status_code == 422:  # FastAPI validation error
            print("✅ Missing field validation working")
        else:
            print("❌ Missing field validation not working properly")
            
    except Exception as e:
        print(f"❌ Missing field test failed: {e}")

def run_all_tests():
    """Run all backend tests"""
    print("=" * 60)
    print("BACKEND API TESTING - EAT YOUR FEELINGS")
    print(f"Timestamp: {datetime.now()}")
    print("=" * 60)
    
    results = []
    
    # Test 1: Health Check
    results.append(("Health Check", test_health_check()))
    
    # Test 2: Various mood suggestions
    mood_tests = [
        ("I'm feeling really sad and depressed", "Sad/Depressed Mood"),
        ("I'm angry and frustrated with work", "Angry/Frustrated Mood"),
        ("I'm super stressed about everything", "Stressed Mood"),
        ("I'm bored out of my mind", "Bored Mood"),
        ("I'm feeling anxious and worried", "Anxious/Worried Mood"),
        ("I'm happy and excited!", "Happy Mood"),
        ("I feel lonely", "Lonely Mood")
    ]
    
    for mood_text, test_name in mood_tests:
        results.append((test_name, test_mood_suggestion(mood_text, test_name)))
    
    # Test 3: Error handling
    test_mood_suggestion_error_handling()
    
    # Summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    passed = 0
    failed = 0
    
    for test_name, result in results:
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
        else:
            failed += 1
    
    print(f"\nTotal Tests: {len(results)}")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    
    if failed == 0:
        print("\n🎉 ALL TESTS PASSED!")
        return True
    else:
        print(f"\n⚠️  {failed} TESTS FAILED")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)