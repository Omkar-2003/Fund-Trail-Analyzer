import pickle
import pandas as pd
import plotly.express as px
import plotly.io as pio
import os
from flask import Flask, request, jsonify
from IPython.display import Image
from IPython.display import HTML 

# # Load the functions from the pickled file
# with open('plots.pkl', 'rb') as f:
#     functions_dict = pickle.load(f)


# print(functions_dict.keys())

# # Extract individual functions from the functions dictionary
# generate_pie_chart = functions_dict['Pie Chart']
# generate_another_pie_chart = functions_dict['Another Pie Chart']
# generate_scatter_plot = functions_dict['Scatter Plot']
# generate_line_plot = functions_dict['Line Plot']



app = Flask(__name__)

@app.route('/process_input', methods=['POST'])
def process_input():
    
    import pandas as pd
    import pickle
    import plotly.express as px
    import plotly.io as pio
    
    def process_input1():
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400

        file = request.files['file']
        print(file)
        
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        # Save the uploaded file to a temporary location
        # temp_file_path = 'temp_file.csv'
        # file.save(temp_file_path)

        # Read the input data from the temporary file
        df = pd.read_csv(file)
        data=df
        data=data.drop(['Label'], axis=1)
        data['Label'] = None
        data = data.drop(['Serial No'], axis=1)
        data['Serial No'] = data.reset_index().index + 1

        data['WITHDRAWAL AMT'] = data['WITHDRAWAL AMT'].str.replace(',', '')  # Remove commas
        data['WITHDRAWAL AMT'] = data['WITHDRAWAL AMT'].astype('float64')    # Convert to float64
        data['WITHDRAWAL AMT'].fillna(0, inplace=True)

        data['DEPOSIT AMT'] = data['DEPOSIT AMT'].str.replace(',', '')  # Remove commas
        data['DEPOSIT AMT'] = data['DEPOSIT AMT'].astype('float64')    # Convert to float64
        data['DEPOSIT AMT'].fillna(0, inplace=True)

        data['BALANCE AMT'] = data['BALANCE AMT'].str.replace(',', '')  # Remove commas
        data['BALANCE AMT'] = data['BALANCE AMT'].astype('float64')    # Convert to float64

        return data
        #Functions
    data = process_input1()
    # print(data)

    def identify_zero_withdrawal_and_deposit(df):
        # Check if both 'WITHDRAWAL AMT' and 'DEPOSIT AMT' are 0 and create a boolean mask
        mask = (df['WITHDRAWAL AMT'] == 0) & (df['DEPOSIT AMT'] == 0)

        # Create a new column 'Zero Transaction' and set it to True for rows that satisfy the condition
        df['Zero Transaction'] = mask

        # Count the number of True and False values in the 'Zero Transaction' column
        count_true_values = df['Zero Transaction'].sum()
        count_false_values = len(df) - count_true_values

        print("Count of True values in 'Zero Transaction' column:", count_true_values)
        print("Count of False values in 'Zero Transaction' column:", count_false_values)

        # Get the row indices where 'Zero Transaction' column has True values
        true_indices = df[df['Zero Transaction']].index
        print("Row indices with True values in 'Zero Transaction' column:", true_indices)

        # Assign value 1 to the 'Label' column for rows with 'Zero Transaction' as True
        df.loc[df['Zero Transaction'], 'Label'] = 1

        # Return the DataFrame with the new column
        return df,count_true_values,true_indices

        # Assuming there are 116202 rows in the DataFrame 'data', apply the function
    result,a,A = identify_zero_withdrawal_and_deposit(data)
            
    def create_calculated_balance_column(df):
        # Create a new column named 'Calculated BALANCE'
        df['Calculated BALANCE'] = df['BALANCE AMT'].copy()

        # Loop through the DataFrame starting from the second row (index 1)
        for i in range(1, len(df)):
            # Calculate the calculated balance for row i
            calculated_balance_i = df.loc[i - 1, 'BALANCE AMT'] - df.loc[i, 'WITHDRAWAL AMT'] + df.loc[i, 'DEPOSIT AMT']

            # Store the calculated balance in the 'Calculated BALANCE' column
            df.loc[i, 'Calculated BALANCE'] = calculated_balance_i

        return df

    def find_mismatched_serial_numbers(df):
        # Find mismatched rows by comparing 'BALANCE AMT' with 'Calculated BALANCE'
        mask = df['BALANCE AMT'] != df['Calculated BALANCE']

        # Create a new 'Label' Series and initialize it to NaN
        label_series = pd.Series(index=df.index, dtype='object')

        # Fill the 'Label' Series with existing values from the 'Label' column
        label_series.fillna(df['Label'], inplace=True)

        # Get the serial numbers of the mismatched rows
        mismatched_serial_numbers = df.loc[mask, 'Serial No'].tolist()

        # Get the corresponding mismatched balance values
        mismatched_balances = df.loc[mask, 'BALANCE AMT'].tolist()

        # Count the number of mismatched rows
        total_mismatched_count = len(mismatched_serial_numbers)

        # Iterate through the mismatched rows and update the 'Label' Series
        for index in df[mask].index:
            if pd.notna(label_series[index]):
                label_series[index] = f"{label_series[index]}|2"
            else:
                label_series[index] = '2'

        return mismatched_serial_numbers, total_mismatched_count, label_series, mismatched_balances

    # Assuming you have a DataFrame 'data' with columns 'WITHDRAWAL AMT', 'DEPOSIT AMT', 'BALANCE AMT', 'Serial No', and 'Label'
    df = create_calculated_balance_column(data)

    # Find mismatched serial numbers and update the 'Label' column accordingly
    mismatched_serial_numbers, total_mismatched_count, label_series, mismatched_balances = find_mismatched_serial_numbers(df)

    # Update the 'Label' column with the new values
    df['Label'] = label_series

    # Print the serial numbers and corresponding balances of mismatched rows
    print("Serial numbers of mismatched rows:")
    print(mismatched_serial_numbers)

    print("Corresponding mismatched balances:")
    print(mismatched_balances)

    # Print the total count of mismatched balance rows
    print("Total number of mismatched balance rows:", total_mismatched_count)
    b = len(mismatched_serial_numbers)
    B = mismatched_serial_numbers    

    def count_redundant_values(df, column_name):
        # Drop rows with NaN and 0.0 values in the specified column
        df_without_na_or_zero = df[(df[column_name].notna()) & (df[column_name] != 0.0)]

        # Find duplicate values in the specified column and calculate their count
        redundant_count = df_without_na_or_zero.duplicated(subset=column_name, keep=False).sum()

        return redundant_count

    def find_redundant_values(df, column_name):
        # Drop rows with NaN and 0.0 values in the specified column
        df_without_na_or_zero = df[(df[column_name].notna()) & (df[column_name] != 0.0)]

        # Find duplicate values in the specified column
        duplicates = df_without_na_or_zero[df_without_na_or_zero.duplicated(subset=column_name, keep=False)]

        # Get the row indices where duplicate values occur
        redundant_indices = duplicates.index.tolist()

        # Get the redundant values in the 'CHQ.NO./ Ref No.' column
        redundant_values = duplicates[column_name].tolist()

        # Get the serial numbers of redundant cells from the 'Serial No.' column
        serial_numbers = df.loc[redundant_indices, 'Serial No'].tolist()

        # Assign value 3 to the 'Label' column for rows with redundant cells
        df.loc[redundant_indices, 'Label'] = df.loc[redundant_indices, 'Label'].apply(lambda x: f"{str(x)}|3" if pd.notna(x) else "3")

        return redundant_indices, redundant_values, serial_numbers


    # Applying the function to find the row indices, values, and serial numbers of redundant cells in the 'CHQ.NO./ Ref No.' column
    redundant_indices, redundant_values, serial_numbers = find_redundant_values(data, 'CHQ.NO./ Ref No.')

    # Count the redundant cells (excluding NaN and 0.0 value cells)
    redundant_count = count_redundant_values(data, 'CHQ.NO./ Ref No.')

    # Display the row indices, values, and serial numbers where redundant cells occur
    print("Values of redundant cells:", redundant_values)
    print("Serial numbers of redundant cells:", serial_numbers)

    # Display the count of redundant cells
    print("Count of redundant cells:", redundant_count)
    c = redundant_count
    C = serial_numbers


    def find_nan_values(df, chq_no_column, serial_no_column):
        # Find rows with NaN values in the specified column
        nan_values = df[df[chq_no_column].isna()]

        # Get the serial numbers corresponding to NaN values
        serial_numbers = nan_values[serial_no_column].tolist()

        # Calculate the total count of NaN values
        total_nan_count = nan_values.shape[0]

        return serial_numbers, total_nan_count

    # Assuming you have a DataFrame 'data' with columns 'CHQ.NO./ Ref No.', 'Serial No', and 'Label'
    # Applying the function to find the serial numbers and total count of NaN values in the 'CHQ.NO./ Ref No.' column
    serial_numbers_nan, total_nan_count = find_nan_values(data, 'CHQ.NO./ Ref No.', 'Serial No')

    # Update the 'Label' column with the value "4" for rows with missing UTR
    data.loc[data['Serial No'].isin(serial_numbers_nan), 'Label']=4

    # Display the serial numbers corresponding to NaN values and the total count of NaN values
    print("Serial numbers corresponding to NaN values:", serial_numbers_nan)
    print("Total count of NaN values:", total_nan_count)
    d = total_nan_count
    D = serial_numbers_nan


    import pandas as pd

    def find_zero_values(df, chq_no_column, transaction_detail_column, serial_no_column):
        # Find rows with 0.0 values in the specified column
        zero_values = df[df[chq_no_column] == 0.0]

        # Initialize a list to store the serial numbers of rows where 'Transaction detail' is not specific values
        non_specific_transaction_serial_numbers = []

        for index, row in zero_values.iterrows():
            # Check if the 'Transaction detail' column is not any of the specific values
            if row[transaction_detail_column] not in ['atm settlement', 'settlement charges', 'self deposit']:
                non_specific_transaction_serial_numbers.append(row[serial_no_column])

                # Assign value "5" to the 'Label' column for the current row
                df.at[index, 'Label'] = 5

        return non_specific_transaction_serial_numbers

    # Assuming you have a DataFrame 'data' with columns 'CHQ.NO./ Ref No.', 'TRANSACTION DETAILS', 'Serial No', and 'Label'
    # Applying the function to find the serial numbers of rows with 0.0 values in the 'CHQ.NO./ Ref No.' column
    # and not containing specific values in the 'TRANSACTION DETAILS' column
    non_specific_transaction_serial_numbers = find_zero_values(data, 'CHQ.NO./ Ref No.', 'TRANSACTION DETAILS', 'Serial No')

    # Display the serial numbers corresponding to 0.0 values in the 'CHQ.NO./ Ref No.' column
    # and not containing specific values in the 'TRANSACTION DETAILS' column
    print("Serial numbers corresponding to 0.0 values and not containing specific values:", non_specific_transaction_serial_numbers)

    # Calculate the count of such values
    count_non_specific_transaction = len(non_specific_transaction_serial_numbers)
    print("Count of such values:", count_non_specific_transaction)
    e = count_non_specific_transaction
    E = non_specific_transaction_serial_numbers

    import pandas as pd

    def find_nan_values(df, date_column, value_date_column, serial_no_column):
        # Filter the DataFrame to get rows with NaN values in the 'Date' column
        nan_date_rows = df[df[date_column].isna()]

        # Get the serial numbers corresponding to the NaN values in the 'Date' column
        nan_date_serial_numbers = nan_date_rows[serial_no_column].tolist()

        # Get the count of NaN values in the 'Date' column
        count_nan_dates = nan_date_rows.shape[0]

        # Filter the DataFrame to get rows with NaN values in the 'Value Date' column
        nan_value_date_rows = df[df[value_date_column].isna()]

        # Get the serial numbers corresponding to the NaN values in the 'Value Date' column
        nan_value_date_serial_numbers = nan_value_date_rows[serial_no_column].tolist()

        # Get the count of NaN values in the 'Value Date' column
        count_nan_value_date = nan_value_date_rows.shape[0]

        # Check if there are NaN values in both the 'DATE' and 'VALUE DATE' columns
        nan_rows = df[df[date_column].isna() & df[value_date_column].isna()]

        # Get the serial numbers of the NaN rows
        nan_both_columns_serial_nos = nan_rows[serial_no_column].tolist()

        # Get the count of the NaN rows
        nan_both_columns_row_count = len(nan_rows)

        # Assign value "6" to the 'Label' column for rows with NaN values in both 'Date' and 'Value Date' columns
        df.loc[nan_rows.index, 'Label'] = 6

        return nan_date_serial_numbers, count_nan_dates, nan_value_date_serial_numbers, count_nan_value_date, nan_both_columns_serial_nos, nan_both_columns_row_count

    # Assuming you have a DataFrame 'data' with columns 'DATE', 'VALUE DATE', 'Serial No', and 'Label'
    nan_date_serial_numbers, count_nan_dates, nan_value_date_serial_numbers, count_nan_value_date, nan_both_columns_serial_nos, nan_both_columns_row_count = find_nan_values(data, 'DATE', 'VALUE DATE', 'Serial No')

    # Print the serial numbers corresponding to NaN values in the 'Date' column
    print("Serial numbers corresponding to NaN values in 'Date' column:", nan_date_serial_numbers)

    # Print the count of NaN values in the 'Date' column
    print("Count of NaN values in 'Date' column:", count_nan_dates)

    # Print the serial numbers corresponding to NaN values in the 'Value Date' column
    print("Serial numbers corresponding to NaN values in 'Value Date' column:", nan_value_date_serial_numbers)

    # Print the count of NaN values in the 'Value Date' column
    print("Count of NaN values in 'Value Date' column:", count_nan_value_date)

    # Print the serial numbers of the NaN rows in both 'Date' and 'Value Date' columns
    print("Serial numbers of rows with NaN values in both 'Date' and 'Value Date' columns:", nan_both_columns_serial_nos)

    # Print the count of rows with NaN values in both 'Date' and 'Value Date' columns
    print("Count of rows with NaN values in both 'Date' and 'Value Date' columns:", nan_both_columns_row_count)
    fu = nan_both_columns_row_count
    F = nan_both_columns_serial_nos


    import pandas as pd

    def find_negative_balance(df, balance_column, serial_no_column):
        # Filter the DataFrame to get rows with negative values in the 'BALANCE AMT' column
        negative_balance_rows = df[df[balance_column] < 0]

        # Get the serial numbers corresponding to the negative values in the 'BALANCE AMT' column
        negative_balance_serial_numbers = negative_balance_rows[serial_no_column].tolist()

        # Get the count of negative values in the 'BALANCE AMT' column
        count_negative_balance = negative_balance_rows.shape[0]

        # Assign value "7" to the 'Label' column for rows with negative balance
        df.loc[negative_balance_rows.index, 'Label'] = 7

        return negative_balance_serial_numbers, count_negative_balance

    # Assuming you have a DataFrame 'data' with columns 'BALANCE AMT', 'Serial No', and 'Label'
    negative_balance_serial_numbers, count_negative_balance = find_negative_balance(data, 'BALANCE AMT', 'Serial No')

    # Display the serial numbers corresponding to negative values in the 'BALANCE AMT' column
    print("Serial numbers corresponding to negative values in 'BALANCE AMT':", negative_balance_serial_numbers)

    # Display the count of negative values in the 'BALANCE AMT' column
    print("Count of negative values in 'BALANCE AMT' column:", count_negative_balance)
    g = count_negative_balance
    G = negative_balance_serial_numbers



    def find_cash_deposit_serial_numbers(df, transaction_details_column, serial_no_column):
        # Filter rows where 'TRANSACTION DETAILS' contains "Cash Deposit"
        cash_deposit_rows = df[df[transaction_details_column].str.contains("Cash Deposit", case=False, na=False)]

        # Get the serial numbers from the 'Serial No.' column for the filtered rows
        cash_deposit_serial_numbers = cash_deposit_rows[serial_no_column].tolist()

        # Check if the value in 'BALANCE AMT' is greater than 15000000 for the filtered rows
        large_balance_serial_numbers = cash_deposit_rows[cash_deposit_rows['DEPOSIT AMT'] > 15000000][serial_no_column].tolist()

        # Get the 'BALANCE AMT' for the filtered rows with large balance
        large_balance_amt = cash_deposit_rows[cash_deposit_rows['DEPOSIT AMT'] > 15000000]['DEPOSIT AMT'].tolist()

        # Assign value "8" to the 'Label' column for rows with 'DEPOSIT AMT' > 15000000
        df.loc[cash_deposit_rows[cash_deposit_rows['DEPOSIT AMT'] > 15000000].index, 'Label'] = 8

        return cash_deposit_serial_numbers, large_balance_serial_numbers, large_balance_amt


    # Assuming you have a DataFrame 'data' with columns 'TRANSACTION DETAILS', 'DEPOSIT AMT', 'Serial No', and 'Label'
    cash_deposit_serial_numbers, large_balance_serial_numbers, large_balance_amt = find_cash_deposit_serial_numbers(data, 'TRANSACTION DETAILS', 'Serial No')

    # Display the list of serial numbers corresponding to "Cash Deposit" in the 'TRANSACTION DETAILS' column
    print("Serial numbers corresponding to 'Cash Deposit' transactions:", cash_deposit_serial_numbers)

    # Display the list of serial numbers where 'BALANCE AMT' is greater than 15000000 for "Cash Deposit" transactions
    # print("Serial numbers with 'DEPOSIT AMT' > 15000000 for 'Cash Deposit' transactions:", large_balance_serial_numbers)

    # Display the 'BALANCE AMT' for the rows where 'BALANCE AMT' is greater than 15000000 for "Cash Deposit" transactions
    print("BALANCE AMT for 'Cash Deposit' transactions with 'DEPOSIT' > 15000000:", large_balance_amt)
    h = len(large_balance_amt)
    H = large_balance_serial_numbers

    #creating a function to highlight the anomalies
    import pandas as pd
    import json
    columns = [ 'Serial No','DATE', 'TRANSACTION DETAILS', 'CHQ.NO./ Ref No.', 'VALUE DATE','WITHDRAWAL AMT', 'DEPOSIT AMT', 'BALANCE AMT', 'Label']

    data_f = data.reindex(columns,axis =1)

    data_f = pd.DataFrame(data_f)

    # Convert DataFrame to JSON
    json_data = data_f.to_json(orient="records")

    # Write JSON data to a file (you can also send it to the frontend in a web application)
    with open("data.json", "w") as file:
        file.write(json_data)

    from IPython.display import HTML
    import json

    # Read the content of the "data.json" file
    with open("data.json", "r") as file:
        data = json.load(file)

    # Convert the data to a JSON string
    data_json = json.dumps(data)

    # Define a mapping of number to icon and color
    number_to_icon = {
        1: {'icon': '🚩', 'color': '#ff0000', 'tooltip': 'Zero transaction'},    # Red flag
        2: {'icon': '🚀', 'color': '#00ff00', 'tooltip': 'Mismatch balance'},    # Green flag
        3: {'icon': '⭐', 'color': '#0000ff', 'tooltip': 'Redundant utr'},    # Blue flag
        4: {'icon': '🌟', 'color': '#ffff00', 'tooltip': 'missing utr'},    # Yellow flag
        5: {'icon': '💡', 'color': '#ff00ff', 'tooltip': 'Transaction id 0'},    # Purple flag
        6: {'icon': '🎈', 'color': '#00ffff', 'tooltip':  'missing date'},    # Cyan flag
        7: {'icon': '🔶', 'color': '#ffa500', 'tooltip': 'Negative balance'},    # Orange flag
        8: {'icon': '🎯', 'color': '#800080', 'tooltip': 'suspicious Deposit'},    # Magenta flag
    }

    # Create the HTML content with the JavaScript code
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dataframe Row Highlighting</title>
    <style>
        /* Add any custom styling here */
        /* For example, you can define CSS classes for highlighting rows */
        .highlighted-row {{
        background-color: red;
        }}

        /* Add CSS for the flag icon */
        .flag-icon {{
        border-radius: 50%;
        width: 26px;
        height: 26px;
        display: inline-block;
        text-align: center;
        font-size: 18px;
        padding-top: 2px;
        margin-right: 5px;
        position: relative;
        }}

        /* Apply different colors for different icons */
        .flag-icon.flag-1 {{ background-color: #ff0000; color: #fff; }}
        .flag-icon.flag-2 {{ background-color: #00ff00; color: #000; }}
        .flag-icon.flag-3 {{ background-color: #0000ff; color: #fff; }}
        .flag-icon.flag-4 {{ background-color: #ffff00; color: #000; }}
        .flag-icon.flag-5 {{ background-color: #ff00ff; color: #fff; }}
        .flag-icon.flag-6 {{ background-color: #00ffff; color: #000; }}
        .flag-icon.flag-7 {{ background-color: #ffa500; color: #000; }}
        .flag-icon.flag-8 {{ background-color: #800080; color: #fff; }}
    </style>
    </head>
    <body>
    <!-- Add a placeholder for the data visualization -->
    <div id="data-viz"></div>

    <!-- Include your custom JavaScript code for the visualization -->
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script>
        // Load the data from the Python variable
        const data = {data_json};

        // Function to create the data visualization
        function createDataVisualization(data) {{
        const container = document.getElementById("data-viz");

        // Create a table element
        const table = document.createElement("table");

        // Create table header
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        const headerLabels = ['Serial No', 'DATE', 'TRANSACTION DETAILS', 'CHQ.NO./ Ref No.', 'VALUE DATE', 'WITHDRAWAL AMT', 'DEPOSIT AMT', 'BALANCE AMT', 'Label', 'Flag'];
        headerLabels.forEach(label => {{
            const th = document.createElement("th");
            th.textContent = label;
            headerRow.appendChild(th);
        }});
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement("tbody");

        // Bind data to table rows
        data.forEach(rowData => {{
            const row = document.createElement("tr");

            // Add other columns
            headerLabels.forEach(key => {{
            const cell = document.createElement("td");
            if (key === 'Label') {{
                const labelValue = rowData[key];
                cell.textContent = labelValue;
            }} else if (key === 'Flag') {{
                const labelValue = rowData['Label'];
                const flagIconData = {json.dumps(number_to_icon)}.hasOwnProperty(labelValue) ? {json.dumps(number_to_icon)}[labelValue] : null;
                if (flagIconData) {{
                const flagIcon = document.createElement("span");
                flagIcon.className = "flag-icon flag-" + labelValue;
                flagIcon.setAttribute("title", flagIconData['tooltip']);  // Set the tooltip using the 'title' attribute
                flagIcon.innerHTML = flagIconData['icon'];  // The flag icon doesn't need an extra span
                flagIcon.style.backgroundColor = flagIconData['color'];
                cell.appendChild(flagIcon);
                }}
            }} else {{
                cell.textContent = rowData[key];
            }}
            row.appendChild(cell);
            }});

            // Apply styling to rows based on condition (Label > 0)
            const labelValue = rowData['Label'];
            if (labelValue > 0) {{
            row.classList.add("highlighted-row");
            }}

            // Add the row to the table body
            tbody.appendChild(row);
        }});

        // Add the table body to the table
        table.appendChild(tbody);

        // Add the table to the container
        container.appendChild(table);
        }}

        // Call the function with the provided data
        createDataVisualization(data);
    </script>
    </body>
    </html>
    """

    # Save the figures to PNG files
    output_directory = './output'
    # output_directory = './output'

    os.makedirs(output_directory, exist_ok=True)
    
    # Save the HTML content to a file named "highlight.html"
    with open(".../public/assets/highlight.html", "w") as file:
        file.write(html_content)

    # Display the HTML content in the Jupyter Notebook cell
    # display(HTML(html_content))


    A = list(A)
    B = list(B)
    C = list(C)
    D = list(D)
    E = list(E)
    F = list(F)
    G = list(G)
    H = list(H)

    #merge the list
    merged_anomaly = A + B + C + D + E + F + G + H


    # Function 1 - Pie Chart
    def generate_pie_chart(df, a, b, c, d, e, fu, g, h):
        over_all_data = len(df)
        beta = [a, b, c, d, e, fu, g, h, over_all_data]
        labels = ['Zero transaction', 'Mismatch balance', 'Redundant utr', 'missing utr', 'Transaction id 0', 'missing date', 'Negative balance', 'suspicious Deposit', 'Data']
        colors = ['#FF5733', '#33FF6E', '#FFFF00', '#00FFFF', '#FF00FF', '#FFA500', '#008000', '#800080', '#808080']

        fig = px.pie(labels=labels, values=beta, title="Anomalies in bank statement", names=labels)
        fig.update_traces(textposition='outside', textinfo='percent')

        return fig

    # Function 2 - Another Pie Chart
    def generate_another_pie_chart(df, a, b, c, d, e, fu, g, h):
        over_all_data = len(df)
        beta = [a, b, c, d, e, fu, g, h]
        labels = ['Zero transaction', 'Mismatch balance', 'Redundant utr', 'missing utr', 'Transaction id 0', 'missing date', 'Negative balance', 'suspicious Deposit']
        colors = ['#FF5733', '#33FF6E', '#FFFF00', '#00FFFF', '#FF00FF', '#FFA500', '#008000', '#800080', '#808080']

        fig = px.pie(labels=labels, values=beta, title="Anomalies distribution in bank statement", names=labels,)
        fig.update_traces(textposition='outside', textinfo='percent')

        return fig

    # Function 3 - Scatter Plot
    def generate_scatter_plot(df):
        date = pd.to_datetime(df['DATE'])
        balance = df['BALANCE AMT']

        daily_transaction = pd.DataFrame({'Date': date, 'Balance': balance})

        scatter_plot = px.scatter(daily_transaction, x='Date', y='Balance', title='Daily Transactions')

        return scatter_plot

    # Function 4 - Line Plot
    def generate_line_plot(date, merged_anomaly):
        total_serial_numbers = list(range(1, len(date) + 1))
        data_f = pd.DataFrame({'Serial No': total_serial_numbers, 'Date': date})

        data_f['Is Anomaly'] = data_f['Serial No'].isin(merged_anomaly)
        anomalies_df = data_f[data_f['Is Anomaly']]

        line_plot = px.scatter(anomalies_df, x='Date', y='Serial No',
                            title='Anomalies Scatter Plot',
                            labels={'Date': 'Date', 'Serial No': 'Serial Number'},
                            color='Is Anomaly', # Color points based on whether they are anomalies
                            color_discrete_map={False: 'blue', True: 'red'}, # Set colors for False (not anomaly) and True (anomaly)
                            symbol='Is Anomaly', # Use different symbols for anomalies and non-anomalies
                            symbol_map={False: 'circle', True: 'cross'}, # Set symbols for False and True
                            hover_name='Serial No', # Show serial number on hover
                            hover_data={'Is Anomaly': False} # Hide Is Anomaly from hover
                            )

        return line_plot

    # Generate the figures using the functions and data
    fig_pie = generate_pie_chart(df, a, b, c, d, e, fu, g, h)
    fig_another_pie = generate_another_pie_chart(df, a, b, c, d, e, fu, g, h)
    fig_scatter_plot = generate_scatter_plot(df)
    fig_line_plot = generate_line_plot(df['DATE'], merged_anomaly)


    fig_pie.show()
    fig_another_pie.show()
    fig_scatter_plot.show()
    fig_line_plot.show()
    

    output_file_path_pie = os.path.join(output_directory, 'pie.png')
    output_file_path_another_pie = os.path.join(output_directory, 'another_pie.png')
    output_file_path_scatter_plot = os.path.join(output_directory, 'scatter_plot.png')
    output_file_path_line_plot = os.path.join(output_directory, 'line_plot.png')

    # Use plotly.io.to_image to convert the figures to PNG images
    fig_pie_bytes = pio.to_image(fig_pie, format='png')
    fig_another_pie_bytes = pio.to_image(fig_another_pie, format='png')
    fig_scatter_plot_bytes = pio.to_image(fig_scatter_plot, format='png')
    fig_line_plot_bytes = pio.to_image(fig_line_plot, format='png')

    # Save the bytes to PNG files
    with open(output_file_path_pie, 'wb') as f:
        f.write(fig_pie_bytes)
    with open(output_file_path_another_pie, 'wb') as f:
        f.write(fig_another_pie_bytes)
    with open(output_file_path_scatter_plot, 'wb') as f:
        f.write(fig_scatter_plot_bytes)
    with open(output_file_path_line_plot, 'wb') as f:
        f.write(fig_line_plot_bytes)

    # Save the file in html form
    output_filename_pie = os.path.join(output_directory, 'pie.html')
    pio.write_html(fig_pie, output_filename_pie)

    output_filename_pie2 = os.path.join(output_directory, 'pie2.html')
    pio.write_html(fig_another_pie, output_filename_pie2)

    output_filename_scatter_plot = os.path.join(output_directory, 'scatter_plot.html')
    pio.write_html(fig_scatter_plot, output_filename_scatter_plot)

    output_filename_line_plot = os.path.join(output_directory, 'line_plot.html')
    pio.write_html(fig_line_plot, output_filename_line_plot)
    # Create a dictionary to store the image bytes
    images_dict = {
        'Pie Chart': fig_pie_bytes,
        'Another Pie Chart': fig_another_pie_bytes,
        'Scatter Plot': fig_scatter_plot_bytes,
        'Line Plot': fig_line_plot_bytes
    }

    # Save the dictionary to a .pkl file
    # with open('plots.pkl', 'wb') as f:
    #     pickle.dump(images_dict, f)

    # # Download the pickle file to your local machine
    # # from google.colab import files
    # # files.download('plots.pkl')


    # #if you wanna display with pkl file
    # # Save the dictionary to a .pkl file
    # with open('plots.pkl', 'wb') as f:
    #     pickle.dump(images_dict, f)

    # # Load the dictionary of image bytes from the .pkl file
    # with open('plots.pkl', 'rb') as f:
    #     images_dict = pickle.load(f)

    # Display all the images using Image()
    # for plot_title, plot_bytes in images_dict.items():
    #     display(Image(data=plot_bytes, format='png'))
if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000,debug = True)