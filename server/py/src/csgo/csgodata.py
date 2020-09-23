class CsgoMap:
    def __init__(self, isPickedByFriendly, map):
        self.isPickedByFriendly = isPickedByFriendly
        self.map = map
    
    def __str__(self):
        return "isPickedByFriendly: " + str(self.isPickedByFriendly) + " | map: " + self.map
