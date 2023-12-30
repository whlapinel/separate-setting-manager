## 12/29:

- completed form, server actions for adding test room to database. 

- test rooms are now displayed as select box in add test interval form rather than text input. This prevents duplicate entries for the same room number and makes admin user experience a bit better.

- Added admin ability to create test rooms (testRooms) and assign to dates (testIntervals). Data schema seems a bit towards the "unintuitive and unnecessarily confusing" side of things but I haven't been able to think of another way to do it.

- Calendar now reads from testIntervals to find test rooms available for each day. This was probably the most complex and challenging part of the program so far. Probably unnecessarily so, but again a simpler way hasn't hit me yet.

- Purchased Tailwind UI and toyed around with Headless UI and a new Tailwind product called Catalyst. Still a bit confused on the differences and how to use these components but so far, very much worth it, and it seems like this is the ideal, 'state of the art' way to go in terms of composing custom UI.

### need to:

- clear or hide forms on submission (does hiding it clear the form?)

- prevent duplicate entries for admin create test room. (server action should do this)

- Right now the Calendar only finds the first testInterval available. It should get an array of test intervals. So testIntervals.find() needs to be changed to testIntervals.filter() and the map should map an array of testInterval objects to each date instead of a single string. It will pass that array to  DailySchedule, and DailySchedule will then need to use the testInterval.desig property to prioritize as it fills up rooms with students. When a room reaches the maximum of 12, a second room should be added for that day. All of this will be a lot of work.

- Need to add 'accommodation' property to student in type, database and AddStudentForm, etc. This property should accept "12 or less" or "1:1" only.

## 12/26:

- Role application input disabled for roles with pending applications
- Switched to tailwind.css and re-styled some components

### need to:

- Design and implement "admin designation of testing room" functionality including database portion.
- Continue re-styling components
- Go through the process of deploying to remote server in order to be able to understand potential future issues
- Redesign and implement root page
- check authorization in layouts rather than every page - this means you need a layout for each role (teacher and admin)

## 12/25:

Added ability to adjudicate role applications from admin page.

### need to: 
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



