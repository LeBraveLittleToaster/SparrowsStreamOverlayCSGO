from src.csgo.csgostates import PreCsgoState, InCsgoState, PostCsgoState
from src.states.state import StateMachine
from src.terminal import CsgoTerminal
from src.textengine.textengine import TextEngine
from src.textengine.textupdater import TextUpdater
import json

variable_dict = dict({
    "friendly": "Sparrows eSports Ulm",
    "friendly_short": "Sparrows",
    "enemy": "In Perpetuum Academia",
    "enemy_short": "In Per",
    "map_fixed_count": 2
})


def generate_states(var_dict):
    states = [PreCsgoState(var_dict["map_fixed_count"])]
    for i in range(var_dict["map_fixed_count"]):
        states.append(InCsgoState())
    states.append(PostCsgoState())
    return states


with open('../sentences.json') as sentences:
    data = json.load(sentences)
    print(str(data))

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

sm = StateMachine(generate_states(variable_dict), variable_dict)
te = TextEngine(data)
tu = TextUpdater("top.txt", "bottom.txt", 10)

tu.start()

terminal = CsgoTerminal(2, ["Mirage", "Inferno", "Overpass", "Nuke", "Train"], sm, te, tu)

while not terminal.wait_for_command():
    breakpoint()
    print("Next command...\n")
    breakpoint()

