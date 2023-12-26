## 12/25:

Added ability to adjudicate role applications from admin page.

need to: 
- DONE Add ability to apply for roles in /[userID]/application.
- Switch to tailwind css and restyle application
- learn about catch-all routes, optional routes, route interceptors, route groups, etc.
- 

issues: (RESOLVED) roles and pendingRoles allows duplicate entries. How to prevent duplicate entries?

## 12/23:

Added authentication using Clerk and implemented authorization. Only login method is Google OAuth to keep it simple. Able to login using CMS account, non CMS account is blocked.

### need to:

- DONE Change 'role' column of database to text array (will need to delete all entries)
- DONE Refactor the authorization function to separate concerns: one main method to put in each protected page, with sub functions to check if:
    - a. DONE the user is logged in with a CMS account (true or false), another to 
    - b. DONE check database for user (true or false), another to check if  
    - c. DONE the user has the required role (true or false). 
- Make default value of role 'user' instead of 'teacher' DONE
- Fix redirect to signup / signin pages
- Warn user that they cannot delete class when there are students or test events in the class (items must be deleted first)
- DONE Protect all pages with authorization function. Also need to declare and assign variable requiredRole (string). 
- Learn how to use sessions (I have no idea what I'm supposed to do with session information)

## 12/18: 

Tons of progress over the weekend. Switched from json-server to postgreSQL and created a solid and simple schema, rewrote and simplified the code to conform to new schema,  switched everything to server components and implemented server actions. Only client components remaining are the add/delete class forms (need to write the edit forms, and all forms for students and testEvents). "My classes" and calendar appear fully functional with no bugs evident.  Oh, and switched from JS to TS (loving it!!). Freaking awesome.

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



