// ITEM CONSTRUCTOR BLOCK
class worldItem {
  constructor(props) {
    const { id, state, interactionType, name, useText, description } = props;
    Object.assign(this, props);
  }
}

const bed1 = new worldItem({
  description: "It's your standard bed, just big enough for the average human.",
});

export { bed1 };
