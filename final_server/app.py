import os
import requests
import json 
import csv
from datetime import datetime
from nanonets import NANONETSOCR
import pandas as pd
from flask import Flask, request, jsonify, send_file
from werkzeug.utils import secure_filename
from modelcheck import process_input

from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient("")
db = client["Kavach"]
# collection_name = "formats_to_csv"
collection = db["formats_to_csv"]
ifsc_codes = db['ifsc_codes']


# csv_file_path = r"X:\Computational project\bla\frontend-2-b\final_server\IFSC.csv"
# with open(csv_file_path, "r") as csv_file:
#     csv_reader = csv.DictReader(csv_file)
#     for row in csv_reader:
#         ifsc_codes.insert_one(row)

# # Close the MongoDB connection
# client.close()

# Set the folder where the uploaded files will be stored
UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


API_KEY = "vevywa@lettrs.email_4075192b85ba9fed6f593f64fcdf69282ce43652da4edcc98df2ec3b2a673f9bc53d9807"
# API_KEY = "lumatequ@chronicle.digital_d7b96cae7552d8b63e62fa8737c840f56878f444d5792724f076f991ef811926440e4962"

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
        current_datetime = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
        # current_datetime = 'something'  # Convert to a formatted string
        print("File saved as a :", current_datetime)  
        csv_file = convert_pdf_to_csv(file_path, current_datetime)
        if csv_file:
            print(csv_file)
        
            some = process_input(r"X:\Computational project\bla\frontend-2-b\final_server\uploads\minibank.csv")
            # some = process_input(csv_file)
            print(some)
            return send_file(csv_file, as_attachment=True)
        else:
            return jsonify({"error": "Failed to convert PDF to CSV."}), 500
    return jsonify({"error": "No file uploaded."}), 400


import csv

def clean_numeric_value(value):
    # Convert value to string
    value = str(value)

    # Remove all characters after the first period (.)
    cleaned_value = value.split('.', 1)[0]
    
    return cleaned_value

def remove_extra_lines(file_path):
    # Read the CSV file and skip the first 3 lines
    lines = []
    with open(file_path, 'r') as csvfile:
        csvreader = csv.reader(csvfile)
        for _ in range(3):
            next(csvreader)  # Skip the first 3 lines
        lines.extend(csvreader)

    # Store the original header and 'CHQ' column separately
    header = lines.pop(0)

    # Remove the thousand separators from numeric values and write the remaining lines back to the CSV file
    with open(file_path, 'w', newline='') as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerow(header)  # Write the original header back
        for line in lines:
            cleaned_line = []
            for i, value in enumerate(line):
                if i == 2:  # Clean 'CHQ' column (remove commas)
                    cleaned_value = clean_numeric_value(value)
                else:
                    cleaned_value = clean_numeric_value(value)
                    try:
                        # Convert the value to float
                        cleaned_value = float(cleaned_value)
                    except ValueError:
                        pass
                
                cleaned_line.append(cleaned_value)
            csvwriter.writerow(cleaned_line)


# @app.route('/export-csv/<image_unique_id>', methods=['GET'])
def export_to_csv(image_unique_id):
    try:
        # Query CSV data based on the associated image unique identifier
        query = {"image_unique_id": image_unique_id}
        data_cursor = collection.find(query)

        # Replace colons with underscores in the timestamp
        timestamp_for_filename = image_unique_id.replace(":", "_")

        # Specify the CSV file path with the modified timestamp
        csv_file_path = f"data_export_{timestamp_for_filename}.csv"

        # Write data to CSV
        with open(csv_file_path, "w", newline="", encoding="utf-8") as csv_file:
            csv_writer = csv.DictWriter(csv_file, fieldnames=data_cursor[0].keys())
            csv_writer.writeheader()
            for document in data_cursor:
                csv_writer.writerow(document)

        return jsonify({"message": f"Data exported to {csv_file_path}"})

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


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
        model.set_token('39a01947-3102-11ee-85b5-42d8cd23d215')

        # Convert the file to CSV
        # Generate a unique output file name using datetime.now()
        output_file_name = datetime.now().strftime('%Y-%m-%d_%H-%M-%S') + '.csv'
        
        # Update the file path to save the output file in the upload folder
        output_file_path = os.path.join(app.config['UPLOAD_FOLDER'], output_file_name)

        model.convert_to_csv(file_path, output_file_path)
        print('File got saved as:', output_file_path)

        # Remove the extra lines from the CSV file
        remove_extra_lines(output_file_path)



        # Process the cleaned CSV file using the 'process_input' function
        processed_data = process_input(output_file_path)
        print(processed_data)

        image_unique_id = datetime.now().strftime('%Y:%m:%d:%H:%M:%S')

        with open(output_file_path, "r") as csv_file:
            csv_reader = csv.DictReader(csv_file)
            for row in csv_reader:
                # Include the image_unique_id in the row data
                row["image_unique_id"] = image_unique_id
                collection.insert_one(row)

        # Close the MongoDB connection


        export_to_csv(image_unique_id)
        client.close()
        # Return the CSV file as a response
        return jsonify({"message": "CSV file converted and processed successfully", "output_file": output_file_name})
    
        
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
        print(csv_file)
        some = process_input(csv_file)
        print(some)
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
        some = process_input(r"X:\Computational project\bla\frontend-2-b\final_server\uploads\minibank.csv")
        print(some)
        return send_file(csv_file, as_attachment=True)
    return jsonify({"error": "No file uploaded."}), 400


if __name__ == '__main__':
    app.run(debug=True)
