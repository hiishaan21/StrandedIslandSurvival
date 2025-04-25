// Variables and placeholders for all HTML divisions and elements
// Using getElementById to store HTML output into variables
const storyTitle = document.getElementById('story-title');
const storyText = document.getElementById('story-text');
const beware = document.getElementById('beware');
const survivalImage = document.getElementById('survival-image');
const credentials = document.getElementById('credentials');
const choices = document.getElementById('choices');

// Progress indicator
const progressIndicator = document.getElementById('progress-indicator');

// Game state elements
const energyDisplay = document.getElementById('energy-display');
const energyValue = document.getElementById('energy-value');
const energyIcon = document.getElementById('energy-icon');

// Floating control buttons
const helpButton = document.getElementById('help-button');
const restartButton = document.getElementById('restart-button');
const voiceButton = document.getElementById('voice-button');
const exportButton = document.getElementById('export-button');

// Modern notification system
const toastNotification = document.getElementById('notification-toast');

// Game messages
const shelterMessage = document.getElementById('shelter-message');
const successMessage = document.getElementById('success-message');
const failureMessage = document.getElementById('failure-message');

// Location images and buttons
const locationContainer = document.getElementById('location-images');
const skullRockImage = document.getElementById('skull-rock-image');
const ghostLightCaveImage = document.getElementById('ghost-light-cave-image');
const forgottenFallsImage = document.getElementById('forgotten-falls-image');
const skullRockButton = document.getElementById('skull-rock-button');
const caveButton = document.getElementById('cave-button');
const fallsButton = document.getElementById('falls-button');

// Audio files for various game sounds, played at specific moments
const levelUpSound1 = new Audio("sounds/levelup1.wav");
const levelUpSound2 = new Audio("sounds/levelup2.mp3");
const levelUpSound3 = new Audio("sounds/levelup3.mp3");
const levelUpSound4 = new Audio("sounds/levelup4.mp3");
const levelUpSound5 = new Audio("sounds/levelup5.mp3");
const levelUpSound6 = new Audio("sounds/levelup6.mp3");
const failureSound = new Audio("sounds/failure.mp3");
const fireSound = new Audio("sounds/fire.mp3");
const nightSound = new Audio("sounds/night.mp3");
const successSound = new Audio("sounds/success.mp3");

// Audio control
let audioEnabled = true;

// Variables to track game state
let count = 0;           // General counter for tracking certain events
let nightCounter = 0;    // Counter to track the number of nights passed
let gameProgress = 0;    // Track game progress for progress bar
let darkMode = false;    // Dark mode state

// Random Numbers for energy drop after user searches locations and does activities
let randomNum1 = Math.floor(Math.random() * 6) + 30;
let randomNum2 = Math.floor(Math.random() * 6) + 20;
let randomNum3 = Math.floor(Math.random() * 6) + 25;
let randomNum4 = Math.floor(Math.random() * 16) + 20;

// To store the current page user is on
let currentPage = 'None';

// variables needed to display a report at the end of the game
let reportVariables = {
    helpCount: 0,
    exploreIsland: false,
    buildAFire: false,
    skullLocation: false,
    waterfallLocation: false,
    caveLocation: false,
    energyStart: 50,
    energyAfterLocation1: randomNum1,
    energyAfterLocation2: randomNum2,
    energyAfterFire: randomNum3,
    shelterType: "",
    energyAfterShelter: 0,
    nightCount: 0,
    energyAfterNight: randomNum4,
    shipEscape: false,
    failureCount: 0,
    helpEscape: false,
    success: false,
    energyEnd: 0
}

// Array for data that will be exported from report page
let reportData = [];

// Initialize dark mode from localStorage
document.addEventListener("DOMContentLoaded", () => {
    // Check for dark mode preference
    const darkModePref = localStorage.getItem('darkMode') === 'true';
    if (darkModePref) {
        document.body.classList.add('dark-mode');
        if (document.getElementById('dark-mode-toggle')) {
            document.getElementById('dark-mode-toggle').checked = true;
        }
        darkMode = true;
    }
    
    // Event listener for dark mode toggle
    if (document.getElementById('dark-mode-toggle')) {
        document.getElementById('dark-mode-toggle').addEventListener('change', toggleDarkMode);
    }
    
    // Event listener for audio toggle
    if (document.getElementById('audio-toggle')) {
        document.getElementById('audio-toggle').addEventListener('change', toggleAudio);
    }
    
    // Set event listeners for control buttons
    if (restartButton) {
        restartButton.addEventListener('click', restartGame);
    }
    
    if (helpButton) {
        helpButton.addEventListener('click', helpButtonClick);
    }
    
    if (voiceButton) {
        voiceButton.addEventListener('click', setupSpeechRecognition);
    }
    
    if (exportButton) {
        exportButton.addEventListener('click', function() {
            exportToExcel(reportData, "ReportStats.xlsx");
            showToast("Report exported successfully!");
        });
    }
});

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    darkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', darkMode);
    showToast(darkMode ? "Dark mode enabled" : "Light mode enabled");
}

// Function to toggle audio
function toggleAudio() {
    audioEnabled = document.getElementById('audio-toggle').checked;
    showToast(audioEnabled ? "Audio enabled" : "Audio muted");
    
    // Mute or unmute all audio elements
    const audioElements = [
        levelUpSound1, levelUpSound2, levelUpSound3, 
        levelUpSound4, levelUpSound5, levelUpSound6,
        failureSound, fireSound, nightSound, successSound
    ];
    
    audioElements.forEach(audio => {
        audio.muted = !audioEnabled;
    });
}

