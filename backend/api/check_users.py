import sqlite3

def check_registered_users():
    """Directly check SQLite database contents"""
    conn = sqlite3.connect('db.sqlite3')
    cursor = conn.cursor()
    
    # Get table info
    cursor.execute("PRAGMA table_info(api_user)")
    columns = cursor.fetchall()
    print("Table columns:")
    for col in columns:
        print(f"{col[1]} ({col[2]})")
    
    # Get all users
    cursor.execute("SELECT uid, name, email FROM api_user")
    users = cursor.fetchall()
    
    print("\nRegistered users:")
    for user in users:
        print(f"UID: {user[0]}, Name: {user[1]}, Email: {user[2]}")
    
    conn.close()

if __name__ == '__main__':
    check_registered_users()