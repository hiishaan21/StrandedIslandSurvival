// Variables and placeholders for all HTML divisions and elements
// Using getElementById to store HTML output into variables
const storyTitle = document.getElementById('story-title');
const storyText = document.getElementById('story-text');
const beware = document.getElementById('beware');
const survivalImage = document.getElementById('survival-image');
const credentials = document.getElementById('credentials');
const choices = document.getElementById('choices');

// Element to display the player's energy points
const energyPointsElement = createEnergyPoints();
const energyImage = createEnergyImage();

// Creating differnt buttons
const stopButton = creatingStopButton();
const microPhoneButton = creatingMicrophoneButton();
const helpButton = creatingHelpButton();
const exportButton = creatingExportButton();

// Images for various game locations
const skullRockImage = creatingSkullRockImage();
const ghostLightCaveImage = creatingGhostLightCaveImage();
const forgottenFallsImage = creatingForgottenFalls();

// Buttons to navigate to different locations in the game
const skullRockButton = creatingSkullRockButton();
const caveButton = creatingCaveButton();
const fallsButton = creatingFallsButton();

// Messages that are displayed for different events in the game
const shelterMessage = createShelterMessage();
const failureMessage = createFailureMessage();
const successMessage = creatingSuccessMessage();

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

// Variables to track game state
let count = 0;           // General counter for tracking certain events
let nightCounter = 0;    // Counter to track the number of nights passed

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

// Main function that helps user navigate between screens
function choose(option) {    
    currentPage = option;
    // If option is:
    switch (option) {
        //The user clicks Instructions
        case 'instruct':
            setupInstructionPage();
            break;
        // If the button clicked is "Begin"
        case 'begin':
            setupBeginPage();
            break;
        // If button clicked is continue
        case 'continue':
            setupArrivalPage();
            break;
        // If button clicked is Explore
        case 'Explore':
            setupExploreIslandPage();
            break;
        // If the button clicked it Return
        case 'Return':
            setupEveningPage();
            break;
        // If create a fire button is clicked:
        case 'Fire':
            setupFirePage();
            break;
        // If the button buildFire is clicked:
        case 'buildFire':
            setupBuildFirePage();
            break;
        // If user clicks Small Shelter
        case 'smallShelter':
            setupShelter('images/smallshelter.jpeg', "Small Shelter");            
            break;
        // If user clicks Medium Shelter
        case 'mediumShelter':
            setupShelter('images/mediumshelter.jpeg', "Medium Shelter");            
            break;
        // If user to build a large shelter
        case 'largeShelter':
            setupShelter('images/largeImage.jpeg', "Large Shelter");            
            break;
        // If user clicks advance to next day
        case 'nextDay':
            setupNextDayPage();
            break;
        // If user wants to wave to get ship's attention
        case 'shipAttention':
            setupShipAttentionPage();
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
            // choose('Return'); // make sure to change
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

// Function to create energy points which will be visible on right hand corner
function createEnergyPoints() {
    // Create the energy points element
    const energyPoints = document.createElement('p');
    energyPoints.style.position = 'absolute'; // Position absolutely within story-container
    energyPoints.style.top = '15px'; // Align with other buttons
    energyPoints.style.right = '75px'; // Position to the left of energy image
    energyPoints.style.fontSize = '18px'; // Font size
    energyPoints.style.fontWeight = 'bold'; // Make the text bold
    energyPoints.style.backgroundColor = 'rgba(255, 159, 67, 0.8)'; // Semi-transparent orange background
    energyPoints.style.color = '#ffffff'; // White text color for contrast
    energyPoints.style.padding = '12px 15px'; // Padding around the text
    energyPoints.style.borderRadius = '12px'; // Rounded corners
    energyPoints.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)'; // Match other buttons' shadow
    energyPoints.style.zIndex = '100'; // Ensure it's above other elements
    energyPoints.style.border = 'none'; // No border
    energyPoints.style.margin = '0'; // No margin
    energyPoints.style.transition = 'transform 0.3s, box-shadow 0.3s'; // Smooth transition
    energyPoints.innerText = "100"; // Default energy value
    energyPoints.style.display = 'none'; // Hidden initially
    
    // Add hover effects to match other elements
    energyPoints.addEventListener('mouseover', () => {
        energyPoints.style.transform = 'scale(1.05)';
        energyPoints.style.boxShadow = '0 6px 20px rgba(255, 159, 67, 0.4)';
    });
    
    energyPoints.addEventListener('mouseout', () => {
        energyPoints.style.transform = 'scale(1)';
        energyPoints.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    });
    
    // Get the story-container and append the energy points to it
    const storyContainer = document.getElementById('story-container');
    storyContainer.appendChild(energyPoints);
    
    return energyPoints;
}

function createEnergyImage(){
    const energyImg = document.createElement('img');
    energyImg.src = 'images/energy.jpeg'; // source of image
    energyImg.style.width = '50px'; // Set the width of the image
    energyImg.style.height = '50px'; // Set the height of the image
    energyImg.style.borderRadius = '50%'; // Make the image circular
    energyImg.style.position = 'absolute'; // Position absolutely within story-container
    energyImg.style.top = '15px'; // Distance from top of story-container
    energyImg.style.margin = '0'; // No margin
    energyImg.style.right = '15px'; // Position in top right corner
    energyImg.style.objectFit = 'cover'; // Ensures the image covers the circular area
    energyImg.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)'; // Match other buttons' shadow
    energyImg.style.border = 'none'; // No border
    energyImg.style.padding = '0'; // No padding
    energyImg.style.overflow = 'hidden'; // Ensure image doesn't overflow
    energyImg.style.zIndex = '100'; // Ensure it's above other elements
    energyImg.style.display = 'none'; // Hide initially
    energyImg.style.transition = 'transform 0.3s, box-shadow 0.3s'; // Smooth transition
    energyImg.style.backgroundImage = 'url(images/energy.jpeg)'; // Set the background image
    energyImg.style.backgroundSize = 'cover'; // Cover the button area with the image
    
    // Add hover effects to match other buttons
    energyImg.addEventListener('mouseover', () => {
        energyImg.style.transform = 'scale(1.1)';
        energyImg.style.boxShadow = '0 6px 20px rgba(255, 159, 67, 0.4)';
    });
    
    energyImg.addEventListener('mouseout', () => {
        energyImg.style.transform = 'scale(1)';
        energyImg.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    });
    
    // Get the story-container and append the energy image to it
    const storyContainer = document.getElementById('story-container');
    storyContainer.appendChild(energyImg);
    
    return energyImg;
}

