# SparrowsStreamOverlayCSGO

This project is still under heavy development and is not ready for productive use!


# Setup guide

If you want to try out the current build then follow these steps and hope that this guide is still up to date

## What you need

- Current Nodejs installed (tested with v8.9.1)

### Open two consoles

- in first console
- go to <place of downloaded folder>/SparrowsStreamOverlayCSGO/cs_config
- run "npm start"

- in second console
- go to <place of downloaded folder>/SparrowsStreamOverlayCSGO/render_server/sparrowsrenderer
- run "npm start"

### If both servers running

- http://localhost:3000/wait (Waiting Screen for pause and talking stuff)
- http://localhost:3000/console (Console to manipulate the waiting screen content)
- (only backend, nothing to see yet) http://localhost:3000/ingame (Ingame events streamed from CSGO client (place cd_config/gamestate_integration_blabla file in csgo cfg folder to use it) to overlay ingame scene)

### Setup Streamlabs

The project is intented to be used together with Streamlabs OBS. Here a small example how to set it up:

- Install Streamlabs OBS and create two scenes: Waiting and Ingame
- Waiting: "+" -> "Browser Source" -> "create a new slider" -> Double click the layer -> Height "1080 -> Width "1920" -> Clear the whole css -> check "refresh when active"  -> uncheck "deactivate if not visible" -> Click the cache Button and close the window

