from src.csgo.csgostates import PreState, InState
from src.states.state import StateMachine
from src.terminal import CsgoTerminal

states = [PreState(), InState(), InState()]

preUpdater = [{
    "isPickedByFriendly": True,
    "map": "Inferno"
}, {
    "isPickedByFriendly": False,
    "map": "Nuke"
}]
inUpdater1 = {
    "scoreFriendly": 16,
    "scoreEnemy": 10
}
inUpdater2 = {
    "scoreFriendly": 5,
    "scoreEnemy": 16
}

sm = StateMachine(states)

# print("Last state: " + str(sm.next(preUpdater)))
# sm.print_states()
# print("Last state: " + str(sm.next(inUpdater1)))
# sm.print_states()
# print("Last state: " + str(sm.next(inUpdater2)))
# sm.print_states()

terminal = CsgoTerminal(2, ["Mirage", "Inferno", "Overpass", "Nuke", "Train"], sm)
while not terminal.wait_for_command():
    print("Next command...\n")
