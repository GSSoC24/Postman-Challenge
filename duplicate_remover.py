import re


def remove_duplicates_from_table(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()

    email_pattern = re.compile(r'\|[^|]*\|[^|]*\|([^|]*)\|')
    seen_emails = set()
    new_lines = []
    header_saved = False

    for line in lines:
        if not header_saved:
            new_lines.append(line)
            if line.startswith('|-----'):
                header_saved = True
            continue

        match = email_pattern.search(line)
        if match:
            email = match.group(1).strip()
            if email not in seen_emails:
                seen_emails.add(email)
                new_lines.append(line)
        else:
            new_lines.append(line)

    with open(file_path, 'w') as file:
        file.writelines(new_lines)


remove_duplicates_from_table('./add-your-certificate.md')