// Function to show toast notification
function showToast(message, duration = 3000) {
    toastNotification.textContent = message;
    toastNotification.classList.add('show');
    
    setTimeout(() => {
        toastNotification.classList.remove('show');
    }, duration);
}

// Function to update progress indicator
function updateProgress(progress) {
    gameProgress = progress;
    progressIndicator.style.width = `${progress}%`;
}

// Play sound function that respects audio toggle
function playSound(sound) {
    if (audioEnabled) {
        sound.play();
    }
}

// Main function that helps user navigate between screens
function choose(option) {    
    currentPage = option;
    // If option is:
    switch (option) {
        //The user clicks Instructions
        case 'instruct':
            setupInstructionPage();
            updateProgress(10);
            break;
        // If the button clicked is "Begin"
        case 'begin':
            setupBeginPage();
            updateProgress(20);
            break;
        // If button clicked is continue
        case 'continue':
            setupArrivalPage();
            updateProgress(30);
            break;
        // If button clicked is Explore
        case 'Explore':
            setupExploreIslandPage();
            updateProgress(40);
            break;
        // If the button clicked it Return
        case 'Return':
            setupEveningPage();
            updateProgress(50);
            break;
        // If create a fire button is clicked:
        case 'Fire':
            setupFirePage();
            updateProgress(40);
            break;
        // If the button buildFire is clicked:
        case 'buildFire':
            setupBuildFirePage();
            updateProgress(50);
            break;
        // If user clicks Small Shelter
        case 'smallShelter':
            setupShelter('images/smallshelter.jpeg', "Small Shelter");
            updateProgress(60);
            break;
        // If user clicks Medium Shelter
        case 'mediumShelter':
            setupShelter('images/mediumshelter.jpeg', "Medium Shelter");
            updateProgress(60);
            break;
        // If user to build a large shelter
        case 'largeShelter':
            setupShelter('images/largeImage.jpeg', "Large Shelter");
            updateProgress(60);
            break;
        // If user clicks advance to next day
        case 'nextDay':
            setupNextDayPage();
            updateProgress(70);
            break;
        // If user wants to wave to get ship's attention
        case 'shipAttention':
            setupShipAttentionPage();
            updateProgress(80);
            break;
        // If user has to option to retry:
        case 'reTry':
            // Return back to the rescue page
            choose('nextDay');
            // Hide the failure message
            failureMessage.style.display = 'none';
            break;
        // If the user decides to write help on the sand
        case 'helpOnSand':
            setupSuccessPage();
            updateProgress(100);
            break;
        // If user clicks home to restart game
        case 'report':
            setupReportPage();
            break;
        // If user wants to restart game
        case 'Restart':
            restartGame();
            break;
        // If the user wants to return from help page
        case 'returnFromHelp':
            // Add a sessionStorage variable to know that we are coming from help page
	        sessionStorage.setItem("returnFromHelp", "true");
            // going back the first page
            window.location.href = 'index.html';
            break;
    }    
}

// Function to setup the instruction page
function setupInstructionPage(){
    // Play sound of levelUp 1
    playSound(levelUpSound1);
    
    // Show control buttons
    helpButton.style.display = 'flex';
    restartButton.style.display = 'flex';
    voiceButton.style.display = 'flex';

    // Hide Image
    survivalImage.style.display = 'none';
    // Credentials are hidden
    credentials.style.display = 'none';
    
    // Title changed to instructions
    storyTitle.innerText = 'Instructions';
    
    // Creating text and instructions
    storyText.innerHTML = `
        <p>The mission of this app is to lead your team to survival!
         You and your group were flying over an active volcano when—without warning—it erupted. 
         Blinding ash caused the plane to crash into the unknown. You must find ways to escape the island 
         before it is too late.</p>
        <ul id = "instruction_list">
            <li><i class="fas fa-map-marked-alt"></i> Choice 1: Explore - Find Locations on the Island</li>
            <li><i class="fas fa-fire"></i> Choice 2: Fire - You need to stay warm</li>
            <li><i class="fas fa-home"></i> Choice 3: Shelter - Cover is essential</li>
            <li><i class="fas fa-ship"></i> Choice 4: The Ship - Get rescued by a ship</li>
            <li><i class="fas fa-helicopter"></i> Choice 5: The Helicopter - Get rescued by a helicopter</li>
            <li><i class="fas fa-info-circle"></i> Note: There will be an energy symbol on the right corner. Voice
            Activation and AI are tools to help throughout this program</li>
        </ul>
    `;
    
    // Hide beware text
    beware.style.display = 'none';
    
    // Creating Begin Button
    choices.innerHTML = `
        <button onclick="choose('begin')"><i class="fas fa-play"></i> Begin Your Quest</button>
    `;
    
    // Show toast notification
    showToast("Welcome to Island Survival! Read the instructions to get started.");
}

// Function to setup the beginning page
function setupBeginPage(){
    // Play sound to enhance the beginning scene
    playSound(levelUpSound5);
    
    // Set the title of the page to "The Beginning"
    storyTitle.innerText = "The Beginning";
    
    // Change the survival image to the plane crash image and apply styling
    survivalImage.src = 'images/plane.webp';  // Set image source to plane crash
    survivalImage.style.display = 'block';  // Make the image visible
    
    // Change the story text to introduce the beginning scenario
    storyText.innerText = "You are in a plane with the pilot when everything goes blurry. " +
        "You look out the window " + "and the plane is uncontrollable. The plane crashes and " +
        "you hit your head hard on the seat next to you...";
    
    // Create a "Continue" button for the player to proceed to the next part of the story
    choices.innerHTML = `
        <button onclick="choose('continue')"><i class="fas fa-arrow-right"></i> Continue</button>
    `;
    
    // Show toast message
    showToast("Your adventure begins...");
}

