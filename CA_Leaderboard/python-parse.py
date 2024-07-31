import requests
import json

def parse_markdown_table(markdown):
    # Split the markdown content into lines
    lines = markdown.split("\n")

    # Extract the header columns (assume the second line is the header separator)
    headers = [h.strip() for h in lines[0].split("|") if h.strip()]
    # Remove the "Referral Code" column if present
    if "Referral Code" in headers:
        headers.remove("Referral Code")

    # Process the table rows
    data = []
    for line in lines[2:]:
        if line.strip() == "" or line.strip().startswith("|---"):
            continue
        row = [r.strip() for r in line.split("|") if r.strip()]
        if len(row) > len(headers):
            row = row[:-1]  # Remove the last element if it corresponds to the "Referral Code" column
        if len(row) == len(headers):
            row_dict = {headers[i]: row[i] for i in range(len(headers))}
            data.append(row_dict)

    return data

# URL of the markdown file in the GitHub repository
url = "https://raw.githubusercontent.com/GSSoC24/Postman-Challenge/main/add-your-certificate.md"

# Fetch the content from the URL
response = requests.get(url)
markdown_content = response.text

# Parse the markdown table and convert to JSON
parsed_data = parse_markdown_table(markdown_content)
json_data = json.dumps(parsed_data, indent=4)

# Print the JSON data
print(json_data)

# Optionally, write the JSON data to a file
with open("data.json", "w") as json_file:
    json_file.write(json_data)

