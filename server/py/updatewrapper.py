import threading
import time
from queue import Queue
from updater import TextUpdater

UPDATE_DELTA = 0.25

print_lock = threading.Lock()

class UpdateWrapper(threading.Thread):
    def __init__(self, queue, updater, args=(), kwargs=None):
        threading.Thread.__init__(self, args=(), kwargs=None)
        self.queue = queue
        self.daemon = True
        self.updater = updater

    def run(self):
        print(threading.currentThread().getName, "Running")
        while True:
            if not self.queue.empty():
                val = self.queue.get_nowait()
                print("New value", val)
                self.do_thing_with_message(val[0], val[1])
            self.update(UPDATE_DELTA)

    def update(self, delta):
        time.sleep(delta)
        for x in self.updater:
            x.update(delta)

    def do_thing_with_message(self, index ,message):
        if index >= 0 and index < len(self.updater):
            self.updater[index].addLine(message)
            with print_lock:
                print(threading.currentThread().getName(),
                      "Received {}".format(message))
