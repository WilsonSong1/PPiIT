import sqlite3
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User
import json

@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            # Parse JSON data
            data = json.loads(request.body)
            
            # Validate required fields
            required_fields = ['name', 'email', 'password', 'dob', 'phone', 
                             'address', 'security_question', 'security_answer', 'role']
            if not all(field in data for field in required_fields):
                return JsonResponse({'error': 'Missing required fields'}, status=400)
            
            # Check if email already exists
            conn = sqlite3.connect('db.sqlite3')
            cursor = conn.cursor()
            cursor.execute("SELECT email FROM api_user WHERE email = ?", (data['email'],))
            if cursor.fetchone():
                conn.close()
                return JsonResponse({'error': 'Email already exists'}, status=400)
            conn.close()
            
            # Create user
            try:
                uid = User.create_user(data)
                return JsonResponse({
                    'status': 'success',
                    'uid': uid,
                    'message': 'User registered successfully'
                }, status=201)
            except ValueError as e:
                return JsonResponse({'error': str(e)}, status=400)
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': f'Server error: {str(e)}'}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)