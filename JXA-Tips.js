//dealing with GUIs
system = Application('System Events')
myProcessGUI = system.processes("MyProcess")
myProcessMenu = myProcessGUI.menuBars[0]

//List all elements in a particular system events element:
allMenuItems = myProcessMenu.entireContents()

//List all actions that can be performed on a specific element:
mnuActions = allMenuItems[-1].actions()


