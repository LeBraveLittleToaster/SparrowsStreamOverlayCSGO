class Subscriber:
    def __init__(self):
        self.subscribables = []

    def addSubscribable(self, subId):
        self.subscribables.append(Subscribable(subId))

    def addObserver(self, websocket, subId):
        subscribable = next((x for x in self.subscribables if x.subId == subId), None)
        if subscribable is not None:
            subscribable.observer.append(Observer(websocket))

    def publish(self, subId, jsonStr):
        for s in self.subscribables:
            if s.subId == subId:
                s.publish(jsonStr)

class Observer:
    def __init__(self, ws):
        self.ws = ws

    def isClosed(self):
        return self.ws.closed()


class Subscribable:
    def __init__(self, subId):
        self.subId = subId
        self.observer = []

    def publish(self, jsonStr):
        print("publishing {jsonStr} \n to {subId}")
        for obs in self.observer:
            if not obs.isClosed():
                obs.ws.ws.send(jsonStr)
            else:
                print("Removing observer ")
                self.observer.remove(obs)