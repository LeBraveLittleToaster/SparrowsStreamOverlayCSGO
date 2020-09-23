from src.states.state import State
from src.csgo.csgodata import CsgoMap


class PreCsgoState(State):
    def __init__(self, map_count):
        State.__init__(self, 1)
        self.map_count = map_count
        self.maps_picked = []

    def update(self, update_dicts):
        for u in update_dicts:
            self.add_map(u)

    def get_updater(self):
        dicts = []
        for i in range(self.map_count):
            dicts.append(dict({
                "map": str,
                "isPickedByFriendly": bool
            }))
        return dicts

    def add_map(self, update_dict):
        print("add_map dict: " + str(update_dict))
        if "map" in update_dict and "isPickedByFriendly" in update_dict:
            self.maps_picked.append(CsgoMap(
                update_dict["isPickedByFriendly"], update_dict["map"]))
            return True
        else:
            print("Not enough data")
            return False

    def get_maps(self):
        return self.maps_picked

    def __str__(self):
        msg = "PreState: | "
        for m in self.maps_picked:
            msg += str(m) + " |"
        return msg


class InCsgoState(State):
    def __init__(self):
        State.__init__(self, 2)
        self.result = ()
    
    def update(self, update_dict):
        local_update_dict = update_dict[0]
        if "scoreFriendly" in local_update_dict and "scoreEnemy" in local_update_dict:
            self.result = (local_update_dict["scoreFriendly"], local_update_dict["scoreEnemy"])
            return True
        else:
            print("Not enough data")
            return False

    def get_updater(self):
        return [dict({
            "scoreFriendly": int,
            "scoreEnemy": int
        })]

    def get_result(self):
        return self.result

    def __str__(self):
        return "InState: " + str(self.result)
