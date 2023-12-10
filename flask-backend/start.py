# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask, jsonify
from flask_cors import CORS
import pymysql.cursors 
# Flask constructor takes the name of 
# current module (__name__) as argument.
app = Flask(__name__)
# CORS(app,resources={r"/api/*": {"origins": "http://127.0.0.1:3000"}})
# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.
@app.route('/')
# ‘/’ URL is bound with hello_world() function.
def hello_world():
    return 'Hello World'

@app.route('/hello/<name>')
def hello_name(name):
   return 'Hello %s!' % name
 
# Function to establish a database connection
def connect_to_database():
    try:
        connection = pymysql.connect(
            host='localhost',
            user='root',
            password='root',
            database='apsystem',
            cursorclass=pymysql.cursors.DictCursor
        )
        return connection
    except pymysql.MySQLError as e:
        print(f"Error connecting to database: {e}")
        return None

# Route to retrieve appointment data
@app.route('/appointments', methods=['GET'])
def get_appointments():
    connection = connect_to_database()
    if connection is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500

    try:
        print("trying")
        with connection.cursor() as cursor:
            print(cursor)
            sql = """SELECT c.name as consultant, 
                            a.slot_datetime as slot, a.status
                     FROM appointment_slots a
                     INNER JOIN consultants c ON a.consultant_id = c.id
                    """
                     
            cursor.execute(sql)
            print("trying2")
            appointments = cursor.fetchall()
            print("trying3")
            print(appointments)
            print("trying4")
            response = jsonify(appointments)
            print(response)
            response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
            return response
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        connection.close()
        
# main driver function
if __name__ == '__main__':
 
    # run() method of Flask class runs the application 
    # on the local development server.
    app.run()