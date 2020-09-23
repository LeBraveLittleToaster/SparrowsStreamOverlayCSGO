class State(object):
    def __init__(self, state_type):
        self.state_type = state_type

    def update(self, update_dict):
        raise Exception("Not implemented")

    def get_updater(self):
        raise Exception("Not implemented")


class StateMachine:
    def __init__(self, states, variable_dict):
        self.states = states
        self.curStateIndex = 0
        self.variable_dict = variable_dict

    def next(self, updater):
        self.states[self.curStateIndex].update(updater)
        self.curStateIndex += 1
        is_last_element = self.curStateIndex == len(self.states)
        self.update_variables()
        return is_last_element

    def get_current_state(self):
        return self.states[self.curStateIndex]

    def get_updater(self):
        return self.states[self.curStateIndex].get_updater()

    def update_variables(self):
        print("Update variables pls!")

    def print_states(self):
        for s in self.states:
            print(str(s))