// Function to setup the arrival page
function setupArrivalPage(){
    // play levelUp 2 sound
    playSound(levelUpSound2);
    
    // Show energy display    
    energyDisplay.style.display = 'flex';
    energyValue.textContent = "50";
    
    // Change title to Arrival
    storyTitle.innerText = "The Arrival";

    // Changing Text of Story
    storyText.innerHTML = `
        <p>You wake up on a deserted island, surrounded by
        scattered wreckage of the plane. As you step out of the plane, you notice that you aren't alone.
        You have 3 companions - Ishaan, Mikail, and Aryaman.</p>
        <ul id = "names_list">
            <li><i class="fas fa-running"></i> Ishaan: Athletic, Sporty, and a Jock</li>
            <li><i class="fas fa-brain"></i> Mikail: Extremely Smart, Talented, and Defined</li>
            <li><i class="fas fa-dumbbell"></i> Aryaman: Strong, Tall, and Muscular</li>
        </ul>
    `;
    
    // changing image to plane crash
    survivalImage.src = "images/planecrash.webp"; // source of image
    // setting animation of that image
    survivalImage.animate(
        [
            { opacity: 0 },   // Starting state: fully transparent
            { opacity: 1 }    // Ending state: fully opaque
        ],
        {
            duration: 1000,    // Duration in milliseconds
            easing: 'ease-in', // Animation easing type
            fill: 'forwards'   // Keeps the final state after animation
        }
    );
    
    // Creating Instructions for user to start their experience
    const instructions = document.createElement('p');
    // Setting Instruction Text
    instructions.innerText = "You find out that your companions have extra wood and a lighter. What are your next " +
        "steps. Choose carefully!"
    // Adding it onto the page
    storyText.appendChild(instructions);

    // Creating New Buttons with icons
    choices.innerHTML = `
        <button style="margin-right: 15px;" onclick="choose('Explore')">
            <i class="fas fa-compass"></i> Explore the Island
        </button>
        <button onclick="choose('Fire')">
            <i class="fas fa-fire"></i> Build a Fire
        </button>
    `;
    
    // Show toast message
    showToast("You've been stranded! Make your first decision.");
}

// Function to setup the explore island page
function setupExploreIslandPage(){
    playSound(levelUpSound3);
    
    // Explore island is set to true
    reportVariables.exploreIsland = true;
    
    //Update Title
    storyTitle.innerText = "Exploration";
    
    //Update Text
    storyText.innerText = "You decide to explore the island. Each of you go to one " +
        "corner of the island. As your walking, you pass by 3 locations. Please select 2 locations " +
        "that you found the most interesting.";
    
    // Hide main image    
    survivalImage.style.display = 'none';
    
    // Show location container
    locationContainer.style.display = 'flex';
    
    // Setup click handlers for location buttons
    skullRockButton.onclick = function() {
        handleLocationSelect('skull');
    };
    
    caveButton.onclick = function() {
        handleLocationSelect('cave');
    };
    
    fallsButton.onclick = function() {
        handleLocationSelect('falls');
    };
    
    // Return Button is shown
    choices.innerHTML = `
        <button id="returnButton" onclick="choose('Return')">
            <i class="fas fa-arrow-left"></i> Return Back
        </button>
    `;
    
    // Show toast message
    showToast("Choose two locations to explore");
}

// Function to handle location selection
function handleLocationSelect(location) {
    // Increment count for tracking selected locations
    count++;
    
    // Handle first selection
    if (count === 1) {
        handleFirstLocationSelection(location);
    }
    
    // Handle second selection
    if (count === 2) {
        handleSecondLocationSelection(location);
        
        // Show return warning
        beware.style.display = 'block';
        beware.innerText = "You have searched 2 locations. Head back before it's too dark!";
    }
}

// Function to handle first location selection
function handleFirstLocationSelection(location) {
    // Update energy display
    energyValue.textContent = reportVariables.energyAfterLocation1;
    
    // Process different locations
    if (location === 'skull') {
        // Mark skull rock as visited
        reportVariables.skullLocation = true;
        // Update UI for skull rock selection
        skullRockImage.src = 'images/cross.jpeg';
        skullRockButton.disabled = true;
        skullRockButton.style.opacity = "0.5";
        // Update story text
        storyText.innerText = "You decide to visit the unusual rock shaped like a skull and find yourself " +
            "surrounded with birds. You find multiple food sources such as animals and vegetables!";
        storyText.style.color = "purple";
    } 
    else if (location === 'cave') {
        // Mark cave as visited
        reportVariables.caveLocation = true;
        // Update UI for cave selection
        ghostLightCaveImage.src = 'images/cross.jpeg';
        caveButton.disabled = true;
        caveButton.style.opacity = "0.5";
        // Update story text
        storyText.innerText = "You decide to visit the cave but soon realize that it's extremely unsafe. " +
            "You almost get killed by a ghost and promise yourself to never return!";
        storyText.style.color = "blue";
    }
    else if (location === 'falls') {
        // Mark waterfall as visited
        reportVariables.waterfallLocation = true;
        // Update UI for waterfall selection
        forgottenFallsImage.src = 'images/cross.jpeg';
        fallsButton.disabled = true;
        fallsButton.style.opacity = "0.5";
        // Update story text
        storyText.innerText = "You decide to visit the ginormous waterfall which disappears once in a while. You see that it has a large pond" +
            " and is an excellent source for fresh water and fruit.";
        storyText.style.color = "green";
    }
    
    // Show toast for first location
    showToast("Energy reduced to " + reportVariables.energyAfterLocation1 + ". Choose one more location.");
}

