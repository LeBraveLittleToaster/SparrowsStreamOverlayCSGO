import sys


class CsgoTerminal:
    def __init__(self, map_count, available_map_names, state_machine):
        self.map_count = map_count
        self.available_map_names = available_map_names
        self.sm = state_machine

    def wait_for_command(self):
        command = input("Enter command: ")
        if command == "next" or command == "n":
            self.process_next()
        elif command == "exit":
            sys.exit(0)

    def process_next(self):
        updater = self.sm.get_updater()
        for i in range(0, len(updater)):
            for v in updater[i].keys():
                updater[i][v] = input("Insert " + str(v) + " | type: " + str(updater[i][v]))
        print("Finished updater: " + str(updater))
        return self.sm.next(updater)
