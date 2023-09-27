from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson import ObjectId  # Import ObjectId

app = Flask(__name__)
CORS(app)  # Enable CORS to allow React to access the API
app.config['MONGO_URI'] = 'mongodb+srv://Prakash:nanna143@nodeexpressprojects.ajvjxpz.mongodb.net/FlaskPractice?retryWrites=true&w=majority'
mongo = PyMongo(app)
db = mongo.db.users
# Dummy data for overlays (replace with MongoDB or your database)

@app.route('/api/overlays/delete/<string:id>', methods=['DELETE'])
def delete_overlay(id):
    try:
        db.delete_one({'_id': ObjectId(id)})
        return jsonify({'msg': 'Overlay deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/overlays', methods=['GET', 'POST'])
def manage_overlays():
    if request.method == 'GET':
        result=db.find({})
        overlays = [{'_id': str(user['_id']),'url':user['url'],'content':user['content']} for user in result]
        return jsonify({'overlays':overlays})
    elif request.method == 'POST':
        data = request.json
        user_data = {
            'url':data['url'],
            'content':data['content']
        }
        result = db.insert_one(user_data)
        return jsonify({'id': str(result.inserted_id), 'msg': "overlay added successfully"})


if __name__ == '__main__':
    app.run(debug=True)
