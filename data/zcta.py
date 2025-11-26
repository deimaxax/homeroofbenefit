import json

input_file = "dynamic_cities.json"        # original file
output_file = "dynamic_cities_clean.json" # new file

with open(input_file, "r") as fin, open(output_file, "w") as fout:
    for line in fin:
        line = line.strip()
        if not line:
            continue
        
        obj = json.loads(line)
        city = obj.get("city", "").lower()

        # remove everything starting with or containing "zcta"
        if "zcta" in city:
            continue

        fout.write(json.dumps(obj) + "\n")

print("Done. Output in:", output_file)
