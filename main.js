// Get elements
const dailyTaskDescription = document.getElementById('daily-task-description');
const dailyTaskButton = document.getElementById('daily-task-button');
const physicalTaskDescription = document.getElementById('physical-task-description');
const physicalTaskButton = document.getElementById('physical-task-button');
const teamTaskDescription = document.getElementById('team-task-description');
const teamTaskButton = document.getElementById('team-task-button');
const leaderboardList = document.getElementById('leaderboard-list');
const leaderboardBox = document.getElementById('leaderboard-box');
const loginForm = document.getElementById('login-form');
const loginButton = document.getElementById('login-button');
const loginMessage = document.getElementById('login-message');
const welcomeMessage = document.getElementById('welcome-message');
const pointsMessage = document.getElementById('points-message');

// Hide elements when not logged in
function hideElements() {
    dailyTaskDescription.style.display = 'none';
    dailyTaskButton.style.display = 'none';
    physicalTaskDescription.style.display = 'none';
    physicalTaskButton.style.display = 'none';
    teamTaskDescription.style.display = 'none';
    teamTaskButton.style.display = 'none';
    leaderboardList.style.display = 'none';
    pointsMessage.style.display = 'none';
    welcomeMessage.style.display = 'none';
    leaderboardBox.style.display = 'none';
    loginForm.style.display = 'block';
}

// Show elements when logged in
function showElements() {
    dailyTaskDescription.style.display = 'block';
    dailyTaskButton.style.display = 'block';
    physicalTaskDescription.style.display = 'block';
    physicalTaskButton.style.display = 'block';
    teamTaskDescription.style.display = 'block';
    teamTaskButton.style.display = 'block';
    leaderboardList.style.display = 'block';
    pointsMessage.style.display = 'block';
    welcomeMessage.style.display = 'block';
    loginForm.style.display = 'none';
}

// Call hideElements function when page loads
hideElements();

// Call showElements function when user logs in
function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = db.getUser(username, password);
    if (user) {
        loginMessage.textContent = '';
        welcomeMessage.textContent = `Welcome, ${user.username}!`;
        pointsMessage.textContent = `You have ${user.points} points.`;
        // Update the current user's points
        points = user.points;
        playerName = user.username;
        showElements(); // Call showElements function
    } else {
        loginMessage.textContent = 'Invalid username or password.';
    }
}

// Set up data
const dailyTasks = [
    { description: 'Task 1', points: 10 },
    { description: 'Task 2', points: 20 },
    { description: 'Task 3', points: 30 },
];

const physicalTasks = [
    { description: 'Task 4', points: 40 },
    { description: 'Task 5', points: 50 },
    { description: 'Task 6', points: 60 },
];

const teamTasks = [
    { description: 'Task 7', points: 70 },
    { description: 'Task 8', points: 80 },
    { description: 'Task 9', points: 90 },
];

const people = [
    { name: 'John Doe', points: 100 },
    { name: 'Jane Doe', points: 200 },
    { name: 'Bob Smith', points: 300 },
];

let currentDailyTask = dailyTasks[0];
let currentPhysicalTask = physicalTasks[0];
let currentTeamTask = teamTasks[0];
let points = 0;
let playerName = '';

// Display the tasks on the page
dailyTaskDescription.textContent = currentDailyTask.description;
physicalTaskDescription.textContent = currentPhysicalTask.description;
teamTaskDescription.textContent = currentTeamTask.description;

// Display the people on the page
people.forEach(person => {
    const leaderboardItem = document.createElement('li');
    leaderboardItem.textContent = `${person.name}: ${person.points}`;
    leaderboardList.appendChild(leaderboardItem);
});

// Add event listeners to the buttons
dailyTaskButton.addEventListener('click', completeDailyTask);
physicalTaskButton.addEventListener('click', completePhysicalTask);
teamTaskButton.addEventListener('click', completeTeamTask);
loginForm.addEventListener('submit', login);

// Complete task functions
function completeDailyTask() {
    points += currentDailyTask.points;
    updatePoints();
    updateLeaderboard();
    currentDailyTask = dailyTasks[Math.floor(Math.random() * dailyTasks.length)];
    dailyTaskDescription.textContent = currentDailyTask.description;
    pointsMessage.textContent = `You have ${points} points!`;
}

function completePhysicalTask() {
    points += currentPhysicalTask.points;
    updatePoints();
    updateLeaderboard();
    currentPhysicalTask = physicalTasks[Math.floor(Math.random() * physicalTasks.length)];
    physicalTaskDescription.textContent = currentPhysicalTask.description;
    pointsMessage.textContent = `You have ${points} points!`;
}

function completeTeamTask() {
    points += currentTeamTask.points;
    updatePoints();
    updateLeaderboard();
    currentTeamTask = teamTasks[Math.floor(Math.random() * teamTasks.length)];
    teamTaskDescription.textContent = currentTeamTask.description;
    pointsMessage.textContent = `You have ${points} points!`;
}

// Update leaderboard function
function updateLeaderboard() {
    leaderboardList.innerHTML = '';
    people.forEach(person => {
        const leaderboardItem = document.createElement('li');
        leaderboardItem.textContent = `${person.name}: ${person.points}`;
        leaderboardList.appendChild(leaderboardItem);
    });
    const leaderboardItem = document.createElement('li');
    leaderboardItem.textContent = `You have ${points} points!`;
    leaderboardList.appendChild(leaderboardItem);
}

// Login function
// Login function
function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = db.getUser(username, password);
    if (user) {
        loginMessage.textContent = '';
        welcomeMessage.style.display = 'block'; // Display the welcome message
        welcomeMessage.textContent = `Welcome, ${user.username}!`;
        pointsMessage.textContent = `You have ${user.points} points.`;
        // Update the current user's points
        points = user.points;
        playerName = user.username;
    } else {
        loginMessage.textContent = 'Invalid username or password.';
        welcomeMessage.style.display = 'none'; // Hide the welcome message
    }
}

// Database setup
class Database {
    constructor() {
        this.users = [];
    }

    // Add a new user to the database
    addUser(username, password) {
        const user = { username, password, points: 0 };
        this.users.push(user);
        return user;
    }

    // Get a user by username and password
    getUser(username, password) {
        return this.users.find(user => user.username === username && user.password === password);
    }

    // Update a user's points
    updatePoints(username, points) {
        const user = this.users.find(user => user.username === username);
        if (user) {
            user.points = points;
        }
    }
}

const db = new Database();

// Example users
db.addUser ('AshazWIN', '9E');
db.addUser ('Aadil', 'Hello');
db.addUser ('Adhayyan', 'Adhayyan');

// Update points function
function updatePoints() {
    db.updatePoints(playerName, points);
}