class StateMachine:
    def __init__(self, states):
        self.states = states
        self.curStateIndex = 0

    def next(self, updater):
        self.states[self.curStateIndex].update(updater)
        self.curStateIndex += 1
        return self.curStateIndex == len(self.states)

    def printStates(self):
        for s in self.states:
            print(str(s))

class State(object):
    def __init__(self, state_type):
        self.state_type = state_type

    def update(self, updateDict):
        raise Exception("Not implemented")
    
class CsgoMap:
    def __init__(self, isPickedByFriendly, map):
        self.isPickedByFriendly = isPickedByFriendly
        self.map = map
    
    def __str__(self):
        return "isPickedByFriendly: " + str(self.isPickedByFriendly) + " | map: " + self.map

class PreState(State):
    def __init__(self):
        State.__init__(self, 1)
        self.maps_picked = []

    def update(self, updateDicts):
        for u in updateDicts:
            self.addMap(u)

    def addMap(self, updateDict):
        if "map" in updateDict and "isPickedByFriendly" in updateDict:
            self.maps_picked.append(CsgoMap(
                updateDict["isPickedByFriendly"], updateDict["map"]))
        else:
            print("Not enough data")

    def getMaps(self):
        return self.maps_picked

    def __str__(self):
        msg = "PreState: | "
        for m in self.maps_picked:
            msg += str(m) + " |"
        return msg

class InState(State):
    def __init__(self):
        State.__init__(self, 2)
        self.result = ()
    
    def update(self, updateDict):
        if "scoreFriendly" in updateDict and "scoreEnemy" in updateDict:
            self.result = (updateDict["scoreFriendly"], updateDict["scoreEnemy"])
        else:
            print("Not enough data")

    def getResult(self):
        return self.result

    def __str__(self):
        return "InState: " + str(self.result)

states = []
states.append(PreState())
states.append(InState())
states.append(InState())

preUpdater =[{
    "isPickedByFriendly" : True,
    "map" : "Inferno"
},
{
    "isPickedByFriendly" : False,
    "map" : "Nuke"
}]
inUpdater1 = {
    "scoreFriendly" : 16,
    "scoreEnemy" : 10
}
inUpdater2 = {
    "scoreFriendly" : 5,
    "scoreEnemy" : 16
}

sm = StateMachine(states)

print("Last state: " + str(sm.next(preUpdater)))
sm.printStates()
print("Last state: " + str(sm.next(inUpdater1)))
sm.printStates()
print("Last state: " + str(sm.next(inUpdater2)))
sm.printStates()
