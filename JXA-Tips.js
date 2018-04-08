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

Attributes can be accessed like this:
.attributes['AXSomethingAwesome'].value()
*/

//Other lessons:

// Get the process itself:
var oProcess      = Application('MyProcess') 
oProcess.includeStandardAdditions=true
//All standard additions are listed in script dictionary 
// -->   /private/var/folders/n6/b57bg5554y7bv36xbsfhmqf80000gn/T/StandardAdditions.sdef
//(That may be temporary... If so go to script editor > File > Open Dictionary... > StandardAdditions.osax)

//Other data
data = [myProcessGUI.displayedName(),myProcessGUI.bundleIdentifier(),myProcessGUI.applicationFile().path(),myProcessGUI.applicationFile().posixPath()]

