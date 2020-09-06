import time
from flask import Flask, request
from updater import TextUpdater
from queue import Queue
from updatewrapper import UpdateWrapper
app = Flask(__name__)

q = Queue()
upt = [
    TextUpdater("top.txt", 10), 
    TextUpdater("bottom.txt", 10)
]

updater = UpdateWrapper(q, upt, args=())

@app.route('/')
def hello_world():
    print("GET")
    line = request.args.get('line', type=str)
    index = request.args.get("i", type=int)
    if line is not None and (index == 0 or index == 1) :
        updater.queue.put((index, line))
        return "Setting"
    else:
        return "Invalid parameter"


if __name__ == '__main__':
    updater.start()
    time.sleep(0.1)
    app.run()