// Function to handle second location selection
function handleSecondLocationSelection(location) {
    // Update energy display
    energyValue.textContent = reportVariables.energyAfterLocation2;
    
    // Process different locations
    if (location === 'skull') {
        // Mark skull rock as visited
        reportVariables.skullLocation = true;
        // Update UI for skull rock selection
        skullRockImage.src = 'images/cross.jpeg';
        skullRockButton.disabled = true;
        skullRockButton.style.opacity = "0.5";
        // Update story text
        storyText.innerText = "You decide to visit the unusual rock shaped like a skull and find yourself " +
            "surrounded with birds. You find multiple food sources such as animals and vegetables!";
        storyText.style.color = "purple";
    } 
    else if (location === 'cave') {
        // Mark cave as visited
        reportVariables.caveLocation = true;
        // Update UI for cave selection
        ghostLightCaveImage.src = 'images/cross.jpeg';
        caveButton.disabled = true;
        caveButton.style.opacity = "0.5";
        // Update story text
        storyText.innerText = "You decide to visit the cave but soon realize that it's extremely unsafe. " +
            "You almost get killed by a ghost and promise yourself to never return!";
        storyText.style.color = "blue";
    }
    else if (location === 'falls') {
        // Mark waterfall as visited
        reportVariables.waterfallLocation = true;
        // Update UI for waterfall selection
        forgottenFallsImage.src = 'images/cross.jpeg';
        fallsButton.disabled = true;
        fallsButton.style.opacity = "0.5";
        // Update story text
        storyText.innerText = "You decide to visit the ginormous waterfall which disappears once in a while. You see that it has a large pond" +
            " and is an excellent source for fresh water.";
        storyText.style.color = "green";
    }
    
    // Show toast for second location
    showToast("Energy reduced to " + reportVariables.energyAfterLocation2 + ". Time to return to camp!");
}

// Function to setup the evening page
function setupEveningPage(){
    // Play levelup 4 sound
    playSound(levelUpSound4);
    
    //Hide all location elements
    locationContainer.style.display = 'none';
    beware.style.display = 'none';
    
    // Change title of the page
    storyTitle.innerText = 'Evening #1'
    storyText.style.color = "var(--text-color)";
    
    // Create a list of different types of shelters
    storyText.innerHTML = `
    <p>After reaching your campsite you decide to make camp. You can make 3 types of shelters: Small, Medium, and Large
    with their respective advantages. Choose extremely carefully. Your life depends on it!</p>
    <ul id = "types_of_shelters">
            <li><i class="fas fa-home"></i> Small: Lightweight, requires fewer materials, and better insulation in cold </li>
            <li><i class="fas fa-warehouse"></i> Medium: Storage Space, stronger, and suitable for long trips</li>
            <li><i class="fas fa-building"></i> Large: Ample space for large groups, standing space, and durable in harsh conditions</li>
        </ul>
    `
    // Creating an image of "building a shelter"
    survivalImage.src = 'images/buildingShelter.jpeg';
    survivalImage.style.display = 'block';
    
    // Animating the Image
    survivalImage.animate(
        [
            { opacity: 0 },   // Starting state: fully transparent
            { opacity: 1 }    // Ending state: fully opaque
        ],
        {
            duration: 1000,    // Duration in milliseconds
            easing: 'ease-in', // Animation easing type
            fill: 'forwards'   // Keeps the final state after animation
        }
    );
    
    // Giving user three types of building to user from
    choices.innerHTML = `
        <button onclick="choose('smallShelter')" style="margin-right: 10px;">
            <i class="fas fa-home"></i> Small
        </button>
        <button onclick="choose('mediumShelter')" style="margin-right: 10px;">
            <i class="fas fa-warehouse"></i> Medium
        </button>
        <button onclick="choose('largeShelter')">
            <i class="fas fa-building"></i> Large
        </button>
    `;
    
    // Show toast message
    showToast("Choose a shelter to build for the night");
}

// Function to setup the fire page
function setupFirePage(){
    // Build a fire on the report will be true
    reportVariables.buildAFire = true;
    
    // Play a new Sound;
    playSound(levelUpSound3);
    
    // Update Title
    storyTitle.innerText = 'Ignition';
    
    // Update Text
    storyText.innerText = 'You decided to create a fire with a wood and a lighter. Please click "Build Fire" for ' +
        'ignition';
    
    // Update Image;
    survivalImage.src = 'images/ignition.jpeg';
    survivalImage.style.display = 'block';
    
    // Adding animations to that image
    survivalImage.animate(
        [
            { opacity: 0 },   // Starting state: fully transparent
            { opacity: 1 }    // Ending state: fully opaque
        ],
        {
            duration: 1000,    // Duration in milliseconds
            easing: 'ease-in', // Animation easing type
            fill: 'forwards'   // Keeps the final state after animation
        }
    );
    
    // Giving user the choice to build a fire
    choices.innerHTML = `
        <button onclick="choose('buildFire')">
            <i class="fas fa-fire"></i> Build A Fire
        </button>
    `;
    
    // Show toast message
    showToast("Ready to ignite the fire");
}

