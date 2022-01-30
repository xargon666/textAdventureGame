// Item States
// 0: is out-of-play (destroyed or not yet introduced)
// 1: is somewhere in the game world, but not yet found by the player
// 2: has been handled by the player e.g. taken and then dropped
// 3: is carried by the player.

// Item Interaction Type
// 0: Cannot be picked up, cannot be used
// 1: Cannot be picked up, can be used
// 2: Can be picked up, can be used

const gameItems = [
    {
      id: 1,
      state: 1,
      name: "bed",
      pickup: false,
      canUse: true,
      description: ["An unmade bed."],
      useText: ["You do not feel tired."],
    },
    {
      id: 2,
      state: 1,
      name: "alarm",
      pickup: false,
      canUse: true,
      activated: false,
      description: [
        "An alarm, which is shreking it's head off.",
        "A thankfully silent alarm.",
      ],
      useText: ["you switch off the alarm.", "the alarm is already off."],
    },
    {
      id: 3,
      state: 1,
      name: "rock",
      pickup: true,
      available: true,
      description: ["Just a rock"],
    },
    {
      id: 4,
      state: 1,
      name: "terminal",
      pickup: false,
      canUse: true,
      description: [
        "It's a computer terminal. There are a few options showing on the screen.",
      ],
      useText: [
        'You hit return, and a window titled "login" appears on the screen.',
      ],
      useAction: () => changeGameMode(1)
    },
  ];

  export { gameItems }