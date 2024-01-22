import chardet

# Specify the file path
file_path = "biometria.txt"

encoding = 'ansi'
 
target_text = '90002097'  # Adjust the target text as needed
target_line = 0
try:
    with open(file_path, 'r', encoding=encoding) as file:
        found_target = False

        for line_number, line in enumerate(file, start=1):
            if target_text in line:
                found_target = True
                target_line = line_number
                print(f"Found '{target_text}' in line {line_number}: {line.strip()}")
                break  # Stop reading further once the target is found

        
        


except UnicodeDecodeError:
    print(f"Unable to decode using {encoding} encoding.")
except FileNotFoundError:
    print("File not found.")
except Exception as e:
    print("An error occurred:", e)

stop_text = '3+D]'  # Adjust the stop text as needed
try:
    with open(file_path, 'r', encoding=encoding) as file:
        line_number = 0
        buffer = ""  # Buffer as a string

        # Skip lines until the starting line
        for _ in range(target_line - 1):
            next(file)
            line_number += 1

        # Read lines starting from the specified line
        for line in file:
            line_number += 1

            print(f"Line {line_number}: {line}")
            if target_line == line_number:
                buffer += line
                continue
            elif stop_text in line:
                print(f"Found '{stop_text}' in line {line_number}. Stopping.")
                break
            buffer += line

except UnicodeDecodeError:
    print(f"Unable to decode using {encoding} encoding.")
except FileNotFoundError:
    print("File not found.")
except Exception as e:
    print("An error occurred:", e)

# The buffer now contains all lines concatenated into a single string
output_file_path = "output.txt"

try:
    with open(output_file_path, 'w', encoding='ansi') as output_file:
        output_file.write(buffer)
    print(f"Buffered lines saved to {output_file_path} with ANSI encoding.")
except Exception as e:
    print("An error occurred while saving the file:", e)
