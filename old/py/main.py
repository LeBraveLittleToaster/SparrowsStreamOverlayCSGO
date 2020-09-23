import asyncio, os, websockets
from flask import Flask, request
from subscriber import Subscriber 

subSys = Subscriber()

#++++++++++++++++TEST+++++++++++++++++++++
subSys.addSubscribable("123")
subSys.addSubscribable("321")
#++++++++++++++++TEST+++++++++++++++++++++

async def connector(websocket, path):
    await websocket.send("Hello client")

start_server = websockets.serve(connector, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
