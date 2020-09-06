class TextUpdater:
    def __init__(self, file_path, cycle_sec):
        print("Starting updater...")
        self.file_path = file_path
        self.lines = []
        self.cycle_sec = cycle_sec
        self.counterSec = 0
    
    def addLine(self, text):
        self.lines.append(text)

    def writeChangesToFile(self, line):
        print("Writing to file", line)
        f = open(self.file_path, "w+")
        f.write(line)
        f.close()

    def update(self, deltaSec):
        self.counterSec += deltaSec
        if self.counterSec >= self.cycle_sec:
            self.counterSec = 0
            if len(self.lines) > 0:
                line = self.lines.pop(0)
                self.lines.append(line)
                self.writeChangesToFile(self.lines[0])
                return True
        return False