// Function to setup the build fire page
function setupBuildFirePage(){
    storyTitle.innerText = 'Ignition';
    
    // Display the sound of a build happening
    playSound(fireSound);
    
    // Update Image
    survivalImage.src = 'images/fire.jpeg';
    
    // Animating the image
    survivalImage.animate(
        [
            { opacity: 0 },   // Starting state: fully transparent
            { opacity: 1 }    // Ending state: fully opaque
        ],
        {
            duration: 1000,    // Duration in milliseconds
            easing: 'ease-in', // Animation easing type
            fill: 'forwards'   // Keeps the final state after animation
        }
    );
    
    // Changing energy points
    energyValue.textContent = reportVariables.energyAfterFire;
    
    // Changing Text to congratulate the user
    storyText.innerText = 'Wow! That is an amazing fire! You used ' + (50 - randomNum3) + ' energy points. Head back before it is too dark.';
    
    // Telling user to return back to the camp - site
    choices.innerHTML = `
        <button onclick="choose('Return')">
            <i class="fas fa-arrow-left"></i> Return Back
        </button>
    `;
    
    // Show toast message
    showToast("Fire built successfully! Energy reduced to " + reportVariables.energyAfterFire);
}

// Function to setup the shelter
function setupShelter(shelterImageSrc, shelterType){
    // play a different sound
    playSound(levelUpSound5);
    
    // Update the image to an image of a shelter
    survivalImage.src = shelterImageSrc;
    reportVariables.shelterType = shelterType;
    
    // Animate the image
    survivalImage.animate(
        [
            { opacity: 0 },   // Starting state: fully transparent
            { opacity: 1 }    // Ending state: fully opaque
        ],
        {
            duration: 1000,    // Duration in milliseconds
            easing: 'ease-in', // Animation easing type
            fill: 'forwards'   // Keeps the final state after animation
        }
    );
    
    // Styling the Image
    survivalImage.style.width = '300px';  // Set the desired width
    survivalImage.style.height = 'auto';  // Maintain aspect ratio            
    
    // Show shelter message
    shelterMessage.style.display = 'block';
    
    // Update energy
    energyValue.textContent = '0';
    
    // Hide choices
    choices.style.display = 'none';
    
    // Show toast message
    showToast("Building " + shelterType + "...");
    
    // Go to Night Time page automatically
    setTimeout(() => {
        nightTime();  // Call the function after 3 seconds
    }, 3000);
}

// Function to setup the night time
function nightTime() {
    // play nighttime sound
    playSound(nightSound);
    
    // increase night counter to track # of nights
    nightCounter++;
    reportVariables.nightCount++;
    
    // Change title
    storyTitle.innerText = 'Night #' + nightCounter;
    
    // Change text
    storyText.innerText = 'You reached 0 energy points. You are extremely tired from all the ' +
        'activities you have done. You decide to sleep. Hope you can survive the next day';
    
    // Hide shelter message
    shelterMessage.style.display = 'none';
    
    // Display Night Image
    survivalImage.src = 'images/nightOne.jpeg';
    
    // Animate the Image
    survivalImage.animate(
        [
            { opacity: 0 },   // Starting state: fully transparent
            { opacity: 1 }    // Ending state: fully opaque
        ],
        {
            duration: 1000,    // Duration in milliseconds
            easing: 'ease-in', // Animation easing type
            fill: 'forwards'   // Keeps the final state after animation
        }
    );
    
    // Give user the option to start next day
    choices.style.display = 'flex';
    choices.innerHTML = `
        <button onclick="choose('nextDay')">
            <i class="fas fa-sun"></i> Next Day
        </button>
    `;
    
    // Show toast message
    showToast("Night has fallen. Rest until morning...");
}

// Function to setup the next day page
function setupNextDayPage(){
    // play sound
    playSound(levelUpSound6);
    
    // Update title
    storyTitle.innerText = 'The Choice';
    
    // Update text
    storyText.innerText = 'The next morning you see a ship passing by and suddenly realize that ' +
        'you need to think of rescue strategies. You only have ' + randomNum4 + ' energy points since you are ' +
        'tired from yesterday. Choose with caution. Only one works!';
    
    // Update image
    survivalImage.src = 'images/shipPassing.jpeg';
    
    // Animate Image
    survivalImage.animate(
        [
            { opacity: 0 },   // Starting state: fully transparent
            { opacity: 1 }    // Ending state: fully opaque
        ],
        {
            duration: 1000,    // Duration in milliseconds
            easing: 'ease-in', // Animation easing type
            fill: 'forwards'   // Keeps the final state after animation
        }
    );
    
    // Set Energy Points to 30
    energyValue.textContent = reportVariables.energyAfterNight;
    
    // Create choice buttons
    choices.innerHTML = `
        <button style="margin-right: 15px;" onclick="choose('shipAttention')">
            <i class="fas fa-flag-checkered"></i> Get Ship's Attention
        </button> 
        <button onclick="choose('helpOnSand')">
            <i class="fas fa-pen"></i> Write HELP on Sand
        </button> 
    `;
    
    // Show toast message
    showToast("A ship is passing by! How will you signal for help?");
}

