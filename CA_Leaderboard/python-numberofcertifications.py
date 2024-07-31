import json
import csv
import random

# Load JSON data
with open('data.json', 'r') as file:
    data = json.load(file)
    
# Load name-referral data from CSV
referral_data = {}
with open('name-referral-data.csv', 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        referral_data[row['Name']] = row['Referral Code']

# Load name-referral data from CSV
referral_data = {}
with open('name-referral-data.csv', 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        referral_data[row['Name']] = row['Referral Code']
        
# Add new fields to each entry
for i, entry in enumerate(data):
    selected_name = random.choice(list(referral_data.keys()))
    selected_referral_code = referral_data[selected_name]
    
    entry['Github Username'] = f"user_github_id_{i+1}"
    entry['Referral Code'] = selected_referral_code

# Save the updated JSON data
with open('updated_data.json', 'w') as file:
    json.dump(data, file, indent=4)

# Save the referral data for the JavaScript script
with open('referral_data.json', 'w') as file:
    json.dump(referral_data, file, indent=4)