// Function to create a message after user picks a shelter they want to build
function createShelterMessage() {
    // Create a new <p> element to hold the shelter message
    const shelterMessage = document.createElement('p');
    // Initially hide the message (can be shown later by changing display style)
    shelterMessage.style.display = 'none';
    // Set the message content
    shelterMessage.innerHTML = 'Great Choice. This shelter will be the key to your success in the future';
    // Position the message absolutely relative to the viewport
    shelterMessage.style.position = 'absolute'; // Fixed positioning for precise control
    shelterMessage.style.bottom = '10px';       // 20px from the bottom of the viewport
    shelterMessage.style.left = '50%';          // Center horizontally
    shelterMessage.style.transform = 'translateX(-50%)'; // Adjust to keep it centered
    // Style the text
    shelterMessage.style.fontSize = '0.9em';            // Set font size slightly smaller than default
    shelterMessage.style.textAlign = 'center';          // Center-align text
    shelterMessage.style.color = '#B22222';             // Red text color for emphasis
    shelterMessage.style.fontWeight = 'bold';           // Bold font
    shelterMessage.style.fontFamily = 'Verdana, sans-serif'; // Font choice
    shelterMessage.style.letterSpacing = '1px';         // Slightly increased letter spacing
    shelterMessage.style.textShadow = '1px 1px 3px rgba(0, 0, 0, 0.3)'; // Subtle shadow for readability
    // Add padding and background for readability
    shelterMessage.style.padding = '10px 20px';         // Padding around text
    shelterMessage.style.backgroundColor = '#fff8e1';   // Light yellow background for contrast
    shelterMessage.style.border = '1px solid #B22222';  // Border in same red as text
    shelterMessage.style.borderRadius = '6px';          // Rounded corners for a softer look
    shelterMessage.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Slight shadow for depth
    shelterMessage.style.opacity = '0.9';               // Slightly transparent for aesthetic touch
    // Ensure it appears above other elements
    shelterMessage.style.zIndex = '10';
    // Add the message to the document's body
    document.body.appendChild(shelterMessage);
    // Return the element in case it needs to be accessed or modified later
    return shelterMessage;
}

// Function to create a success message when user gets rescued
function creatingSuccessMessage() {
    // Create a new <p> element for the success message
    const successMessage = document.createElement('p');
    // Position the message absolutely within the viewport
    successMessage.style.position = 'absolute'; // Use absolute positioning to control placement
    successMessage.style.bottom = '70px';       // 70px from the bottom of the viewport
    successMessage.style.left = '50%';          // Center horizontally on the page
    successMessage.style.transform = 'translateX(-50%)'; // Offset to ensure exact horizontal center
    // Style the message background and text
    successMessage.style.backgroundColor = 'rgba(255, 0, 0, 0.8)'; // Semi-transparent red background
    successMessage.style.color = 'white';                          // White text for contrast
    successMessage.style.padding = '10px 20px';                    // Padding around the text for readability
    successMessage.style.borderRadius = '5px';                     // Rounded corners for a smoother look
    // Set display and stacking context
    successMessage.style.zIndex = '1000';     // High z-index to ensure it displays above other elements
    successMessage.style.display = 'none';    // Initially hide the message (show it later by changing display style)
    // Set the message content
    successMessage.innerText = "You have escaped the island! Good luck on your journey ahead!";
    // Add the message element to the document's body
    document.body.appendChild(successMessage);
    // Return the element in case it needs to be accessed or modified later
    return successMessage;
}

// Function to create a failure message when user picks wrong escape option
function createFailureMessage() {
    // Create a new <p> element for the failure message
    const failureMessage = document.createElement('p');
    // Position the message absolutely within the viewport
    failureMessage.style.position = 'absolute'; // Use absolute positioning for precise control
    failureMessage.style.bottom = '70px';       // 70px from the bottom of the viewport
    failureMessage.style.left = '50%';          // Center horizontally
    failureMessage.style.transform = 'translateX(-50%)'; // Offset to ensure exact horizontal center
    // Style the message background and text
    failureMessage.style.backgroundColor = 'rgba(139, 0, 0, 0.9)'; // Darker, semi-transparent red background
    failureMessage.style.color = '#f8f9fa';                         // Light, slightly off-white text for contrast
    failureMessage.style.padding = '12px 24px';                    // Padding for better spacing
    failureMessage.style.borderRadius = '8px';                     // Softer, more rounded corners
    failureMessage.style.border = '1px solid #8B0000';             // Border in a darker shade of red for emphasis
    failureMessage.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)'; // Slight shadow for depth
    // Text styling
    failureMessage.style.fontSize = '1em';              // Standard font size
    failureMessage.style.fontFamily = 'Arial, sans-serif'; // Clean and readable font
    failureMessage.style.textAlign = 'center';          // Center-align text
    failureMessage.style.fontWeight = 'bold';           // Bold text to emphasize failure
    failureMessage.style.letterSpacing = '1px';         // Slightly increased letter spacing
    // Set display and stacking context
    failureMessage.style.zIndex = '1000';               // High z-index to ensure it appears above other elements
    failureMessage.style.display = 'none';              // Initially hide the message (can be displayed later)
    // Set the message content
    failureMessage.innerText = "You have failed to escape the island. Tough Luck";
    // Add the message element to the document's body
    document.body.appendChild(failureMessage);
    // Return the element in case it needs to be accessed or modified later
    return failureMessage;
}