// Function to setup the ship attention page
function setupShipAttentionPage(){
    // Play the failure sound since user didn't escape
    playSound(failureSound);
    
    // Change Title
    storyTitle.innerText = 'Failure!';
    reportVariables.shipEscape = true;
    reportVariables.failureCount++;
    
    // Change Text
    storyText.innerText = 'You and your friends try to wave at the ship as it is your last ' +
        'hope to escape. Sadly the ship does not see you. You run out of food and you fail to ' +
        'escape the island';
    
    // Change Image
    survivalImage.src = 'images/shipFailure.jpeg';
    
    // Change animation of Image
    survivalImage.animate(
        [
            { opacity: 0 },   // Starting state: fully transparent
            { opacity: 1 }    // Ending state: fully opaque
        ],
        {
            duration: 1000,    // Duration in milliseconds
            easing: 'ease-in', // Animation easing type
            fill: 'forwards'   // Keeps the final state after animation
        }
    );
    
    // Set Energy Points to 0
    energyValue.textContent = '0';
    
    // Show toast message
    showToast("The ship didn't see you! Your attempt failed...");
    
    // Display failure message after delay
    setTimeout(() => {
        // Display a failure message
        failureMessage.style.display = 'block';
    }, 2000);
    
    // Make a re-try button for user to attempt to escape
    choices.innerHTML = `
        <button onclick="choose('reTry')">
            <i class="fas fa-redo"></i> Try Again
        </button>
    `;
}

// Function to setup the success page
function setupSuccessPage(){
    // Play success sound
    playSound(successSound);
    
    // Change title
    storyTitle.innerText = 'Success!';
    reportVariables.helpEscape = true;
    reportVariables.success = true;
    
    // Change text
    storyText.innerText = 'You and your friends write "Help" with a stick since you know the ship wont see you. ' +
        'Luckily this works, and hours later a helicopter arrives to get you rescued. It had been a harsh 2 days ' +
        'but you made it!';
    
    // Change Image
    survivalImage.src = 'images/helicopter.jpeg';
    
    // Animate the Image above
    survivalImage.animate(
        [
            { opacity: 0 },   // Starting state: fully transparent
            { opacity: 1 }    // Ending state: fully opaque
        ],
        {
            duration: 1000,    // Duration in milliseconds
            easing: 'ease-in', // Animation easing type
            fill: 'forwards'   // Keeps the final state after animation
        }
    );
    
    // Set energy points to 0
    energyValue.textContent = '0';
    
    // Show toast message
    showToast("Congratulations! You've been rescued!");
    
    // Display a success message after delay
    setTimeout(() => {
        successMessage.style.display = 'block';
    }, 2000);
    
    // Show option for report
    choices.innerHTML = `
        <button onclick="choose('report')">
            <i class="fas fa-file-alt"></i> View Report
        </button>
    `;
}

