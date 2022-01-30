// GAME TICK
function gameTick() {
    // ADD A FUNCTION HERE TO INTERUPT NORMAL EVENTS BASED ON A GAMESTATE CONDITION
    checkChapterEvents(chapter);
    console.log("GAME TICK");
    if (testTriggers()) {
      console.log("it works!");
    }
    playerMovement();
    populateVerbOptions();
    setupInventory();
    storyUpdate();
    displayTextSection();
    // SHOW CURRENT ROOM IMAGE
    const roomImage = roomImages.find(
      (roomImage) => roomImage.imgIndex === playerLocation
    );
    imgElement.src = roomImage.imgURL;
    // UPDATE TEXT
  }

  export { gameTick }