import os
from flask import Flask
from flask import jsonify
from flask import request
from flask import Blueprint
from datetime import datetime

blueprint_api_histo_time = Blueprint("api_histo_time", __name__, url_prefix="")

data = {
    "datetime": None
}

@blueprint_api_histo_time.route('/api/datetime', methods=['POST'])
def create_datetime():
    try:
        datetime_str = request.json["datetime"]
        new_datetime = datetime.strptime(datetime_str, "%Y-%m-%d %H:%M:%S")
        data["datetime"] = new_datetime
        return jsonify({"message": "Datetime created successfully!"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@blueprint_api_histo_time.route('/api/datetime', methods=['GET'])
def get_datetime():
    return jsonify({"datetime": data["datetime"]})

@blueprint_api_histo_time.route('/api/datetime', methods=['PUT'])
def update_datetime():
    try:
        datetime_str = request.json["datetime"]
        updated_datetime = datetime.strptime(datetime_str, "%Y-%m-%d %H:%M:%S")
        data["datetime"] = updated_datetime
        return jsonify({"message": "Datetime updated successfully!"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    blueprint_api_histo_time.run()
