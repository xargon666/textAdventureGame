const rooms = [
    {
      id: 1,
      name: "port side Crew Cabin",
      description:
        "A small cabin clad with panels and blinking lights, but no windows. There is a door, but no windows.",
      adjacent: [2],
      states: {
        visited: false,
        light: false,
        fire: false,
        oxygen: true,
      },
      roomItems: [1, 2, 3, 4],
    },
    {
      id: 2,
      name: "Hab Module",
      description:
        "The room is the general living area. There are several 'seats' and Utility cabinets line the walls.",
      adjacent: [1, 3, 4, 5],
      states: {
        visited: false,
        light: true,
        fire: false,
        oxygen: true,
      },
    },
    {
      id: 3,
      name: "starboard side Crew Cabin",
      description:
        "The room is filled with steaming computer panels and blinking pipes.",
      adjacent: [2],
      states: {
        visited: false,
        light: true,
        fire: false,
        oxygen: true,
      },
    },
    {
      id: 4,
      name: "Engine Room",
      description:
        "The room is filled with steaming computer panels and blinking pipes.",
      adjacent: [2],
      states: {
        visited: false,
        light: true,
        fire: false,
        oxygen: true,
      },
    },
    {
      id: 5,
      name: "Bridge",
      description:
        "The room is filled with steaming computer panels and blinking pipes.",
      adjacent: [2],
      states: {
        visited: false,
        light: true,
        fire: false,
        oxygen: true,
      },
    },
  ];
  
  const doors = [
    {
      id: 1,
      connectingRooms: [2, 1],
      locked: true,
      password: "mordida",
    },
    {
      id: 2,
      connectingRooms: [2, 3],
      locked: true,
    },
    {
      id: 3,
      connectingRooms: [2, 4],
      locked: true,
    },
    {
      id: 4,
      connectingRooms: [2, 5],
      locked: true,
    },
  ];

  export { rooms , doors }