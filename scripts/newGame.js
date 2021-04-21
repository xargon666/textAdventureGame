const textElement = document.getElementById('text');
const imgElement = document.getElementById('room-image');
const optionButtonsElement = document.getElementById('option-buttons');


const roomImages = [{
        imgIndex: 1,
        imgURL: "./img/SHIP_CREW1.svg"
    },
    {
        imgIndex: 2,
        imgURL: "./img/SHIP_HUB.svg"
    },
    {
        imgIndex: 3,
        imgURL: "./img/SHIP_CREW2.svg"
    },
    {
        imgIndex: 4,
        imgURL: "./img/SHIP_ENGINE.svg"
    },
    {
        imgIndex: 5,
        imgURL: "./img/SHIP_BRIDGE.svg"
    }
]

// GAME DATA
let state = {}
let textArrayIteration = 1
let progressStory = true
let playerMoved = false
let playerLocation = 2
let storyPage = 1
let showText = ""

function startGame() {
    gameTick();
}

function gameTick() {
    // CHECK IF STORY HAS PROGRESSED
    if (progressStory === true) {
        console.log("Story continues...")
        const newText = storyBook.find(newText => newText.id === storyPage)
        showText += newText.text
        showText += "\n\n"
        progressStory = false
    }
    // CHECK IF PLAYER HAS MOVED TO A NEW ROOM
    if (playerMoved === true) {
        console.log("Player moves...")
        playerMoved = false
        const currentRoom = rooms.find(currentRoom => currentRoom.id === playerLocation)
        showText += "You have entered the " + currentRoom.name + "."
        showText += "\n\n"
    } else {
        console.log("Player Stands...")
        const currentRoom = rooms.find(currentRoom => currentRoom.id === playerLocation)
        showText += "You are in the " + currentRoom.name + "."
        showText += "\n\n"
    }
    // SHOW CURRENT ROOM IMAGE
    const roomImage = roomImages.find(roomImage => roomImage.imgIndex === playerLocation)
    imgElement.src = roomImage.imgURL

    // UPDATE TEXT
    textElement.innerText = showText
    showText = ""
    populateVerbOptions()
    console.log(progressStory)
}

const storyBook = [{
        id: 1,
        room_id: 1,
        text: "This is the first text you see."
    },
    {
        id: 2,
        room_id: 2,
        text: "This is the next room! You made it!"
    }
]

const verbOptions = [{
        id: 0,
        text: "Move",
    },
    {
        id: 1,
        text: "Use",
    },
    {
        id: 2,
        text: "Pick up",
    },
    {
        id: 3,
        text: "Open",
    }
]

function createButton(textValue, clickEvent) { // PASSING FUNCTION THROUGH TO EVENT LISTENER?
    console.log("CREATE_BUTTON")
    const button = document.createElement('button');
    button.innerText = textValue;
    button.classList.add('btn');
    button.addEventListener('click', () => clickEvent());
    optionButtonsElement.appendChild(button)
}

function removeButtons() {
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
}

function populateVerbOptions() {
    console.log("POPULATE_VERB_OPTIONS")
    removeButtons()
    verbOptions.forEach(option => {
        createButton(option.text, selectVerbOption(option));
    })
}

function selectVerbOption(option) {
    console.log("SELECT_VERB_OPTION")
    const currentRoom = rooms.find(currentRoom => currentRoom.id === playerLocation)
    switch (option.id) {
        case 0: // MOVE
            // HOW TO CYCLE THROUGH ARRAY AND POPULATE ROOM NAMES FROM ROOMS.ADJACENT ARRAY????
            currentRoom.adjacent.forEach(index => { // cycle through array
                console.log("MOVE_TO_ADJACENT_ROOM")
                const nextRoom = rooms.find(nextRoom => nextRoom.id === index);
                createButton(nextRoom.name, selectMoveOption(index));
            })
            backOption();
            break;
        case 1: // USE
            console.log(option.id);
            backOption();
            break;
        case 2: // PICK UP
            items = currentRoom.objects.forEach(object => {
                if (object.pickup) {
                    createButton(object.name, pickupItem())
                };
            });
            backOption();
            break;
        case 3: // OPEN
            console.log(option.id);
            backOption();
            break;
    }
}

function backOption() {
    const button = document.createElement('button');
    button.innerText = "Back";
    button.classList.add('btn');
    button.addEventListener('click', () => populateVerbOptions());
    optionButtonsElement.appendChild(button)
}

function selectMoveOption(index) {
    console.log("SELECT_MOVE_OPTION")
    playerLocation = index
    playerMoved = true
        //gameTick()
}

// function showTextNode(textNodeIndex) {
//     const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)

//     textElement.innerText = textNode.text

//     textNode.options.forEach(option => {
//         if (showOption(option)) {
//             const button = document.createElement('button')
//             button.innerText = option.text
//             button.classList.add('btn')
//             button.addEventListener('click', () => selectOption(option))
//             optionButtonsElement.appendChild(button)
//         }
//     })
// }

let rooms = [{
        id: 1,
        name: "port side Crew Cabin",
        description: "A small cabin clad with panels and blinking lights, but no windows. There is a door, but no windows.",
        adjacent: [2],
        objects: [{
                id: 1,
                name: "bed",
                pickup: false,
                use: "You do not feel tired."
            }, {
                id: 2,
                name: "door",
                pickup: false,
                boolOpen: false,
                use: function() {
                    return boolOpen ? "the door is open." : "the door is closed."
                },
            },
            {
                id: 3,
                name: "alarm",
                pickup: false,
                boolUse: false,
                use: function() {
                    return boolUse === true ? "you switch off the alarm." : "the alarm is already off."
                },
            },
            {
                id: 4,
                name: "rock",
                pickup: true,
                use: "You pickup the rock."
            },
            {

            }
        ],
        states: {
            locked: false,
            visited: false,
            light: false,
            fire: false,
            oxygen: true
        }
    },
    {
        id: 2,
        name: "Hab Module",
        description: "The room is the general living area. There are several 'seats' and Utility cabinets line the walls.",
        adjacent: [1, 3, 4, 5],
        states: {
            locked: false,
            visited: false,
            light: true,
            fire: false,
            oxygen: true
        }
    }, {
        id: 3,
        name: "starboard side Crew Cabin",
        description: "The room is filled with steaming computer panels and blinking pipes.",
        adjacent: [2],
        states: {
            locked: true,
            visited: false,
            light: true,
            fire: false,
            oxygen: true
        }
    }, {
        id: 4,
        name: "Engine Room",
        description: "The room is filled with steaming computer panels and blinking pipes.",
        adjacent: [2],
        states: {
            locked: true,
            visited: false,
            light: true,
            fire: false,
            oxygen: true
        }
    }, {
        id: 5,
        name: "Bridge",
        description: "The room is filled with steaming computer panels and blinking pipes.",
        adjacent: [2],
        states: {
            locked: true,
            visited: false,
            light: true,
            fire: false,
            oxygen: true
        }
    }
]

// Item States
// 0: is out-of-play (destroyed or not yet introduced)
// 1: is somewhere in the game world, but not yet found by the player
// 2: has been handled by the player e.g. taken and then dropped
// 3: is carried by the player.

// class item {
//     constructor(name, state, location, description) {
//         this.name = name;
//         this.state = state;
//         this.location = location;
//         this.description = description;
//     }
// };

// const worldItems = [
//     raggedCoat = new item(
//         "Ragged Coat",
//         1,
//         1,
//         "You have owned the coat for many years. It smells faintly of home, and your arm pits.")
// ];

// const player = [{
//     name = loginName;
//     email = loginEmail;
// }]

startGame();