// Function to create an image of the Skull Rock location
function creatingSkullRockImage() {
    // Create a new <img> element to represent the Skull Rock image
    const skullRockImg = document.createElement('img');
    // Set the image source to the Skull Rock image file
    skullRockImg.src = "images/skullrock.jpeg";
    // Position the image absolutely within the viewport
    skullRockImg.style.position = 'absolute'; // Absolute positioning for precise control
    skullRockImg.style.left = '28%';          // Position closer to the center horizontally
    skullRockImg.style.top = '30%';           // Position vertically at 30% from the top
    // Set the image dimensions
    skullRockImg.style.width = '10%';         // Scale down the image for a smaller display
    // Hide the image initially
    skullRockImg.style.display = 'none';      // Image will only be shown when needed
    // Adding the image element to the document's body
    document.body.appendChild(skullRockImg);
    // Return the image element in case it needs to be accessed or modified later
    return skullRockImg;
}

// Function to create an image of the Ghost Cave location
function creatingGhostLightCaveImage() {
    // Create a new <img> element for the Ghost Cave image
    const ghostLightCaveImg = document.createElement('img');
    // Set the image source to the Ghost Cave image file
    ghostLightCaveImg.src = 'images/ghostlightcave.jpeg';
    // Position the image absolutely within the viewport
    ghostLightCaveImg.style.position = 'absolute'; // Use absolute positioning for precise control
    ghostLightCaveImg.style.left = '45%';          // Position it closer to the center horizontally
    ghostLightCaveImg.style.top = '30%';           // Position it 30% from the top
    // Set the image dimensions
    ghostLightCaveImg.style.width = '10%';         // Scale down the image to be smaller
    // Hide the image initially
    ghostLightCaveImg.style.display = 'none';      // Image will only be shown when needed
    // Adding the image element to the document's body
    document.body.appendChild(ghostLightCaveImg);
    // Return the image element in case it needs to be accessed or modified later
    return ghostLightCaveImg;
}

// Function to create an image of the Forgotten Falls location
function creatingForgottenFalls() {
    // Create a new <img> element for the Forgotten Falls image
    const forgottenFallsImg = document.createElement('img');
    // Set the image source to the Forgotten Falls image file
    forgottenFallsImg.src = 'images/forgottenfalls.jpeg';
    // Position the image absolutely within the viewport
    forgottenFallsImg.style.position = 'absolute'; // Use absolute positioning for precise control
    forgottenFallsImg.style.right = '28%';         // Position closer to the center horizontally from the right
    forgottenFallsImg.style.top = '30%';           // Position it 30% from the top for a higher placement
    // Set the image dimensions
    forgottenFallsImg.style.width = '10%';         // Scale down the image to be smaller
    // Hide the image initially
    forgottenFallsImg.style.display = 'none';      // Image will only be shown when needed
    // Adding the image element to the document's body
    document.body.appendChild(forgottenFallsImg);
    // Return the image element in case it needs to be accessed or modified later
    return forgottenFallsImg;
}

// Function to create the Skull Rock location Button
function creatingSkullRockButton(){
    const skullRockButton = document.createElement('button');
    skullRockButton.innerText = "Skull Rock"; // Text of Button
    skullRockButton.style.position = 'absolute'; // Fixed position
    skullRockButton.style.left = '28.25%'; // Center position
    skullRockButton.style.top = '50%'; // Adjust this value to position higher
    skullRockButton.style.width = '10%'; // Make it smaller
    skullRockButton.style.height = '40px'; // Set a fixed height for better consistency
    skullRockButton.style.backgroundColor = '#f39c12'; // Background color
    skullRockButton.style.color = '#ffffff'; // Text color
    skullRockButton.style.border = 'none'; // No border
    skullRockButton.style.borderRadius = '8px'; // Rounded corners
    skullRockButton.style.cursor = 'pointer'; // Cursor style on hover
    skullRockButton.style.fontSize = '16px'; // Font size for readability
    skullRockButton.style.fontWeight = 'bold'; // Bold text
    skullRockButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)'; // Soft shadow
    skullRockButton.style.transition = 'background-color 0.3s, transform 0.2s'; // Smooth transition effects
    skullRockButton.style.padding = '10px'; // Padding for a better touch target
    skullRockButton.style.display = 'none'; // Hide image initially
    document.body.appendChild(skullRockButton);
    return skullRockButton;
}

// Function to create the Ghost Cave location button
function creatingCaveButton() {
    // Create a new <button> element for the Ghost Cave location
    const caveButton = document.createElement('button');
    // Set the button text to "Ghost Cave"
    caveButton.innerText = "Ghost Cave";
    // Position the button absolutely within the viewport
    caveButton.style.position = 'absolute';      // Absolute positioning for precise control
    caveButton.style.left = '45.25%';            // Center position (slightly adjusted for precise centering)
    caveButton.style.top = '50%';                // Position it at 50% from the top for middle alignment
    // Set the button dimensions
    caveButton.style.width = '10%';              // Set a smaller width for the button
    caveButton.style.height = '40px';            // Set a fixed height for a consistent button size
    // Style the button appearance
    caveButton.style.backgroundColor = '#f39c12'; // Bright background color for visibility
    caveButton.style.color = '#ffffff';           // White text color for contrast
    caveButton.style.border = 'none';             // Remove default border for a cleaner look
    caveButton.style.borderRadius = '8px';        // Rounded corners for a modern design
    caveButton.style.cursor = 'pointer';          // Change cursor on hover to indicate interactivity
    caveButton.style.fontSize = '16px';           // Font size for readability
    caveButton.style.fontWeight = 'bold';         // Bold text for emphasis
    // Add visual effects
    caveButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)'; // Shadow for depth
    caveButton.style.transition = 'background-color 0.3s, transform 0.2s'; // Smooth transition effects on hover
    caveButton.style.padding = '10px';            // Padding for text spacing within the button
    // Hide the button initially
    caveButton.style.display = 'none';            // Button will be displayed only when needed
    // Adding the button element to the document's body
    document.body.appendChild(caveButton);
    // Return the button element in case it needs to be accessed or modified later
    return caveButton;
}

