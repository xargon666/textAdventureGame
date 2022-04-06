// START GAME
function startGame() {
    gameTick();
  }

// Sound Effects
function play_beep() {   
    var snd = new Audio("https://www.soundjay.com/button/beep-08b.wav");
    snd.play();
    return false;
  }
 
// Element manipulation

  function hideElement(targetElement) {
    targetElement.style.display = "none";
    console.log("Element hidden = " + targetElement.id);
  }
  
  function revealElement(targetElement) {
    targetElement.style.display = "flex";
    console.log("Element revealed = " + targetElement.id);
  }
  
  // On Player Movement
  function playerMovement() {
    if (!playerMoved) {
      console.log("Player position unchanged");
      const currentRoom = rooms.find(
        (currentRoom) => currentRoom.id === playerLocation
      );
      locationElement.innerText = "Location: " + currentRoom.name;
    }
    else {
      console.log("Player position has changed!");
      const currentRoom = rooms.find(
        (currentRoom) => currentRoom.id === playerLocation
      );
      locationElement.innerText = currentRoom.name;
      showText = "Player moved to the " + currentRoom.name;
      playerMoved = false;
    }
    return
  }

// Button Management Functions

  function createButton(textValue, clickEvent) {
    const button = document.createElement("button");
    button.innerText = textValue;
    button.classList.add("btn");
    button.addEventListener("click", clickEvent);
    optionButtonsElement.appendChild(button);
  }
  
  function removeButtons() {
    while (optionButtonsElement.firstChild) {
      optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }
  }
  
  function backOption(textValue, clickEvent) {
    if (textValue === undefined || clickEvent === undefined) {
      createButton("Back", () => populateVerbOptions());
    } else {
      createButton(textValue, clickEvent);
    }
  }


  // Verb Functions
function populateVerbOptions() {
    //console.log("POPULATE_VERB_OPTIONS")
    removeButtons();
    verbOptions.forEach((option) => {
      return createButton(option.text, () => selectVerbOption(option));
    });
  }
  
  function selectVerbOption(option) {
    removeButtons();
    //console.log("SELECT_VERB_OPTION")
    const currentRoom = rooms.find(
      (currentRoom) => currentRoom.id === playerLocation
    );
    //console.log("Current Room: " + currentRoom.name)
    switch (option.id) {
      case 0: // MOVE
        // HOW TO CYCLE THROUGH ARRAY AND POPULATE ROOM NAMES FROM ROOMS.ADJACENT ARRAY????
        currentRoom.adjacent?.forEach((index) => {
          // cycle through array
          console.log("MOVE_TO_ADJACENT_ROOM");
          const nextRoom = rooms.find((nextRoom) => nextRoom.id === index);
          createButton(nextRoom.name, () => selectMoveOption(index));
        });
        backOption();
        break;
      case 1: // USE
        console.log(option.id);
        currentRoom.roomItems?.forEach((index) => {
          const targetItem = gameItems.find(
            (targetItem) => targetItem.id === index
          );
          if (targetItem?.canUse) {
            createButton(targetItem.name, () => useObject(targetItem));
          }
        });
        backOption();
        break;
      case 2: // PICK UP
        console.log(currentRoom.name + " available items:");
        console.log(currentRoom.roomItems);
        currentRoom.roomItems?.forEach((index) => {
          const targetItem = gameItems.find(
            (targetItem) => targetItem.id === index
          );
          if (targetItem.pickup && targetItem.available) {
            createButton(targetItem.name, () => pickUpObject(targetItem));
          }
        });
        backOption();
        break;
      case 3: // LOOK AT
        currentRoom.roomItems?.forEach((index) => {
          const targetItem = gameItems.find(
            (targetItem) => targetItem.id === index
          );
          createButton(targetItem.name, () => lookAtObject(targetItem));
        });
        console.log(option.id);
        backOption();
        break;
    }
  }
  function lookAtObject(targetItem) {
    showText = targetItem.activated
      ? targetItem.description[1]
      : targetItem.description[0];
    gameTick();
  }
  
  function pickUpObject(targetItem) {
    targetItem.available = false;
    playerInventory.push(targetItem);
    showText = "You pick up the " + targetItem.name;
    gameTick();
  }
  
  // WHAT HAPPENS WHEN YOU USE AN OBJECT IN A ROOM
  function useObject(targetObject) {
    let result = "";
    console.log("USE OBJECT - " + targetObject.name);
    if (targetObject.activated === true) {
      result = targetObject.useText[1];
    }
    if (targetObject.activated === false) { 
      result = targetObject.useText[0];
      targetObject.activated = true;
    }
    if (!targetObject.activated) {
      result = targetObject.useText[0];
    }
    showText = result;
    targetObject.useAction();
    gameTick();
  }
  
  function selectMoveOption(index) {
    console.log("SELECT_MOVE_OPTION");
    // check if can move from current location into new location through door
    if (testDoorLocked(playerLocation, index)) {
      showText = "You try to open the door, but it's locked.";
      gameTick();
    }
    if (!testDoorLocked(playerLocation, index)) {
      playerLocation = index;
      playerMoved = true;
      play_beep();
      gameTick();
    }
  }
  
  function testDoorLocked(fromPos, toPos) {
    const testArr = [fromPos, toPos];
    const door = doors.find((door) => {
      return door.connectingRooms.every((val) => testArr.includes(val));
    });
    return door.locked;
  }

  // INVENTORY FUNCTIONS AND GAME ITEMS
function removeInventory() {
    while (inventoryItemsElement.firstChild) {
      inventoryItemsElement.removeChild(inventoryItemsElement.firstChild);
    }
  }
  
  function setupInventory() {
    populateInventory();
  }
  
  function populateInventory() {
    console.log("playerInventory:");
    console.log(playerInventory);
    if (playerInventory.length < 1) {
      removeInventory();
    }
    if (playerInventory.length > 0) {
      removeInventory();
      playerInventory.forEach((itemToAdd) => {
        const item = document.createElement("item");
        item.innerText = itemToAdd.name;
        inventoryItemsElement.appendChild(item);
      });
    }
  }

  function storyUpdate() {
    // CHECK IF STORY HAS PROGRESSED
    if (!progressStory) {
      console.log("Story doesn't progress");
      return;
    }
    if (progressStory) {
      console.log("Story continues...");
      const newText = storyBook.find((newText) => newText.id === storyPage);
      showText += newText.text;
      chapter += 1
      //showText += "\n\n"
      progressStory = false;
    }
  }

  function testTriggers(){
    return (terminalMode === true ? false : true);
  };
  
  // GAMEMODE SWITCH
  function continueGame(){
    switch(gameMode){
      case 0: 
        gameTick();
        break;
      case 1: // ACTIVATE TERMINAL GAMEMODE
        activateTerminal();
        break;
      default:
        gameTick();
    }
  
  }
  
  function changeGameMode(val) {
    gameMode = val;
  }

  export {startGame,play_beep,hideElement,revealElement,playerMovement,createButton,removeButtons,backOption,populateVerbOptions,selectVerbOption,lookAtObject,pickUpObject,useObject,selectMoveOption,testDoorLocked,removeInventory,setupInventory,populateInventory,storyUpdate,testTriggersj,continueGame,changeGameMode}