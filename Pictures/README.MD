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

    //Get displays from rectangle above
    $.CGGetDisplaysWithRect(rect,2,mArr,null)

    //Return first display from returned rectangles array.
    return mArr[0]
}
```
