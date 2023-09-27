from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow React to access the API

# Dummy data for overlays (replace with MongoDB or your database)
overlays = []

@app.route('/api/overlays', methods=['GET', 'POST'])
def manage_overlays():
    if request.method == 'GET':
        return jsonify(overlays)
    elif request.method == 'POST':
        data = request.json
        overlay = {'content': data['content']}  # Create a new overlay
        overlays.append(overlay)
        return jsonify(overlay), 201

if __name__ == '__main__':
    app.run(debug=True)