// Function to create the Forgotten Falls location button
function creatingFallsButton() {
    // Create a new <button> element for the Forgotten Falls location
    const fallsButton = document.createElement('button');
    // Set the button text to "Forgotten Falls"
    fallsButton.innerText = "Forgotten Falls";
    // Position the button absolutely within the viewport
    fallsButton.style.position = 'absolute';      // Absolute positioning for precise placement
    fallsButton.style.right = '27.75%';           // Position closer to the center from the right
    fallsButton.style.top = '50%';                // Position it at 50% from the top for middle alignment
    // Set the button dimensions
    fallsButton.style.width = '11%';              // Set a smaller width for the button
    fallsButton.style.height = '40px';            // Fixed height for a consistent button size
    // Style the button appearance
    fallsButton.style.backgroundColor = '#f39c12'; // Orange background color for visibility
    fallsButton.style.color = '#ffffff';           // White text color for contrast
    fallsButton.style.border = 'none';             // Remove default border for a cleaner look
    fallsButton.style.borderRadius = '8px';        // Rounded corners for a smooth appearance
    fallsButton.style.cursor = 'pointer';          // Pointer cursor to indicate interactivity
    fallsButton.style.fontSize = '16px';           // Font size for readability
    fallsButton.style.fontWeight = 'bold';         // Bold text for emphasis
    // Add visual effects
    fallsButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)'; // Soft shadow for depth
    fallsButton.style.transition = 'background-color 0.3s, transform 0.2s'; // Smooth transition effects for hover
    // Add padding for text spacing within the button
    fallsButton.style.padding = '10px';
    // Hide the button initially
    fallsButton.style.display = 'none';            // Button will only be shown when needed
    // Adding the button element to the document's body
    document.body.appendChild(fallsButton);
    // Return the button element in case it needs to be accessed or modified later
    return fallsButton;
}

// Function to create the stop button when shown on left corner
function creatingStopButton(){
    // Create a button element
    const stopButton = document.createElement('button');
    stopButton.style.width = '50px';
    stopButton.style.height = '50px';
    stopButton.style.position = 'absolute';
    stopButton.style.top = '15px';
    stopButton.style.left = '135px'; // Positioned third from left
    stopButton.style.border = 'none';
    stopButton.style.padding = '0';
    stopButton.style.margin = '0';
    stopButton.style.backgroundColor = 'transparent';
    stopButton.style.cursor = 'pointer';
    stopButton.style.display = 'none'; // Hide Initially
    stopButton.style.zIndex = '100'; // Ensure it's above other elements
    stopButton.style.borderRadius = '50%';
    stopButton.style.transition = 'transform 0.3s, box-shadow 0.3s';
    stopButton.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    stopButton.style.overflow = 'hidden'; // Ensure image doesn't overflow
    stopButton.style.backgroundImage = 'url(images/stop.jpeg)'; // Set the background image
    stopButton.style.backgroundSize = 'cover'; // Cover the button area with the image
    
    // Add hover effects
    stopButton.addEventListener('mouseover', () => {
        stopButton.style.transform = 'scale(1.1)';
        stopButton.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
    });
    
    stopButton.addEventListener('mouseout', () => {
        stopButton.style.transform = 'scale(1)';
        stopButton.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    });
    
    // Add a click event listener to go back to the specified HTML page
    stopButton.addEventListener('click', () => {
        restartGame(); // Reload the webapp
    });
    
    // Get the story-container and append the button to it
    const storyContainer = document.getElementById('story-container');
    storyContainer.appendChild(stopButton);
    
    // Return the button element in case you need to manipulate it further
    return stopButton;
}

// Function to create the microphone button
function creatingMicrophoneButton(){
    // Create a button element
    const microPhoneButton = document.createElement('button');
    microPhoneButton.style.width = '50px';
    microPhoneButton.style.height = '50px';
    microPhoneButton.style.position = 'absolute';
    microPhoneButton.style.top = '15px';
    microPhoneButton.style.left = '15px'; // Positioned first from left
    microPhoneButton.style.border = 'none';
    microPhoneButton.style.padding = '0';
    microPhoneButton.style.margin = '0';
    microPhoneButton.style.backgroundColor = 'transparent';
    microPhoneButton.style.cursor = 'pointer';
    microPhoneButton.style.display = 'none'; // Hide Initially
    microPhoneButton.style.zIndex = '100'; // Ensure it's above other elements
    microPhoneButton.style.borderRadius = '50%';
    microPhoneButton.style.transition = 'transform 0.3s, box-shadow 0.3s';
    microPhoneButton.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    microPhoneButton.style.overflow = 'hidden'; // Ensure image doesn't overflow
    microPhoneButton.style.backgroundImage = 'url(images/mic.webp)'; // Set the background image
    microPhoneButton.style.backgroundSize = 'cover'; // Cover the button area with the image
    
    // Add hover effects
    microPhoneButton.addEventListener('mouseover', () => {
        microPhoneButton.style.transform = 'scale(1.1)';
        microPhoneButton.style.boxShadow = '0 6px 20px rgba(255, 159, 67, 0.4)';
    });
    
    microPhoneButton.addEventListener('mouseout', () => {
        microPhoneButton.style.transform = 'scale(1)';
        microPhoneButton.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    });
    
    // Add a click event listener to start voice recognition
    microPhoneButton.addEventListener('click', setupSpeechRecognition);
    
    // Get the story-container and append the button to it
    const storyContainer = document.getElementById('story-container');
    storyContainer.appendChild(microPhoneButton);
    
    // Return the button element in case you need to manipulate it further
    return microPhoneButton;
}

function creatingExportButton(){
    // Create a button element
    const exportButton = document.createElement('button');
    exportButton.style.width = '50px';
    exportButton.style.height = '50px';
    exportButton.style.position = 'absolute';
    exportButton.style.top = '15px';
    exportButton.style.right = '75px'; // Position to the left of stop button
    exportButton.style.border = 'none';
    exportButton.style.padding = '0';
    exportButton.style.margin = '0';
    exportButton.style.backgroundColor = 'transparent';
    exportButton.style.cursor = 'pointer';
    exportButton.style.display = 'none'; // Hide Initially
    exportButton.style.zIndex = '100'; // Ensure it's above other elements
    exportButton.style.borderRadius = '50%';
    exportButton.style.transition = 'transform 0.3s, box-shadow 0.3s';
    exportButton.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    exportButton.style.overflow = 'hidden'; // Ensure image doesn't overflow
    exportButton.style.backgroundImage = 'url(images/export.jpeg)'; // Set the background image
    exportButton.style.backgroundSize = 'cover'; // Cover the button area with the image
    
    // Add hover effects
    exportButton.addEventListener('mouseover', () => {
        exportButton.style.transform = 'scale(1.1)';
        exportButton.style.boxShadow = '0 6px 20px rgba(255, 159, 67, 0.4)';
    });
    
    exportButton.addEventListener('mouseout', () => {
        exportButton.style.transform = 'scale(1)';
        exportButton.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    });
    
    // Add a click event listener to export the data
    exportButton.addEventListener('click', () => {
        exportToExcel(reportData, "ReportStats.xlsx");
    });
    
    // Get the story-container and append the button to it
    const storyContainer = document.getElementById('story-container');
    storyContainer.appendChild(exportButton);
    
    // Return the button element in case you need to manipulate it further
    return exportButton;
}

