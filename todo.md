## 1/4/24

- DONE 1/4/24. Make SideNav a server component (again). Put in admin/layout and teacher/layout and pass options as props.

- Need to be able to add the following information to testEvent: "what is the code/information the coverage teacher should know for this test/assessment?" and "are there any accommodations beyond the separate setting of which the coverage teacher should be aware?"

- Implement edit functionality for testClass, Students and TestEvents.

- Implement add functionality for students and testEvents.

- Delete old components once fully replaced (refer to old ones when building replacements!)

- Figure out how to reduce prop drilling with <ButtonContainer> -- I'm passing "CanDelete" like 5 levels down, it's ridiculous.

## 1/3/24

- DONE 1/3/24. Application form should be disabled for roles the user already possesses (currently only disabled for roles with pending application).

- DONE 1/4/24. Render [classID].page.tsx as parallel route in /view-classes. If user clicks on a class, that class should render as a modal. Link marked X on the modal should close the modal by navigation  

