const textElement = document.getElementById('text');
const imgElement = document.getElementById('room-image');
const optionButtonsElement = document.getElementById('option-buttons');
const roomImages = [{
        imgIndex: 1,
        imgURL: "./img/1.png"
    },
    {
        imgIndex: 2,
        imgURL: "./img/2.png"
    },
    {
        imgIndex: 3,
        imgURL: "./img/3.png"
    },
    {
        imgIndex: 4,
        imgURL: "./img/4.png"
    }
]

// GAME DATA
let state = {}
let textArrayIteration = 1
let progressStory = true
let playerMoved = false
let playerLocation = 1
let storyPage = 1
let showText = ""

function startGame() {
    gameTick()
}

function gameTick() {
    // CHECK IF STORY HAS PROGRESSED
    if (progressStory === true) {
        const newText = storyBook.find(newText => newText.id === storyPage)
        showText += newText.text
        showText += "\n\n"
        progressStory = false
    }
    // CHECK IF PLAYER HAS MOVED TO A NEW ROOM
    if (playerMoved === true) {
        playerMoved = false
        const currentRoom = rooms.find(currentRoom => currentRoom.id === playerLocation)
        showText += "You have entered the " + currentRoom.name
        showText += "\n\n"
    } else {
        const currentRoom = rooms.find(currentRoom => currentRoom.id === playerLocation)
        showText += "You are in the " + currentRoom.name
        showText += "\n\n"
    }
    // SHOW CURRENT ROOM IMAGE
    const roomImage = roomImages.find(roomImage => roomImage.imgIndex === playerLocation)
    imgElement.src = roomImage.imgURL

    textElement.innerText = showText
    console.log(progressStory)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
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

const options = [{
        id: 1,
        text: "Go to port side Crew Cabin",
        requiredLocation: () => { playerLocation === 2 }
    },
    {
        id: 2,
        text: "Go to Hab Module",
        requiredLocation: () => { playerLocation !== 2 }
    },
    {
        id: 3,
        text: "Go to Starboard side Crew Cabin",
        requiredLocation: () => { playerLocation === 2 }
    },
    {
        id: 4,
        text: "Go to Engine Room",
        requiredLocation: () => { playerLocation === 2 }
    },
    {
        id: 5,
        text: "Go to the Bridge",
        requiredLocation: () => { playerLocation === 2 }
    }
]

function populateOptions() {
    const currentRoom = rooms.find(currentRoom => rooms.id === playerLocation)

    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
    options.forEach(option => {
        const button = document.createElement('button')
        button.innerText = option.text
        button.classList.add('btn')
        button.addEventListener('click', () => selectOption(option))
        optionButtonsElement.appendChild(button)
    })
}

function showOption(option) {

    if (currentRoom.adjacent === false) {
        return
    }
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

const rooms = [{
        id: 1,
        name: "port side Crew Cabin",
        description: "The room is a small sleeping cabin, with no windows, and no taste.",
        adjacent: [2],
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
    },
    {
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
    },
    {
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
    },
    {
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

class item {
    constructor(name, state, location, description) {
        this.name = name;
        this.state = state;
        this.location = location;
        this.description = description;
    }
};

const worldItems = [
    raggedCoat = new item("Ragged Coat", 1, 1, "You have owned the coat for many years. It smells faintly of home, and your arm pits.")
];

// const player = [{
//     name = loginName;
//     email = loginEmail;
// }]


startGame()