// Function to create the Help Button which is displayed on instructions
function creatingHelpButton(){
    // Create a button element
    const helpButton = document.createElement('button');
    helpButton.style.width = '50px';
    helpButton.style.height = '50px';
    helpButton.style.position = 'absolute';
    helpButton.style.top = '15px';
    helpButton.style.left = '75px'; // Positioned second from left
    helpButton.style.border = 'none';
    helpButton.style.padding = '0';
    helpButton.style.margin = '0';
    helpButton.style.backgroundColor = 'transparent';
    helpButton.style.cursor = 'pointer';
    helpButton.style.display = 'none'; // Hide Initially
    helpButton.style.zIndex = '100'; // Ensure it's above other elements
    helpButton.style.borderRadius = '50%';
    helpButton.style.transition = 'transform 0.3s, box-shadow 0.3s';
    helpButton.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    helpButton.style.overflow = 'hidden'; // Ensure image doesn't overflow
    helpButton.style.backgroundImage = 'url(images/question.jpeg)'; // Set the background image
    helpButton.style.backgroundSize = 'cover'; // Cover the button area with the image
    
    // Add hover effects
    helpButton.addEventListener('mouseover', () => {
        helpButton.style.transform = 'scale(1.1)';
        helpButton.style.boxShadow = '0 6px 20px rgba(255, 159, 67, 0.4)';
    });
    
    helpButton.addEventListener('mouseout', () => {
        helpButton.style.transform = 'scale(1)';
        helpButton.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    });
    
    // Add a click event listener to show help page
    helpButton.addEventListener('click', helpButtonClick);
    
    // Get the story-container and append the button to it
    const storyContainer = document.getElementById('story-container');
    storyContainer.appendChild(helpButton);
    
    // Return the button element in case you need to manipulate it further
    return helpButton;
}

function helpButtonClick(){
    reportVariables.helpCount++;

    sessionStorage.setItem("currentPage", currentPage);
    sessionStorage.setItem("stopButtonDisplayStatus", stopButton.style.display);
    sessionStorage.setItem("microPhoneButtonDisplayStatus", microPhoneButton.style.display);
    sessionStorage.setItem("helpButtonDisplayStatus", helpButton.style.display);
    sessionStorage.setItem("energyPointsElementDisplayStatus", energyPointsElement.style.display);
    sessionStorage.setItem("energyPointsElementValue", energyPointsElement.innerText);
    sessionStorage.setItem("energyImageDisplayStatus", energyImage.style.display);
    sessionStorage.setItem("reportVariables", JSON.stringify(reportVariables));
        
    //hide buttons on the top
    stopButton.style.display = 'none';
    microPhoneButton.style.display = 'none';
    helpButton.style.display = 'none';
    energyPointsElement.style.display = 'none';
    energyImage.style.display = 'none';

    window.location.href = 'helpPage.html';    
}

// Event Listener to load the instructions page when back is clicked from QnA
window.addEventListener("load", function() {
    if (sessionStorage.getItem("returnFromHelp") === "true") {
        currentPageToReturn = sessionStorage.getItem("currentPage");
        // Get back to the same state as before help button was clicked
        stopButton.style.display = sessionStorage.getItem("stopButtonDisplayStatus");
        microPhoneButton.style.display = sessionStorage.getItem("microPhoneButtonDisplayStatus");
        helpButton.style.display = sessionStorage.getItem("helpButtonDisplayStatus");
        energyPointsElement.style.display = sessionStorage.getItem("energyPointsElementDisplayStatus");
        energyPointsElement.innerText = sessionStorage.getItem("energyPointsElementValue");
        energyImage.style.display = sessionStorage.getItem("energyImageDisplayStatus");
        reportVariables = JSON.parse(sessionStorage.getItem("reportVariables"));                
        //survivalImage.style.display = 'none';        
        credentials.style.display = 'none';
        beware.style.display = 'none';

        // Remove the flag so it doesn't repeat                
        sessionStorage.removeItem("returnFromHelp");
        sessionStorage.removeItem("currentPage");
        
        // Go back to the page from where help was clicked
        choose(currentPageToReturn);
    }
});