// Function to setup the report page
function setupReportPage(){
    // Elements from previous pages are hidden
    storyTitle.innerText = 'Survival Report';
    energyDisplay.style.display = 'none';
    successMessage.style.display = 'none';
    survivalImage.style.display = 'none';
    choices.style.display = 'none';
    helpButton.style.display = 'none';
    
    // Sound is played
    playSound(levelUpSound1);
    
    // Export Button is shown
    exportButton.style.display = 'flex';

    // Report messages that will be displayed on help page
    let locationReportMessage = "";
    let buildFireReportMessage = "";
    let shelterReportMessage = "";
    let nightReportMessage = "";
    let shipEscapeReportMessage = "";
    let helpEscapeReportMessage = "";

    nightReportMessage = "Energy after the Night State: " + reportVariables.energyAfterNight;
    
    // If island is explored, report gets updated and report data gets input
    if(reportVariables.exploreIsland){
        if(reportVariables.skullLocation && reportVariables.waterfallLocation){ // User visited Skull Rock and Waterfall
            locationReportMessage = "Explored the island: True\nLocations Visited: Skull Rock and Forgotten Falls\n\tEnergy after location 1: " + reportVariables.energyAfterLocation1 + "\n\tEnergy after location 2: " + reportVariables.energyAfterLocation2;
            // reportData is updated
            reportData = [
                { Activity: "Start of Journey", Energy: 50},
                { Activity: "Explored Island", Energy: 50},
                { Activity: "Visited Skull Rock", Energy: reportVariables.energyAfterLocation1},
                { Activity: "Visited Forgotten Falls", Energy: reportVariables.energyAfterLocation2},
                { Activity: "Built a Shelter", Energy: reportVariables.energyAfterShelter},
                { Activity: "Night One", Energy: reportVariables.energyAfterNight},
                { Activity: "Call for Help: Helicopter", Energy: 0},
                { Activity: "End of Journey", Energy: 0}
            ];
        } else if(reportVariables.waterfallLocation && reportVariables.caveLocation){ // User visited Waterfall and Cave
            locationReportMessage = "Explored the island: True\nLocations Visited: Forgotten Falls and Ghost Cave\n\tEnergy after location 1: " + reportVariables.energyAfterLocation1 + "\n\tEnergy after location 2: " + reportVariables.energyAfterLocation2;
            reportData = [
                { Activity: "Start of Journey", Energy: 50},
                { Activity: "Explored Island", Energy: 50},
                { Activity: "Visited Forgotten Falls", Energy: reportVariables.energyAfterLocation1},
                { Activity: "Visited Ghost Cave", Energy: reportVariables.energyAfterLocation2},
                { Activity: "Built a Shelter", Energy: reportVariables.energyAfterShelter},
                { Activity: "Night One", Energy: reportVariables.energyAfterNight},
                { Activity: "Call for Help: Helicopter", Energy: 0},
                { Activity: "End of Journey", Energy: 0}
            ];
        } else{ // User visited Skull Rock and Cave
            locationReportMessage = "Explored the island: True\nLocations Visited: Skull Rock and Ghost Cave\n\tEnergy after location 1: " + reportVariables.energyAfterLocation1 + "\n\tEnergy after location 2: " + reportVariables.energyAfterLocation2;
            reportData = [
                { Activity: "Start of Journey", Energy: 50},
                { Activity: "Explored Island", Energy: 50},
                { Activity: "Visited Skull Rock", Energy: reportVariables.energyAfterLocation1},
                { Activity: "Visited Ghost Cave", Energy: reportVariables.energyAfterLocation2},
                { Activity: "Built a Shelter", Energy: reportVariables.energyAfterShelter},
                { Activity: "Night One", Energy: reportVariables.energyAfterNight},
                { Activity: "Call for Help: Helicopter", Energy: 0},
                { Activity: "End of Journey", Energy: 0}
            ];
        }
    } else{
        locationReportMessage = "Explored the island: False\n\tNo Energy Change"; // User didn't explore island
    }

    // If user built a fire
    if(reportVariables.buildAFire) {
        buildFireReportMessage = "Built a Fire: True\n\tEnergy after building a fire: " + reportVariables.energyAfterFire;
         reportData = [
             { Activity: "Start of Journey", Energy: 50},
             { Activity: "Built a Fire", Energy: reportVariables.energyAfterFire},
             { Activity: "Built a Shelter", Energy: reportVariables.energyAfterShelter},
             { Activity: "Night One", Energy: reportVariables.energyAfterNight},
             { Activity: "Call for Help: Helicopter", Energy: 0},
             { Activity: "End of Journey", Energy: 0}
        ];

    } else{ // User didn't build a fire
        buildFireReportMessage = "Built a Fire: False\n\tNo Energy Change";
    }

    // Message is set based on the different shelters that the user built
    if(reportVariables.shelterType === "Small Shelter"){
        shelterReportMessage = "Type of Shelter: Small\n\tEnergy after Shelter: 0";
    } else if(reportVariables.shelterType === "Medium Shelter"){
        shelterReportMessage = "Type of Shelter: Medium\n\tEnergy after Shelter: 0";
    } else{
        shelterReportMessage = "Type of Shelter: Large\n\tEnergy after Shelter: 0";
    }

    // Report Message is set based on the different ways the user escaped the island
    if(reportVariables.shipEscape){
        shipEscapeReportMessage = "Did user try to escape from the ship: True\n\tFailure Count: " + reportVariables.failureCount;
    } else {
        shipEscapeReportMessage = "Did user try to escape from the ship: False\n\tFailure Count: None";
    }

    if(reportVariables.helpEscape){
        helpEscapeReportMessage = "Did user escape from helicopter: True\n\tSuccess: True";
    }

    // Story - Text is changes to display the report messages on screen
    storyText.innerHTML = `
    <div class="report-container">
        <h1><i class="fas fa-clipboard-list"></i> Survival Report</h1>
        <ul class="report-list">
            <li><pre><i class="fas fa-bolt"></i> Energy at Start: 50</pre></li>
            <li><pre><i class="fas fa-compass"></i> ${locationReportMessage}</pre></li>
            <li><pre><i class="fas fa-fire"></i> ${buildFireReportMessage}</pre></li>
            <li><pre><i class="fas fa-home"></i> ${shelterReportMessage}</pre></li>
            <li><pre><i class="fas fa-moon"></i> ${nightReportMessage}</pre></li>
            <li><pre><i class="fas fa-ship"></i> ${shipEscapeReportMessage}</pre></li>
            <li><pre><i class="fas fa-helicopter"></i> ${helpEscapeReportMessage}</pre></li>
            <li><pre><i class="fas fa-battery-empty"></i> Energy at end: 0</pre></li>
        </ul>
        <div id="choices" style="display: block; margin-top: 20px;">
            <button onclick="choose('Restart')">
                <i class="fas fa-redo"></i> Play Again
            </button>
        </div>
    </div>`;
    
    // Show toast message
    showToast("View your survival report! Click Export to save as Excel.");
}

// Function to restart the game
function restartGame(){
    // Hide success message
    successMessage.style.display = 'none';
    // Play a sound
    playSound(levelUpSound1);
    // Reset game state
    count = 0;
    nightCounter = 0;
    gameProgress = 0;
    
    // Reset report variables
    reportVariables = {
        helpCount: 0,
        exploreIsland: false,
        buildAFire: false,
        skullLocation: false,
        waterfallLocation: false,
        caveLocation: false,
        energyStart: 50,
        energyAfterLocation1: Math.floor(Math.random() * 6) + 30,
        energyAfterLocation2: Math.floor(Math.random() * 6) + 20,
        energyAfterFire: Math.floor(Math.random() * 6) + 25,
        shelterType: "",
        energyAfterShelter: 0,
        nightCount: 0,
        energyAfterNight: Math.floor(Math.random() * 16) + 20,
        shipEscape: false,
        failureCount: 0,
        helpEscape: false,
        success: false,
        energyEnd: 0
    };
    
    // Reset report data
    reportData = [];
    
    // Show toast message
    showToast("Restarting game...");
    
    // Go back to the first page of the program
    window.location.href = 'index.html';
}

