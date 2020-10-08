import time
from pathlib import Path
from sys import platform

base_path = str(Path.cwd())


if platform == "linux" or platform == "linux2" or platform == "darwin":
    base_path += "/"
elif platform == "win32":
    base_path += "\\"

print(base_path)

path_top = base_path + "top_text.txt"
path_bottom = base_path + "bottom_text.txt"

path_top_s = base_path + "top_source.txt"
path_bottom_s = base_path + "bottom_source.txt"

print("Creating files...")
Path(path_top).touch(exist_ok=True)
Path(path_bottom).touch(exist_ok=True)
Path(path_top_s).touch(exist_ok=True)
Path(path_bottom_s).touch(exist_ok=True)

print("Reading top lines...")
f_t = open (path_top_s)
lines_top = list(filter(lambda x: x != '\n',f_t.readlines()))
f_t.close()
print("Found...{" + str(len(lines_top)) + "}")

print("Reading bottom lines...")
f_b = open (path_bottom_s)
lines_bottom = f_b.readlines()
f_b.close()
print("Found...{" + str(len(lines_bottom)) + "}")

def changeText(text, path, mode):
    f = open(path, mode)
    f.write(text)
    f.close()


s = ""
counter = 1
for lb in lines_bottom:
    if len(lb) == 0 or lb.startswith('#'):
        print("Ignoring bottom line: " + str(counter))
    else:
        s += " " + lb.rstrip() + "  --- "
    counter += 1
print("Setting bottom...")
changeText(s, path_bottom, "w")


while True:
    for lt in lines_top:
        if len(lt) > 0 and not lt.startswith('#'):
            changeText(lt, path_top, "w")
            time.sleep(10)
    

