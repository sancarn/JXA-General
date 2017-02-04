# Things to watch out for when using Core Graphics lib

## DisplayID

Most functions in this library require using DisplayIDs. A display ID is a 32-bit integer which targets a specific display. Though it would be logical to assume that the ID will be:

* 1 for the main display
* 2 for the 2nd display
* etc.

this is actually incorrect. For this reason it is often best to get the displayID using a function like this:

```
function getDisplayFromRect(x,y,w,h){
    ObjC.import('Foundation')
    ObjC.import('AppKit')

    /*
     * Ref() class is used to pass JavaScript variables by reference to ObjC functions.
     * From documentaion:
     *    Explicit Pass-by-Reference
     *    The Ref class can be used to pass arguments that ObjC expects to be passed by reference.
     *    The referenced value can be retrieved by accessing the 0 property of the Ref.
     *    Example:
     *        ref = Ref()
     *        exists = $.NSFileManager.defaultManager.fileExistsAtPathIsDirectory(path, ref)
     *        isDirectory = ref[0]
     */

    var mArr = Ref()

    /*
     * CGMainDisplayID must be called before CGGetDisplaysWithRect.
     * If it isn't the console throws the error:
     *  Assertion failed: (did_initialize), function CGS_REQUIRE_INIT, file Desktop/CGInitialization.c, line 40.
     *  Abort trap: 6
     *
     * Supposedly this is because CGGetDisplaysWithRect, as of OSXYosemite,
     *  no longer initialises CoreGraphics if it isn't already. This is not
     *  normally a problem with GUI applications, however with scripts it is
     *  obviously a problem.
     *
     * Calling CGMainDisplayID() forces CoreGraphics framework to properly initialise
     *  thus the error at CGGetDisplaysWithRect() does not occur.
     *
     * Reference: https://bitbucket.org/ronaldoussoren/pyobjc/issues/132/quartzcgbegindisplayconfiguration-doesnt
     */
    $.CGMainDisplayID()

    //Get rectangle from x,y,w,h
    rect = $.CGRectMake(x,y,w,h)
    
    //I have 2 displays so I am using 2 here...
    var maxDisplays = 2
    
    //Get displays from rectangle above
    $.CGGetDisplaysWithRect(rect,maxDisplays,mArr,null)

    //Return first display from returned rectangles array.
    return mArr[0]
}
```

## MaxDisplays

The problem with the above code is, if a rectangly crosses over 2+ displays the 3rd and 4th displays won't be picked up. This is because we still need to modify the `maxDisplays` parameter of CGGetDisplaysWithRect(). I asked StackOverflow what the purpose of this parameter was and [got this response](http://stackoverflow.com/a/42035741/6302131).

Ultimately the answer is that the `displays` parameter isn't a regular Cocoa/CoreFoundation array, and thus maxDisplays is required to force the function to not return an array bigger than the one you put in.

There are 2 solutions to this:

1. Use `maxDisplays = 32`. This may not be memory efficient but 32 is the maximum number of displayIDs that can be returned by this function. This is not explicitely documented.
2. Alternatively use the following code:

```
function getMaxDisplaysFromRect(rect){
    var count = Ref()
    $.CGGetDisplaysWithRect(rect,0,null,count)
    return count[0]
}
```
