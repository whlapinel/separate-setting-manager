
##12/12 morning: added api/revalidate GET path, included api call in add-student-form onSubmit.

###need to: add api/revalidate call to other forms.

##12/14: THANK GOD!! I finally realized why changes weren't reflecting upon adding a class aka 'test unit' via form and then returning to 'my-students' page.  Had tried router.refresh() from NavigationEvents component and when it didn't fix the issue I realized state was being preserved even when navigating away and back. Fix: implement useEffect() to listen for searchParams reset=true and then setUnitList to props (testUnits).

###need to: remove "no-cache" from fetch calls and try re-implementing revalidation API. Lost faith in revalidation because I had incorrectly blamed the problem on revalidation issues. 


