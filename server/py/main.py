import time, jsonify
from flask import Flask, request
from updater import TextUpdater
from queue import Queue
from data import Data
from updatewrapper import UpdateWrapper
app = Flask(__name__)

POSITION_TOP = "top"
POSITION_BOTTOM = "bottom"

q = Queue()
upt = [
    TextUpdater("top.txt", 10), 
    TextUpdater("bottom.txt", 10)
]

updater = UpdateWrapper(q, upt, args=())

data = Data()
f = open("lines.json", "r")
data.availableLines = f.readlines()
f.close()

@app.route('/names/set', methods=["GET"])
def setNames():
    rsp = { "enemy":False, "friendly":False }
    enemy = request.args.get('enemy', type=str)
    if enemy is not None and len(enemy) > 0:
        data.enemy = enemy
        rsp["enemy"] = True
    friendly = request.args.get('friendly', type=str)
    if friendly is not None and len(friendly) > 0:
        data.friendly = friendly
        rsp["friendly"] = True
    return jsonify(rsp)

@app.route('/names', methods=["GET"])
def getNames():
    return jsonify({"enemy":data.enemy, "friendly": data.friendly})

@app.route('/lines', methods=["GET"])
def getLines():
    return jsonify({"lines": data.availableLines})

@app.route('/lines/<string:position>/set', methods=["POST"])
def setLinesActive(top):
    json = request.get_json()
    print(json)

if __name__ == '__main__':
    updater.start()
    time.sleep(0.1)
    app.run()