// Function to handle help button click
function helpButtonClick(){
    reportVariables.helpCount++;

    // Store current game state in session storage
    sessionStorage.setItem("currentPage", currentPage);
    sessionStorage.setItem("darkMode", darkMode);
    sessionStorage.setItem("audioEnabled", audioEnabled);
    sessionStorage.setItem("energyValue", energyValue.textContent);
    sessionStorage.setItem("reportVariables", JSON.stringify(reportVariables));
    
    // Hide UI elements
    energyDisplay.style.display = 'none';
    
    // Show toast message
    showToast("Going to help page...");
    
    // Navigate to help page
    window.location.href = 'helpPage.html';    
}

// Event Listener to load the instructions page when back is clicked from help page
window.addEventListener("load", function() {
    // Check for dark mode preference
    const darkModePref = localStorage.getItem('darkMode') === 'true';
    if (darkModePref) {
        document.body.classList.add('dark-mode');
        if (document.getElementById('dark-mode-toggle')) {
            document.getElementById('dark-mode-toggle').checked = true;
        }
        darkMode = true;
    }
    
    // Check for audio preference
    if (document.getElementById('audio-toggle')) {
        document.getElementById('audio-toggle').checked = audioEnabled;
    }
    
    // Check if returning from help page
    if (sessionStorage.getItem("returnFromHelp") === "true") {
        // Restore game state
        currentPage = sessionStorage.getItem("currentPage");
        darkMode = sessionStorage.getItem("darkMode") === "true";
        audioEnabled = sessionStorage.getItem("audioEnabled") === "true";
        
        // Update energy value if it exists
        if (sessionStorage.getItem("energyValue")) {
            energyValue.textContent = sessionStorage.getItem("energyValue");
        }
        
        // Restore report variables
        if (sessionStorage.getItem("reportVariables")) {
            reportVariables = JSON.parse(sessionStorage.getItem("reportVariables"));
        }
        
        // Remove temporary session data
        sessionStorage.removeItem("returnFromHelp");
        sessionStorage.removeItem("currentPage");
        sessionStorage.removeItem("darkMode");
        sessionStorage.removeItem("audioEnabled");
        sessionStorage.removeItem("energyValue");
        sessionStorage.removeItem("reportVariables");
        
        // Go back to the page from where help was clicked
        choose(currentPage);
    }
});

// Function to setup speech recognition for voice commands
function setupSpeechRecognition(){
    // Show toast message
    showToast("Voice recognition activated. Speak a command...");
    
    // Get the SpeechRecognition interface
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    // Create a new recognition instance
    const recognition = new SpeechRecognition();

    // Set properties
    recognition.lang = 'en-US'; // Language
    recognition.continuous = false; // Stop after one command
    recognition.interimResults = false; // Final results only

    // Start recognition
    recognition.start();

    // Handle recognition results
    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim();
        const command = transcript.trim().toLowerCase();
        console.log("Voice command detected: " + command);
        
        // Show detected command
        showToast("Command detected: " + command);

        // Process different voice commands
        processVoiceCommand(command);
    };

    // Handle errors
    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        showToast("Voice recognition error: " + event.error);
    };

    // Cleanup when recognition ends
    recognition.onend = () => {
        console.log("Voice recognition ended");
    };
}

// Function to process voice commands
function processVoiceCommand(command) {
    // For each text detected, it would transition to that page
    switch(command){
        case 'stop':
        case 'restart':
        case 'reset':
            restartGame();
            break;
        case 'begin':
        case 'start':
        case 'start game':
            choose('begin');
            break;
        case 'continue':
        case 'next':
            choose('continue')
            break;
        case 'explore':
        case 'explore the island':
        case 'explore island':
            choose('Explore');
            break;
        case 'fire':
        case 'build fire':
        case 'make fire':
            choose('Fire');
            break;
        case 'build fire':
        case 'ignite':
        case 'light fire':
            choose('buildFire');
            break;
        case 'return':
        case 'return back':
        case 'go back':
            choose('Return');
            break;
        case 'small':
        case 'small shelter':
            choose('smallShelter');
            break;
        case 'medium':
        case 'medium shelter':
            choose('mediumShelter');
            break;
        case 'large':
        case 'large shelter':
            choose('largeShelter');
            break;
        case 'next day':
        case 'morning':
        case 'wake up':
            choose('nextDay');
            break;
        case 'ship':
        case 'signal ship':
        case 'get ship attention':
        case 'wave':
            choose('shipAttention');
            break;
        case 'try again':
        case 'retry':
            choose('reTry');
            break;
        case 'help':
        case 'help page':
            helpButtonClick();
            break;
        case 'write help':
        case 'write help on sand':
        case 'write in sand':
        case 'sand message':
            choose('helpOnSand');
            break;
        case 'report':
        case 'show report':
        case 'view report':
            choose('report');
            break;
        case 'dark mode':
        case 'toggle dark mode':
            toggleDarkMode();
            break;
        case 'mute':
        case 'toggle audio':
        case 'turn off sound':
            if (document.getElementById('audio-toggle')) {
                document.getElementById('audio-toggle').checked = !audioEnabled;
                toggleAudio();
            }
            break;
        default:
            showToast("Command not recognized. Try again.");
    }
}

// Function to export data to Excel
function exportToExcel(data, fileName) {
    console.log("Exporting data to Excel:", data);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert input data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add the sheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Survival Report");

    // Style the worksheet (headers, etc.)
    const headerStyle = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "4CAF50" } }
    };
    
    // Apply formatting (basic version since full styling requires more complex code)
    const colWidths = [{ wch: 30 }, { wch: 10 }];
    worksheet['!cols'] = colWidths;

    // Export the workbook to a file
    XLSX.writeFile(workbook, fileName);
}