function setupInstructionPage(){
    // Play sound of levelUp 1
    levelUpSound1.play();
    // Display imagse  for help, stop and microphone
    helpButton.style.display = 'block';
    stopButton.style.display = 'block';
    microPhoneButton.style.display = 'block';

    // Hide Image
    survivalImage.style.display = 'none';
    // Credentials are hid
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
            <li>Choice 1: Explore : Find Locations on the Island</li>
            <li>Choice 2: Fire: You need to stay warm</li>
            <li>Choice 3: Shelter: Cover is essential</li>
            <li>Choice 4: The Ship: Get rescued by a ship</li>
            <li>Choice 5: The Helicopter: Get rescued by a helicopter</li>
            <li>Note: There will be an energy symbol on the right corner. Voice
            Activation and AI are tools to help throughout this program</li>
        </ul>
    `;
    // Hide beware text
    beware.style.display = 'none';
    // Creating Begin Button
    choices.innerHTML = `
        <button onclick="choose('begin')">Begin Your Quest</button>
    `;    
}

function setupBeginPage(){
    // Play sound to enhance the beginning scene
    levelUpSound5.play();
    // Hiding the help button
    //helpButton.style.display = 'none';
    // Set the title of the page to "The Beginning"
    storyTitle.innerText = "The Beginning";
    // Change the survival image to the plane crash image and apply styling
    survivalImage.src = 'images/plane.webp';  // Set image source to plane crash
    survivalImage.style.display = 'block';  // Make the image visible
    survivalImage.style.width = '60%';  // Set image width to 60% of container
    survivalImage.style.borderRadius = '10px';  // Round the image corners slightly
    survivalImage.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';  // Apply shadow for depth effect
    survivalImage.style.marginTop = '4px'; // Add top margin for spacing
    survivalImage.style.animation = 'popUp 1.75s ease forwards'; // Add animation for image entrance
    // Change the story text to introduce the beginning scenario
    storyText.innerText = "You are in a plane with the pilot when everything goes blurry. " +
        "You look out the window " + "and the plane is uncontrollable. The plane crashes and " +
        "you hit your head hard on the seat next to you...";
    // Create a "Continue" button for the player to proceed to the next part of the story
    choices.innerHTML = `
        <button onclick="choose('continue')">Continue</button>
    `;    
}

function setupArrivalPage(){
    // play levelUp 2 sound
    levelUpSound2.play();
        
    energyImage.style.display = 'block'; // show the energy image   
    energyPointsElement.style.display = 'block';
    energyPointsElement.innerText = "50";
    
    // Change title to Arrival
    storyTitle.innerText = "The Arrival";

    // Changing Text of Story
    storyText.innerHTML = `
        <p>You wake up on a deserted island, surrounded by
        scattered wreckage of the plane. As you step out of the plane, you notice that you aren't alone.
        You have 3 companions - Ishaan, Mikail, and Aryaman.</p>
        <ul id = "names_list">
            <li>Ishaan: Athletic, Sporty, and a Jock</li>
            <li>Mikail: Extremely Smart, Talented, and Defined</li>
            <li>Aryaman: Strong, Tall, and Muscular</li>
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
    // Creating energyPoint Text and setting it to 50

    // Creating New Buttons
    choices.innerHTML = `
        <button style="margin-right: 15px;" onclick="choose('Explore')">Explore the Island</button>
        <button onclick="choose('Fire')">Build a Fire</button>
    `;
}

function setupExploreIslandPage(){
    levelUpSound3.play();
    // Explore island is set to true
    reportVariables.exploreIsland = true;
    //Update Title
    storyTitle.innerText = "Exploration";
    //Update Text
    storyText.innerText = "You decide to explore the island. Each of you go to one " +
        "corner of the island. As your walking, you pass by 3 locations. Please select 2 locations " +
        "that you found the most interesting."
    // Creating an image placeholder
    survivalImage.src = "images/whiteimg.jpeg";
    survivalImage.style.border = 'none';
    survivalImage.style.boxShadow = 'none';
    // Creating 3 images for the 3 locations
    //Creating Skull Rock Image
    skullRockImage.style.display = 'block';
    // Creating Ghost Light Cave Image
    ghostLightCaveImage.style.display = 'block';
    // Creating Forgotten Falls Image
    forgottenFallsImage.style.display = 'block';
    // Making the 3 location buttons
    // Skull Rock button
    skullRockButton.style.display = 'block';
    skullRockButton.onclick = function() {
        // Checks count and depending on, updates energy count and images
        count = count + 1;
        // Skull Location will be visited on the report
        reportVariables.skullLocation = true;
        if(count === 1){
            // Crosses out Skull Rock Image
            skullRockImage.src = 'images/cross.jpeg'; // source of image
            skullRockButton.style.display = 'none'; // makes it visible
            energyPointsElement.style.display = 'block';
            energyPointsElement.innerText = reportVariables.energyAfterLocation1; // changes energy points
            // Update message about Skull Rock
            storyText.innerText = "You decide to visit the unusual rock shaped like a skull and find yourself " +
                            "surrounded with birds. You find multiple food sources such as animals and vegetables!"
            storyText.style.color = "purple";
        }
        if(count === 2){
            // Crossing out Skull Rock Image
            skullRockImage.src = 'images/cross.jpeg';
            skullRockButton.style.display = 'none';
            energyPointsElement.style.display = 'block';
            energyPointsElement.innerText =  reportVariables.energyAfterLocation2;
            // Changing Text
            storyText.innerText = "You decide to visit the unusual rock shaped like a skull and find yourself " +
                "surrounded with birds. You find multiple food sources such as animals and vegetables!"
            storyText.style.color = "purple";
            // A message is displayed to user warming him to turn back
            beware.style.position = 'fixed'; // Fixed position to stay at the bottom
            beware.style.bottom = '90px';     // Space from the bottom
            beware.style.left = '50%';        // Center horizontally
            beware.style.transform = 'translateX(-50%)'; // Adjust position back to center
            beware.style.backgroundColor = 'rgba(255, 0, 0, 0.8)'; // Semi-transparent red background
            beware.style.color = 'white';     // White text color
            beware.style.padding = '10px 20px'; // Padding for aesthetics
            beware.style.borderRadius = '5px'; // Rounded corners
            beware.style.zIndex = '1000';     // Ensure it's above other elements
            beware.style.display = 'block';    // Show the message
            beware.innerText = "You have searched 2 locations. Head back before it's too dark!";

        }
    };
    // Making Ghost Cave Button
    caveButton.style.display = 'block';
    caveButton.onclick = function() {
        // Checks count and depending on, updates energy count and images
        count = count + 1;
        // Cave will be visted on the report
        reportVariables.caveLocation = true;
        if(count === 1){
            // Cross out Cave Image
            ghostLightCaveImage.src = 'images/cross.jpeg';
            caveButton.style.display = 'none';
            energyPointsElement.style.display = 'block';
            energyPointsElement.innerText = reportVariables.energyAfterLocation1;
            // Update message regarding ghost cave
            storyText.innerText = storyText.innerText = "You decide to visit the cave but soon realize that it's extremely unsafe. " +
                "You almost get killed by a ghost and promise yourself to never return!";
            storyText.style.color = "blue";
        }
        if(count === 2){
            // cross out Cave Image
            ghostLightCaveImage.src = 'images/cross.jpeg';
            caveButton.style.display = 'none';
            energyPointsElement.style.display = 'block';
            energyPointsElement.innerText = reportVariables.energyAfterLocation2;
            // Update the Text of Cave Image
            storyText.innerText = storyText.innerText = "You decide to visit the cave but soon realize that it's extremely unsafe. " +
                "You almost get killed by a ghost and promise yourself to never return!";
            storyText.style.color = "blue";
            // A warning is displayed telling user to turn back
            beware.style.position = 'fixed'; // Fixed position to stay at the bottom
            beware.style.bottom = '90px';     // Space from the bottom
            beware.style.left = '50%';        // Center horizontally
            beware.style.transform = 'translateX(-50%)'; // Adjust position back to center
            beware.style.backgroundColor = 'rgba(255, 0, 0, 0.8)'; // Semi-transparent red background
            beware.style.color = 'white';     // White text color
            beware.style.padding = '10px 20px'; // Padding for aesthetics
            beware.style.borderRadius = '5px'; // Rounded corners
            beware.style.zIndex = '1000';     // Ensure it's above other elements
            beware.style.display = 'block';    // Show the message
            beware.innerText = "You have searched 2 locations. Head back before it's too dark!";

        }
    };
    // Making Forgotten Falls
    fallsButton.style.display = 'block';
    fallsButton.onclick = function() {
        // Checks count and depending on, updates energy count and images
        count = count + 1;
        // Waterfall will be visted on the report
        reportVariables.waterfallLocation = true;
        if(count === 1){
            // Crossing out Forgotten Falls Image
            forgottenFallsImage.src = 'images/cross.jpeg'; // source of cross image
            fallsButton.style.display = 'none';
            energyPointsElement.style.display = 'block';
            energyPointsElement.innerText = reportVariables.energyAfterLocation1;
            // Update information regarding the waterfall
            storyText.innerText = "You decide to visit the ginormous waterfall which disappears once in a while. You see that it has a large pond" +
                " and is an excellent source for fresh water and fruit."
            storyText.style.color = "green";
        }
        if(count === 2){
            // Crossing out image of Forgotten Falls
            forgottenFallsImage.src = 'images/cross.jpeg'; // source of image
            fallsButton.style.display = 'none';
            energyPointsElement.style.display = 'block';
            energyPointsElement.innerText =  reportVariables.energyAfterLocation2;
            storyText.innerText = "You decide to visit the ginormous waterfall which disappears once in a while. You see that it has a large pond" +
                " and is an excellent source for fresh water."
            storyText.style.color = "green";
            // A warning message is displayed to tell user to return back
            beware.style.position = 'fixed';
            beware.style.bottom = '90px';     // Space from the bottom
            beware.style.left = '50%';        // Center horizontally
            beware.style.transform = 'translateX(-50%)'; // Adjust position back to center
            beware.style.backgroundColor = 'rgba(255, 0, 0, 0.8)'; // Semi-transparent red background
            beware.style.color = 'white';     // White text color
            beware.style.padding = '10px 20px'; // Padding for aesthetics
            beware.style.borderRadius = '5px'; // Rounded corners
            beware.style.zIndex = '1000';     // Ensure it's above other elements
            beware.style.display = 'block';    // Show the message
            beware.innerText = "You have searched 2 locations. Head back before it's too dark!";
        }
    };
    // Return Button is shown
    choices.innerHTML = `
        <button id = "returnButton" onclick="choose('Return')">Return Back</button>
    `;
}

