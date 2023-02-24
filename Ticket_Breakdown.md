# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1 Name below###
**Custom ID Part 1 Add Column in DB for custom Id**
We are adding a feature for facilities where an admin can create a custom ID for an Agent instead of using their internal db ID. This custom ID should be able to create to find the specific agent when generating reports

**TODO**:

We want to make sure that custom_ids are unique to the facility itself as well as a minimum length of 6 characters to ensure a unique generalized id 


For this task we need to add a column in the database with the various constraints for the custom Id that goes with the following implementation:
- Add a column called custom_id in the Agents table that is a string with the character limit of 20
- In the Agents table, create a unique constraint on the combination of the facilities_id (Facilities foreign key) and the custom_id 
- In the Agents table, create a constraint for the custom_id that has a minimum length of 6 characters and max length of 20 characters
- After creating this column, we should see the db asking what the previous objects should have in the column. We will change this to their current id since it shouldn't be null

Completion of this task entails:
- Pull request is approved with the following steps of the db change completed 
  
Time/effort:
- This is a low effort task and should be done relatively quick



### Ticket 2 Name below ###
**Custom ID Part 2 Add Controller changes for custom Id**
We are adding a feature for facilities where an admin can create a custom ID for an Agent instead of using their internal db ID. This custom ID should be able to create to find the specific agent when generating reports

**TODO**:

Implementing a CRUD change for the backend to take custom_id creations, reads, and updates if there is, as well as a null custom_id

The following implementations are needed:
- For the Agent object or struct, add a custom_id field with an optional (can be null) string 
- In the POST request called createAgent, create the agent in the method and after the agent is created, check if the custom_id field is empty in the request body. If it's not, add the custom_id, if it is, update the custom_id field as new_agent.id (the id given)
- In the PATCH request called updateAgent, allow the custom_id field to be updated
- Add a GET request called checkIfCustomIdExists to identify quickly if that's availble
- Look through test files that involves creating an agent and add custom id to the creation of the agent object
- Have a unittest method where a new agent is created without the custom_id and where one is provided and should not be empty

Completion of this task entails:
- Tests should pass and two new unittests where it is testing the different scenarios of creating without a custom_id vs. custom_id being created
  
Time/effort:
- This is a medium effort task and should be done in relatively one/two days

Dependency:
- This task is blocked by the CustomID Part 1 task


### Ticket 3 Name below ###
**Custom ID Part 3 add custom id form for new agent**
We are adding a feature for facilities where an admin can create a custom ID for an Agent instead of using their internal db ID. This custom ID should be able to create to find the specific agent when generating reports

**TODO**:

Adding a textfield for creating and updating an agent that has the custom_id box

The following implementations are needed:
- Create a custom_id component that is reusable that allows and optional custom_id
  - In the component, add a minimum length of 6 characters and max length of 20 characters OR 0 characters
  - Create a debounce algorithm (check google for a proper method) for the component that will trigger upon the first letter typed and calls the checkIfCustomIdExits method to identify if it is valid
  - If not valid, add error text below the text field
- Put component in the create Agent page and update Agent page
- Add value of the compnent to the state that will be passed to the backend

Completion of this task entails:
- Successfully creating an Agent with the new field
- Successfully updating an Agent with this new field
- textfield passes styling compliance 
  
Time/effort:
- This is a medium effort task and should be done in relatively one/two days

Dependency:
- This task is blocked by the CustomID Part 2 task

### Ticket 4 Name below ###
**Custom ID Part 4 Add test for generateReport with custom id**
We are adding a feature for facilities where an admin can create a custom ID for an Agent instead of using their internal db ID. This custom ID should be able to create to find the specific agent when generating reports

**TODO**:

generateReport should allow parameters based on the Agent object be filtered

The following implementations are needed:
- Create a test that gets the agents and reports based on the custom id

Completion of this task entails:
- One test completed and passed
  
Time/effort:
- This is a low effort task and should be done in relatively one day

Dependency:
- This task is blocked by the CustomID Part 3 task



### Ticket 5 Name below ###
**Custom ID Part 5 add custom id for filtering**
We are adding a feature for facilities where an admin can create a custom ID for an Agent instead of using their internal db ID. This custom ID should be able to create to find the specific agent when generating reports

**TODO**:

Allow filtering for custom id in the generateReport page

The following implementations are needed:
- Add a filter box for the custom_id to add as a parameter for the generateReport

Completion of this task entails:
- Successfully getting the reports that is needed based on the custom_id filter
  
Time/effort:
- This is a medium effort task and should be done in relatively one day

Dependency:
- This task is blocked by the CustomID Part 4 task



