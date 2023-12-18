## 12/18: 

Tons of progress over the weekend. Switched from json-server to postgreSQL and created a solid and simple schema, rewrote and simplified the code to conform to new schema,  switched everything to server components and implemented server actions. Only client components remaining are the add/delete class forms (need to write the edit forms, and all forms for students and testEvents). "My classes" and calendar appear fully functional with no bugs evident.  Freaking awesome.

### need to:

- Create add and delete forms for both students and testEvents. 
- Implement edit forms and functionality. 
- Implement Google OAuth. 
- Create an admin page and functionality (should be able to edit any user's classes as well as establish testing rooms--primary and secondary).

## 12/14: 

THANK GOD!! I finally realized why changes weren't reflecting upon adding a class aka 'test unit' via form and then returning to 'my-students' page.  Had tried router.refresh() from NavigationEvents component and when it didn't fix the issue I realized state was being preserved even when navigating away and back. Fix: implement useEffect() to listen for searchParams reset=true and then setUnitList to props (testUnits).

### 

need to: remove "no-cache" from fetch calls and try re-implementing revalidation API. Lost faith in revalidation because I had incorrectly blamed the problem on revalidation issues. 

## 12/12:

morning: added api/revalidate GET path, included api call in add-student-form onSubmit.

### 

need to: add api/revalidate call to other forms.