function setupEveningPage(){
    // Play levelup 4 sound
    levelUpSound4.play();
    //Hide all buttons and images of the locations
    forgottenFallsImage.style.display = 'none';
    skullRockButton.style.display = 'none';
    skullRockImage.style.display = 'none';
    fallsButton.style.display = 'none';
    beware.style.display = 'none';
    caveButton.style.display = 'none';
    ghostLightCaveImage.style.display = 'none';
    // Change title of the page
    storyTitle.innerText = 'Evening #1'
    storyText.style.color = "white";
    // Create a list of different types of shelters
    storyText.innerHTML = `
    <p>After reaching your campsite you decide to make camp. You can make 3 types of shelters: Small, Medium, and Large
    with their respective advantages. Choose extremely carefully. Your life depends on it!</p>
    <ul id = "types_of_shelters">
            <li>Small: Lightweight, requires fewer materials, and better insulation in cold </li>
            <li>Medium: Storage Space, stronger, and suitable for long trips</li>
            <li>Large: Ample space for large groups, standing space, and durable in harsh conditions</li>
        </ul>
    `
    // Creating an image of "building a shelter"
    survivalImage.src = 'images/buildingShelter.jpeg';
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
    survivalImage.style.width = '200px';
    // Giving user three types of building to user from
    choices.innerHTML = `
        <button onclick="choose('smallShelter')" style="margin-right: 10px;">Small</button>
        <button onclick="choose('mediumShelter')" style="margin-right: 10px;">Medium</button>
        <button onclick="choose('largeShelter')">Large</button>
    `;
}

