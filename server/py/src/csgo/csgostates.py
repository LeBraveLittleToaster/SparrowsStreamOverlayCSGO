from src.states.state import State
from src.csgo.csgodata import CsgoMap

class PreCsgoState(State):
    def __init__(self, map_count):
        State.__init__(self, 1)
        self.map_count = map_count
        self.maps_picked = []
        self.is_updated = False

    def update(self, states, update_dicts):
        for u in update_dicts:
            self.add_map(u)
        self.is_updated = True

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

    def is_updated(self):
        return self.is_updated

    def __str__(self):
        msg = "PreState: | "
        for m in self.maps_picked:
            msg += str(m) + " |"
        return msg


class InCsgoState(State):
    def __init__(self):
        State.__init__(self, 2)
        self.result = ()
        self.is_updated = False

    def update(self, states, update_dict):
        local_update_dict = update_dict[0]
        if "scoreFriendly" in local_update_dict and "scoreEnemy" in local_update_dict:
            self.result = (local_update_dict["scoreFriendly"], local_update_dict["scoreEnemy"])
            self.is_updated = True
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

    def is_updated(self):
        return self.is_updated

    def __str__(self):
        return "InState: " + str(self.result)


class PostCsgoState(State):
    def __init__(self):
        State.__init__(self, 3)
        self.results = []
        self.is_updated = False

    def update(self, states, update_dicts):
        for state in states:
            if type(state) is InCsgoState and len(state.get_result()) > 0:
                self.results.append(state.get_result())
        self.is_updated = True

    def get_updater(self):
        return []

    def is_updated(self):
        return self.is_updated

    def add_results(self, update_dict):
        print("add_results: " + str(update_dict))
        if "results" in update_dict:
            self.results = update_dict["results"]
            return True
        else:
            print("Not enough data")
            return False

    def get_results(self):
        return self.results

    def get_total_score(self):
        score_friendly = 0
        score_enemy = 0
        for result in self.results:
            if result[0] > result[1]:
                score_friendly += 1
            else:
                score_enemy += 1

        return score_friendly, score_enemy

    def __str__(self):
        msg = "PostState: | "
        for m in self.results:
            msg += str(m) + " |"
        return msg
