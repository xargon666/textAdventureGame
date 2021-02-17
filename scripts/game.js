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
    state = {}
    showTextNode(1)
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
        id: 1,
        room_id: 1,
        text: 'You have awoken into gritty, gravelly conciousness.\n\n Blissful slumber has been ripped bleeding from your skull like rotten teeth, without anestheia, by the shrill bleeting of your infernal alarm.',
        options: [{
                text: 'Get up',
                setState: { inBed: false, alarm: true },
                nextText: 2
            },
            {
                text: 'Switch Off Alarm',
                setState: { inBed: false, alarm: true },
                nextText: 3
            },
            {
                text: 'Look around',
                setState: { inBed: false, alarm: true },
                nextText: 4
            },
            {
                text: 'Stay in bed',
                setState: { inBed: true, alarm: true },
                nextText: 5
            }
        ]
    },
    {
        id: 2,
        room_id: 1,
        text: 'You venture forth in search of answers to where you are when you encounter a merchant',
        options: [{
                text: 'Trade the goo for a sword',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, sword: true },
                nextText: 3
            },
            {
                text: 'Trade the goo for a shield',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, shield: true },
                nextText: 3
            },
            {
                text: 'Ignore Merchant',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        room_id: 3,
        text: 'You stay in bed acheiving nothing but conserving calories. The alarm continues to brutally pound the back of your eyes.',
        options: [{
                text: 'Explore the castle',
                nextText: 4
            },
            {
                text: 'find a room to sleep at in the town',
                nextText: 5
            },
            {
                text: 'find some hay in a stable to sleep in',
                nextTest: 6
            }
        ]
    },
    {
        id: 4,
        room_id: 4,
        text: 'You are so tired that you fall asleep while exploring the castle, and are brutally slain by some terrible monster in you sleep',
        options: [{
            text: 'Restart Game',
            nextText: -1
        }]
    }
]

startGame()