function setupFirePage(){
    // Build a fire on the report will be true
    reportVariables.buildAFire = true;
    // PLay a new Sound;
    levelUpSound3.play();
    // Update Title
    storyTitle.innerText = 'Ignition';
    // Update Text
    storyText.innerText = 'You decided to create a fire with a wood and a lighter. Please click "Build Fire" for ' +
        'ignition';
    // Update Image;
    survivalImage.src = 'images/ignition.jpeg';
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
        <button onclick="choose('buildFire')">Build A Fire</button>
    `;
}

function setupBuildFirePage(){
    storyTitle.innerText = 'Ignition';
    // Display the sound of a build happening
    fireSound.play();
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
    energyPointsElement.style.display = 'block';
    energyPointsElement.innerText = reportVariables.energyAfterFire;
    // Changing Text to congratulate the user
    storyText.innerText = 'Wow! That is an amazing fire! You used ' + (50 - randomNum3) + ' energy points. Head back before it is too dark.';
    // Telling user to return back to the camp - site
    choices.innerHTML = `
        <button onclick="choose('Return')">Return Back</button>
    `;
}

function setupShelter(shelterImageSrc, shelterType){
    // play a different sound
    levelUpSound5.play();
    // Update the image to an image of a small shelter
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
    shelterMessage.style.display = 'block'; // Hide the message of the shelter
    energyPointsElement.style.display = 'block'; // Make energy points 0
    energyPointsElement.innerText = '0';
    choices.style.display = 'none';         // Block Buttons on Bottom
    // Go to Night Time page automatically
    setTimeout(() => {
        nightTime();  // Call the function after 3 seconds
    }, 3000);
}

function nightTime() {
    // play nighttime sound
    nightSound.play();
    // increase night counter to track # of nights
    nightCounter++;
    reportVariables.nightCount++;
    // Change title
    storyTitle.innerText = 'Night #' + nightCounter;
    // Change text
    storyText.innerText = 'You reached 0 energy points. You are extremely tired from all the ' +
        'activities you have done. You decide to sleep. Hope you can survive the next day'
    // Hide shelter image
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
    choices.style.display = 'block';
    choices.innerHTML = `
            <button onclick="choose('nextDay')" style="display: block; margin: 0 auto;">Next Day</button>
        `;
}

function setupNextDayPage(){
    // play sound
    levelUpSound6.play();
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
    energyPointsElement.style.display = 'block';
    energyPointsElement.innerText = reportVariables.energyAfterNight;
    choices.innerHTML = `
        <div style="display: flex; justify-content: center;"> 
            <button style="margin-right: 15px;" onclick="choose('shipAttention')">Get Ship's Attention</button> 
            <button onclick="choose('helpOnSand')">Write HELP on sand</button> 
        </div>
    `;
}

function setupShipAttentionPage(){
    // Play the failure sound since user didn't escape
    failureSound.play();
    // Change Title
    storyTitle.innerText = 'Failure!';
    reportVariables.shipEscape = "True";
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
    energyPointsElement.style.display = 'block';
    energyPointsElement.innerText = '0';
    setTimeout(() => {
        // Display a failure message
        failureMessage.style.display = 'block'  // Call the function after 2 seconds
    }, 2000);
    // Make a re-try button for user to attempt to escape
    choices.innerHTML = `
        <div style="text-align: center;">
            <button onclick="choose('reTry')">Re-Try</button>
        </div>
    `;
}

function setupSuccessPage(){
    // Play success sound
    successSound.play();
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
    energyPointsElement.style.display = 'block';
    energyPointsElement.innerText = '0';
    // Display a success message
    setTimeout(() => { //bugbug -- with report page, this shows on report page also ...
        successMessage.style.display = 'block'  // Call the function after 2 seconds
    }, 2000);
    // Show option for report
    choices.innerHTML = `
        <div style="text-align: center;">
            <button onclick="choose('report')">Report</button>
        </div>
    `;
}

function setupReportPage(){
    // Elements from previous pages are hidden
    storyTitle.innerText = 'Report!';
    energyPointsElement.style.display = 'none';
    energyImage.style.display = 'none';
    successMessage.style.display = 'none';
    survivalImage.style.display = 'none';
    choices.style.display='none';
    helpButton.style.display = 'none';
    // Sound is played
    levelUpSound1.play();
    // Export Button is shown
    exportButton.style.display = 'block';

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
        } else if(reportVariables.waterfallLocation && reportVariables.caveLocation){ // User visited Watefall and Cave
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
    <ul class="report-list">
        <li><pre>Energy at Start: 50</pre></li>
        <li><pre>${locationReportMessage}</pre></li>
        <li><pre>${buildFireReportMessage}</pre></li>
        <li><pre>${shelterReportMessage}</pre></li>
        <li><pre>${nightReportMessage}</pre></li>
        <li><pre>${shipEscapeReportMessage}</pre></li>
        <li><pre>${helpEscapeReportMessage}</pre></li>
        <li><pre>Energy at end: 0</pre></li>
    </ul>
`;
}

function restartGame(){
    // Hide success message
    successMessage.style.display = 'none';
    // Play a sound
    levelUpSound1.play();
    // Go back to the first page of the program
    window.location.href = 'index.html';
}

function setupSpeechRecognition(){
    // Get the SpeechRecognition interface
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    // Set properties
    recognition.lang = 'en-US'; // Language
    recognition.continuous = true; // Keep listening
    recognition.interimResults = false; // Final results only

    // Start recognition
    recognition.start();

    // Handle recognition results
    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim();
        var command = transcript.trim().toLowerCase();
        console.log("You said: $%s$", command);

        // For each text detected, it would transition to that page;
        switch(command){
            case 'stop':
                restartGame();
                break;
            case 'begin':
                choose('begin');
                break;
            case 'continue':
                choose('continue')
                break;
            case 'explore':
            case 'explore the island':
                choose('Explore');
                break;
            case 'fire':
                choose('Fire');
                break;
            case 'buildfire':
            case 'build fire':
                choose('buildFire');
                break;
            case 'returnback':
            case 'return back':
                choose('Return');
                break;
            case 'small':
                choose('smallShelter');
                break;
            case 'medium':
                choose('mediumShelter');
                break;
            case 'large':
                choose('largeShelter');
                break;
            case 'next day':
            case 'nextday':
                choose('nextDay');
                break;
            case 'ship':
            case 'get ships attention':
                choose('shipAttention');
                break;
            case 'retry':
                choose('reTry');
                break;
            case 'help':
                helpButtonClick();
                break;
            case 'write help on sand':
                choose('helpOnSand');
                break;
            case 'report':
                choose('report');
                break;
            case 'restart':
                choose('Restart');
                break;
            default:
                console.log("Command not recognized.");
        }
        //console.log("Stopping speech recognition");
        recognition.stop();
    };

    // Handle errors
    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
    };

    // Stop recognition if needed
    recognition.onend = () => {
        //console.log("Voice recognition ended.");
    };
}

function exportToExcel(data, fileName) {
    console.log("Inside Export function: %s", data)

    //Create a new workbook
    const workbook = XLSX.utils.book_new();

    //Convert input data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add the sheet onto the
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    // Step 3: Export the workbook to a file
    XLSX.writeFile(workbook, fileName);
}