def remove_fucking_duplicates(file_path):
    print("Alright, buckle up! We're about to remove some fucking duplicates from:", file_path)

    try:
        with open(file_path, 'r') as file:
            lines = file.readlines()
    except Exception as e:
        print(f"Shit! Could not read the file. Error: {e}")
        return

    seen_emails = set()
    new_lines = []
    header_saved = False
    duplicate_found = False

    for line in lines:
        if not header_saved:
            new_lines.append(line)
            if line.startswith('|-----'):
                header_saved = True
            continue

        columns = [col.strip() for col in line.split('|') if col.strip()]
        if len(columns) > 2:
            email = columns[2].strip()
            if email not in seen_emails:
                seen_emails.add(email)
                new_lines.append(line)
            else:
                duplicate_found = True
                # print(f"Ignoring this fucking recurring mail:- {email}")
        else:
            new_lines.append(line)

    try:
        with open(file_path, 'w') as file:
            file.writelines(new_lines)
    except Exception as e:
        print(f"Fucking error! Could not write to the file. Error: {e}")
        return

    if duplicate_found:
        print("All the fucking duplicates are out. Nice job!")
    else:
        print("No fucking duplicates found. Nice job!")


remove_fucking_duplicates('./add-your-certificate.md')
