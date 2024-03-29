## 1/9:

- Might be the last big commit for a while, since classes are starting tomorrow and I'm taking 9 credits. Can hopefully find time to work on this but should probably try to make some good notes for future self assuming I'll forget everything.

- Might try to deploy today to see if I can get things working depending on prices.

- Things feel like they are coming together. Admin and Teacher essential functionality is mostly there, but lots to do remaining especially in the 'edit' category.  

## 1/6:

- Another failed attempt to implement parallel routes and route interception. Need to thoroughly play around with an example before I waste time trying this again. REALLY want to make everything possible a server component and show forms in modals through route interception rather than doing it with traditional client-side state management, but don't want to get bogged down with this so I'm just going with doing it the way I know for now.

- Implemented showing AddClassForm in the modal, same as yesterday, but have an issue with performance. Not very snappy.

## 1/5: 

- Continued building UI in class details (ClassContainer.tsx). Implemented showing and hiding AddStudentForm and AddTestForm within modal. 

## 1/4:

- Yesterday I made some progress with the class details / editing screen.

- Spent way too much time messing with CSS group-hover/{name} and couldn't get it working. Decided to give up and not try to hide buttons with CSS.

- Can now delete student, testEvents from class-details screen.

## 1/2: 

- Made a big mistake thinking I'd be able to use Clerk for role management and authorization. Didn't realize it would cost me $100 a month until I had already implemented it in the code. NICE!  But I improved my original authorization code a bit in the process of re-writing it, so there's the bright side.

- Removed [userID] dynamic route segment. Realized it was causing major pain without much benefit, and doesn't seem to be a common pattern. Now teacher and admin are in the root folder.

- Doing a lot of re-work and re-re-work but that's expected at this stage of learning.

## 1/1:

- Happy New Year!

- Moved [classID] to subroute of /view-classes. The idea is that the user should only see a list of classes and can't edit anything without selecting a class first. Each class will be a link. Selecting a class will take you to the [classID] page where other options then become available.

### need to:

- Once I understand intercepted and parallel routes, eventually implement above architecture with view-classes and [classID] being parallel routes. So that when a class is selected, the details and edit functionality shows up as modals rather than separate pages but URL is changed. 

## 12/30-12/31:

- spent much of 12/30 making it so students are assigned to rooms rather than simply days and making calendar display accordingly.

- on 12/31 I spent a lot of time frustratedly twiddling with the layout.  Moved SideNav to a client component so I could read the path and show options according to the current role. Not sure if this is conventional but it seems reasonably functional.

### need to:

- add 'accommodation' select box to add student form.

- move calendar route to teacher instead of user. Can't have anyone with a CMS domain email address accessing that information (this would include students). All users should be able to do is apply for roles.

- roles homepages should show actions (larger version of options shown on SideNav)

- move [classID] route to parent /view-classes.

- make admin/room-assignments an accordion rather than displaying all at once (too long). Same with /test-rooms


## 12/29:

- completed form, server actions for adding test room to database. 

- test rooms are now displayed as select box in add test interval form rather than text input. This prevents duplicate entries for the same room number and makes admin user experience a bit better.

- Added admin ability to create test rooms (testRooms) and assign to dates (testIntervals). Data schema seems a bit towards the "unintuitive and unnecessarily confusing" side of things but I haven't been able to think of another way to do it.

- Calendar now reads from testIntervals to find test rooms available for each day. This was probably the most complex and challenging part of the program so far. Probably unnecessarily so, but again a simpler way hasn't hit me yet.

- Purchased Tailwind UI and toyed around with Headless UI and a new Tailwind product called Catalyst. Still a bit confused on the differences and how to use these components but so far, very much worth it, and it seems like this is the ideal, 'state of the art' way to go in terms of composing custom UI.

### need to:

- clear or hide forms on submission (does hiding it clear the form?)

- prevent duplicate entries for admin create test room. (server action should do this)

- (DONE 12/30) Right now the Calendar only finds the first testInterval available. It should get an array of test intervals. So testIntervals.find() needs to be changed to testIntervals.filter() and the map should map an array of testInterval objects to each date instead of a single string. It will pass that array to  DailySchedule, and DailySchedule will then need to use the testInterval.desig property to prioritize as it fills up rooms with students. When a room reaches the maximum of 12, a second room should be added for that day. All of this will be a lot of work.

- Need to add 'accommodation' property to student in type, database and AddStudentForm, etc. This property should accept "12 or less" or "1:1" only.

## 12/26:

- Role application input disabled for roles with pending applications
- Switched to tailwind.css and re-styled some components

### need to:

- DONE Design and implement "admin designation of testing room" functionality including database portion.
- Continue re-styling components
- Go through the process of deploying to remote server in order to be able to understand potential future issues
- Redesign and implement root page
- DONE check authorization in layouts rather than every page - this means you need a layout for each role (teacher and admin)

## 12/25:

Added ability to adjudicate role applications from admin page.

### need to: 
- DONE Add ability to apply for roles in /[userID]/application.
- DONE Switch to tailwind css and restyle application
- learn about catch-all routes, optional routes, route interceptors, route groups, etc.


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



