import os
import requests
import json 
from datetime import datetime
from nanonets import NANONETSOCR
import pandas as pd
from flask import Flask, request, jsonify, send_file
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Set the folder where the uploaded files will be stored
UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# The authentication key (API Key).
# Replace 'YOUR_API_KEY' with your actual API key.
API_KEY = "vekobo2764@quipas.com_b22293ea83242d39f31b82625de1280d3dae5b99bf3c5b8353253301174e670477c28447"

# Base URL for PDF.co Web API requests
BASE_URL = "https://api.pdf.co/v1"

def convert_pdf_to_csv(pdf_path, output_file_name):
    """Converts PDF To CSV using PDF.co Web API"""

    # Prepare requests params as JSON
    # See documentation: https://apidocs.pdf.co
    parameters = {}
    parameters["name"] = os.path.basename(output_file_name)
    parameters["password"] = ""
    parameters["pages"] = ""
    parameters["url"] = upload_file(pdf_path)

    # Prepare URL for 'PDF To CSV' API request
    url = "{}/pdf/convert/to/csv".format(BASE_URL)

    # Execute request and get response as JSON
    response = requests.post(url, data=parameters, headers={"x-api-key": API_KEY})
    if response.status_code == 200:
        json = response.json()

        if json["error"] == False:
            # Get URL of result file
            result_file_url = json["url"]
            # Download result file
            r = requests.get(result_file_url, stream=True)
            if r.status_code == 200:
                csv_filename = f"{output_file_name}.csv"
                csv_path = os.path.join(app.config['UPLOAD_FOLDER'], csv_filename)
                with open(csv_path, 'wb') as file:
                    for chunk in r:
                        file.write(chunk)
                return csv_path
            else:
                print(f"Request error: {response.status_code} {response.reason}")
        else:
            # Show service reported error
            print(json["message"])
    else:
        print(f"Request error: {response.status_code} {response.reason}")

    return None


def upload_file(file_path):
    """Uploads file to the cloud"""

    # Prepare URL for 'Get Presigned URL' API request
    url = "{}/file/upload/get-presigned-url?contenttype=application/octet-stream&name={}".format(
        BASE_URL, os.path.basename(file_path))

    # Execute request and get response as JSON
    response = requests.get(url, headers={"x-api-key": API_KEY})
    if response.status_code == 200:
        json = response.json()

        if json["error"] == False:
            # URL to use for file upload
            upload_url = json["presignedUrl"]
            # URL for future reference
            uploaded_file_url = json["url"]

            # Upload file to cloud
            with open(file_path, 'rb') as file:
                requests.put(upload_url, data=file, headers={"x-api-key": API_KEY, "content-type": "application/octet-stream"})

            return uploaded_file_url
        else:
            # Show service reported error
            print(json["message"])
    else:
        print(f"Request error: {response.status_code} {response.reason}")

    return None


# Function to convert JSON to CSV
def convert_json_to_csv(file_path, output_file_name):
    with open(file_path) as f:
        data = pd.read_json(f)
        current_datetime_str = output_file_name.strftime('%Y-%m-%d_%H-%M-%S')
    csv_path = os.path.join(app.config['UPLOAD_FOLDER'], current_datetime_str + ".csv")
    data.to_csv(csv_path, index=False)
    return csv_path


# Function to convert XML to CSV
def convert_xml_to_csv(file_path,  output_filename):
    data = pd.read_xml(file_path)
    # csv_path = file_path.replace('.xml', '.csv')
    # data.to_csv(csv_path, index=False)
    current_datetime_str = output_filename.strftime('%Y-%m-%d_%H-%M-%S')
    csv_path = os.path.join(app.config['UPLOAD_FOLDER'], current_datetime_str + ".csv")
    data.to_csv(csv_path, index=False)
    return csv_path

# ... (existing code)

# Function to convert image to CSV using Nanonets OCR API
  
@app.route('/pdf-to-csv', methods=['POST'])
def pdf_to_csv():
    file = request.files['file']
    if file:
        filename = file.filename
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        # print("File saved:", filename)  
        current_datetime = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')  # Convert to a formatted string
        print("File saved as a :", current_datetime)  
        csv_file = convert_pdf_to_csv(file_path, current_datetime)
        if csv_file:
            return send_file(csv_file, as_attachment=True)
        else:
            return jsonify({"error": "Failed to convert PDF to CSV."}), 500
    return jsonify({"error": "No file uploaded."}), 400


@app.route('/image-to-csv', methods=['POST'])
def convert_to_csv():
    try:
        # Get the file from the request
        file = request.files['file']
        
        # Save the file to a temporary location
        file_path = 'temp_file.png'
        file.save(file_path)

        # Initialize the NANONETSOCR model
        model = NANONETSOCR()
        model.set_token('6568f9ac-2257-11ee-99fe-7ea725c3c90d')

        # Convert the file to CSV
        # output_file_name = 'outpu4t.csv'
                # Generate a unique output file name using datetime.now()
        output_file_name = datetime.now().strftime('%Y-%m-%d_%H-%M-%S') + '.csv'
        
        # Update the file path to save the output file in the upload folder
        output_file_path = os.path.join(app.config['UPLOAD_FOLDER'], output_file_name)

        model.convert_to_csv(file_path, output_file_path)
        print('file got saved as a', output_file_name)

        # Return the CSV file as a response
        return jsonify({"message": "CSV file converted successfully", "output_file": output_file_name})
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})



@app.route('/json-to-csv', methods=['POST'])
def json_to_csv():
    file = request.files['file']
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        current_datetime = datetime.now()
        csv_file = convert_json_to_csv(file_path, current_datetime)
        return send_file(csv_file, as_attachment=True)
    return jsonify({"error": "No file uploaded."}), 400


@app.route('/xml-to-csv', methods=['POST'])
def xml_to_csv():
    file = request.files['file']
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        current_datetime = datetime.now()
        csv_file = convert_xml_to_csv(file_path,current_datetime)
        return send_file(csv_file, as_attachment=True)
    return jsonify({"error": "No file uploaded."}), 400


if __name__ == '__main__':
    app.run(debug=True)
