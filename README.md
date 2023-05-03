# Console Quest
 
Console Quest is a roguelike infinite room game that runs on the MERN stack. The game uses the Socket.IO library to handle actions and provide real-time updates to the game state.

The server-side code sets up a Socket.IO server and listens for client connections. When a client connects, the server creates a new game instance and assigns the client to it. The game state is stored on the server using MongoDB.

The game is played by navigating through randomly generated rooms, battling enemies, and collecting items. Each room is procedurally generated, ensuring that no two playthroughs are the same.

The client-side code displays the game world and handles player input. When the player performs an action, such as moving or attacking, the client sends a message to the server via the Socket.IO connection. The server updates the game state and sends a message back to the client with any changes.



## Installation

1. Clone the repository to your local machine.
2. Open a terminal window and navigate to the project directory.
3. Run npm install to install the dependencies.

## Usage

1. Start the server by running node index.js in the terminal.
2. In a separate terminal window, run node gamePlayers.js.
3. Enter your name in the gamePlayers console.
4. The game loop will start on the server, and you will be prompted to choose your attack type and target enemy.
5. Keep playing until you defeat all enemies or your health reaches 0.

****


## Group Members
1. Michael Dulin
2. Anthony Keith
3. Zachariah Jeter
4. Trey Young


****


## Group Plan

**Cooperative Plan**
1. What are the key strengths of each person on the team?
  - Michael: Creativity / Group Cohesion
  - Anthony: Adaptability
  - Zach: Team motivation and documentation
  - Trey: Server work
2. How can you best utilize these strengths in the execution of your project?
  - By addressing each members strengths, we can use those with more experience to help / teach others.
3. In which professional competencies do you each want to develop greater strength?
  - Michael: API routing / DB
  - Anthony: Documentation
  - Zach: Technical / backend
  - Trey: Documentation
4. Knowing that every person in your team needs to understand all aspects of the project, how do you plan to approach the day-to-day work?
  - Utilizing dily group huddles to assess where our members are logically and where our project is. We will ensure everyone is given the chance to speak and be heard.


**Conflict Plan**
1. What will be your group’s process to resolve conflict, when it arises?
  - Ensuring daily meetings and collaboration where we can all express our concerns. We will also ensure everyone is comfortable speaking their minds.
2. What will your team do if one person is taking over the project and not letting the other members contribute?
  - Address these concerns direcetly as a group.
3. How will you approach each other and the challenges of the project knowing that it is impossible for all members to be at the exact same place in understanding and skill level?
  - We understand this is a learning experience, and will ensure everyone who is uncomfortable with certain aspects 
4. How will you raise concerns to members who are not adequately contributing?
  - We will respectfully address our concerns during our group huddle. 
5. How and when will you escalate the conflict if your resolution attempts are unsuccessful?
  - If unfortunately it comes to this, then we will resort to informing the instructor.


**Communication Plan**
1. What hours will you be available to communicate?
  - Mon-Fri 9-9
2. What platforms will you use to communicate (ie. Slack, phone …)?
  - Slack, phone, discord
3. How often will you take breaks?
  - Once every hour
4. What is your plan if you start to fall behind?
  - Regroup and reevaluate where we are in the scope of our project.
5. How will you communicate after hours and on the weekend?
  - We will text on weekends and if we all agree to join, we will hop on discord to colaborate.
6. What is your strategy for ensuring everyone’s voice is heard?
  - Consistent group huddles - allow each member to express their ideas.
7. How will you ensure that you are creating a safe environment where everyone feels comfortable speaking up?
  - By being open and honest with our expectations as well as understanding this is a learning experience.


**Work Plan**
1. How you will identify tasks, assign tasks, know when they are complete, and manage work in general?
  - Daily group huddles and utilizing Trello
2. What project management tool will be used?
  - Trello


**Git Process**
1. What components of your project will live on GitHub?
  - All components of this project will live on GitHub
2. How will you share the repository with your teammates?
  - We will create an organization on GitHub and invite all members
3. What is your Git flow?
  - Consistently ACP, work on unique branches, ensure 
4. Will you be using a PR review workflow? If so, consider:
  - How many people must review a PR?
    - 2
  - Who merges PRs?
    - Any member after 2 approvals
  - How often will you merge?
    - With the implementation of a new feature or at least daily to ensure all members are working on the latest material.
  - How will you communicate that its time to merge?
    - We will verify with others during daily group meetings to assess the current status of our project.


****


## Group Ideas

1. Console Quest
  - A text-based dungeon crawler rpg with rogue-like elemnents. The user will traverse through a text-based dungeon, encountering random monsters and will have to fight to survive. Extra components involve an item system, stat system, XP system and combat system.
2. Adopt A Kitten
  - An app geared towards adoption agencies to easily and conviently list new kittens available for adoption. Given two user roles, Admin and User, admin will have write permissions while User has only read. Essentially, this will act as a go-between for adoption agencies to offer kittens.


****


## Tools 

1. [Project Repository](https://github.com/Console-Quest/console-quest)
2. [Presentation Deck](https://docs.google.com/presentation/d/1NeXKKEpjK2DDme8EwlZBsJndUqIgGYzWrY6FAYtNTf0/edit#slide=id.g2accd1c413_3_31)
3. [Invision UML](https://anthonykeith287645.invisionapp.com/freehand/Untitled-3Z3lA8HpI?dsid_h=7c2fba69e0efbaa7[…]d2f32660f5f5e7cc93adc7fba919060a0d62ea3b32e040f9729)
4. [Trello](https://trello.com/b/EgH22Rsc/consolequest)
5. [User Stories](https://docs.google.com/document/d/1jpRZoqDT-QW-chV5fTGVLyguo6j2UDzcPhPlaLT0F6E/edit)
