const textElement = document.getElementById('text');
const imgElement = document.getElementById('room-image');
const optionButtonsElement = document.getElementById('option-buttons');
let textArrayIteration = 1
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

function startGame() {
    location = 1
    state = {}
    showTextNode(1001)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)

    textElement.innerText = textNode.text

    const roomImage = roomImages.find(roomImage => roomImage.imgIndex === textNode.room_id)
    imgElement.src = roomImage.imgURL

    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}


function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [{
    id: 1001,
    room_id: 1,
    text: "This is the first text you see when you enter the room for the first time."
}]

const rooms = [{
            id: 1,
            name: "Crew Cabin 1",
            description: "The room is a small sleeping cabin, with no windows, and no taste.",
            roomState: {
                state: {
                    visited: false,
                    light: false,
                    fire: false,
                    oxygen: true
                }
            }
        },
        {
            id: 2,
            name: "Hab Module",
            description: "The room is the general living area. There are several 'seats' and Utility cabinets line the walls.",
            roomState: {
                state: {
                    visited: false,
                    light: true,
                    fire: false,
                    oxygen: true
                }
            },
            {
                id: 3,
                name: "Engine Room",
                description: "The room is filled with steaming computer panels and blinking pipes.",
                roomState: {
                    state: {
                        visited: false,
                        light: true,
                        fire: false,
                        oxygen: true
                    }
                }
            }
        ]

        // Item States
        // 0: is out-of-play (destroyed or not yet introduced)
        // 1: is somewhere in the game world, but not yet found by the player
        // 2: has been handled by the player e.g. taken and then dropped
        // 3: is carried by the player.

        class item {
            constructor(name, state, description) {
                this.name = name;
                this.state = state;
                this.description = description;
            }
        };

        const worldItems = [
            raggedCoat = new item("Ragged Coat", 1, "You have owned the coat for many years. It smells faintly of home, and your arm pits.")
        ];



        const player = [{
            name: loginName
            email: loginEmail


        }]


        startGame()