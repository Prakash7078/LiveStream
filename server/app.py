# from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import ObjectId  # Import ObjectId

from flask import Flask, Response
import cv2

app = Flask(__name__)

# app.config['MONGO_URI'] = 'mongodb+srv://Prakash:nanna143@nodeexpressprojects.ajvjxpz.mongodb.net/FlaskPractice?retryWrites=true&w=majority'
# mongo = PyMongo(app)

# # Get the 'users' collection from the MongoDB database
# db = mongo.db.users

CORS(app)

# @app.route("/users", methods=['POST'])
# def createUser():
#     # Use insert_one to insert a single document
#     user_data = {
#         'name': request.json['name'],
#         'email': request.json['email'],
#         'password': request.json['password'],
#     }
#     result = db.insert_one(user_data)

#     # Return the inserted document's ID as a string
#     return jsonify({'id': str(result.inserted_id), 'msg': "user added successfully"})
# @app.route("/users",methods=['GET'])
# def getUser():
#     result=db.find({})
#     users = [{'_id': str(user['_id']), 'name': user['name'], 'email': user['email']} for user in result]
#     return jsonify({'users':users})

camera = cv2.VideoCapture(0)  # use 0 for web camera
#  for cctv camera use rtsp://username:password@ip_address:554/user=username_password='password'_channel=channel_number_stream=0.sdp' instead of camera

def gen_frames():  # generate frame by frame from camera
    while True:
        # Capture frame-by-frame
        success, frame = camera.read()  # read the camera frame
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result


@app.route('/video_feed')
def video_feed():
    """Video streaming route. Put this in the src attribute of an img tag."""
    return Response(gen_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')





if __name__ == '__main__':
    app.run(host='0.0.0.0')
    
# if __name__ == '__main__':
#     app.run(debug=True)
