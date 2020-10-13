import queue
from threading import Thread
from time import sleep


class TextUpdater(Thread):
    def __init__(self, file_path_top, file_path_bottom, top_update_seconds):
        super().__init__()
        self.file_path_top = file_path_top
        self.file_path_bottom = file_path_bottom
        self.sentences_top = ["Nmr1", "Nmr2", "Nmr3"]
        self.index_top = 0
        self.sentences_bottom = ["Text1", "Text2", "Text3"]
        self.queue_top = queue.Queue()
        self.queue_bottom = queue.Queue()
        self.top_update_seconds = top_update_seconds
        self.is_running = True

    def run(self):
        while self.is_running:
            self.check_non_blocking_for_updates()
            self.tick()
            sleep(self.top_update_seconds)

    def check_non_blocking_for_updates(self):
        is_updated_top = self.try_get_from_queue_to_array(self.sentences_top, self.queue_top)
        is_updated_bottom = self.try_get_from_queue_to_array(self.sentences_bottom, self.queue_bottom)
        self.update_top(is_updated_top)
        self.update_bottom(is_updated_bottom)

    def tick(self):
        if len(self.sentences_top) > 0:
            if self.index_top >= len(self.sentences_top):
                self.index_top = 0
            self.write_to_file(self.sentences_top[self.index_top], "w+", self.file_path_top)
            self.index_top += 1

    def update_top(self, is_updated):
        if is_updated:
            self.index_top = 0

    def update_bottom(self, is_updated):
        if is_updated:
            bottom_str = "".join((str(n) + " +++ ") for n in self.sentences_bottom)
            self.write_to_file(bottom_str, "w+", self.file_path_bottom)

    @staticmethod
    def try_get_from_queue_to_array(arr, que):
        if not que.empty():
            try:
                arr = que.get_nowait()
                return True
            except queue.Queue.Empty:
                print("Failed to get Element from queue")
                return False
        return False

    def put_sentences(self, sentences_bottom, sentences_top):
        if sentences_bottom is not None and len(sentences_bottom):
            self.queue_bottom.put(sentences_bottom)
        if sentences_top is not None and len(sentences_top):
            self.queue_top.put(sentences_top)

    @staticmethod
    def write_to_file(sentence, mode, file_path):
        f = open(file_path, mode)
        f.write(sentence)
        f.close()
