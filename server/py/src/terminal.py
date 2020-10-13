import sys


class CsgoTerminal:
    def __init__(self, map_count, available_map_names, state_machine, text_engine, text_updater):
        self.map_count = map_count
        self.available_map_names = available_map_names
        self.state_machine = state_machine
        self.text_engine = text_engine
        self.text_updater = text_updater

    def wait_for_command(self):
        command = input("Enter command ('help' for a list of commands) ")
        if command == "next" or command == "n":
            return self.process_next()
        elif command == "help" or command == "h":
            print("next | n : Switch state to next")
            print("exit     : Stop programm")
            print("help     : List of commands")
        elif command == "exit":
            sys.exit(0)

    def process_next(self):
        updater = self.state_machine.get_updater()
        for i in range(0, len(updater)):
            for v in updater[i].keys():
                updater[i][v] = input("Insert " + str(v) + " | type: " + str(updater[i][v]))
        print("Finished updater: " + str(updater))
        is_last = self.state_machine.next(updater)
        sentence_tuple = self.text_engine.get_sentences_for_state(self.state_machine.get_current_state(),
                                                                  self.state_machine.variable_dict)
        self.text_updater.put_sentences(sentence_tuple[0], sentence_tuple[1])
        return is_last
