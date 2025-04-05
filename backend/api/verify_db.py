import sqlite3
from django.conf import settings

def verify_registrations():
    """Directly verify SQLite database contents"""
    db_path = settings.BASE_DIR / 'db.sqlite3'
    
    try:
        conn = sqlite3.connect(str(db_path))
        cursor = conn.cursor()
        
        # Check table exists
        cursor.execute("""
            SELECT name FROM sqlite_master 
            WHERE type='table' AND name='api_user'
        """)
        if not cursor.fetchone():
            print("Error: api_user table doesn't exist")
            return
        
        # Get all registrations
        cursor.execute("""
            SELECT uid, name, email, dob, phone, role 
            FROM api_user 
            ORDER BY uid
        """)
        
        print("\nRegistered Users in SQLite:")
        print("-" * 50)
        for row in cursor.fetchall():
            print(f"UID: {row[0]}")
            print(f"Name: {row[1]}")
            print(f"Email: {row[2]}")
            print(f"DOB: {row[3]}")
            print(f"Phone: {row[4]}")
            print(f"Role: {row[5]}")
            print("-" * 50)
            
    except sqlite3.Error as e:
        print(f"Database error: {str(e)}")
    finally:
        if conn:
            conn.close()

if __name__ == '__main__':
    verify_registrations()