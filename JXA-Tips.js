//dealing with GUIs
system = Application('System Events')

//Get all processes
system.processes()

//Get myprocess
myProcessGUI = system.processes["MyProcess"]

//Get all of my processes menu bars:
myProcessMenuBars = myProcessGUI.menuBars()

//Get first menu bar
myProcessMenu = myProcessGUI.menuBars[0]

//List all elements in a particular system events element:
allMenuItems = myProcessMenu.entireContents()

//Get last item
mnuItem = allMenuItems[-1]

//List all actions that can be performed on a specific element:
mnuItemActions = mnuItem.actions()

//List all attributes of a specific element
mnuItemAttribs = mnuItem.attributes()
myProcessAttribs = myProcessGUI.attributes()

/*
Lessons Learnt:
--------------
.entireContents() == All descendants
.attributes()     == Attributes / Properties
.actions()        == Methods

To get access to a particular attribute or method, call it as a function.

E.G.
For `AXSomethingAwesome` call the function
.somethingAwesome()
*/

//Other lessons:

// Get the process itself:
var oProcess      = Application('MyProcess') 
oProcess.includeStandardAdditions=true

//Standard information
infos = [oProcess.displayedName(),oProcess.bundleIdentifier(),oProcess.applicationFile().path(),oProcess.applicationFile().posixPath()]


