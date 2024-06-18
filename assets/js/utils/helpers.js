/*---------------------------
    #Helper function to select DOM elements
-----------------------------*/
const select = (selector, all = false) => {
  selector = selector.trim();
  return all
    ? [...document.querySelectorAll(selector)]
    : document.querySelector(selector);
};

/*---------------------------
    #Helper function to handle event listeners
-----------------------------*/
const on = (eventType, selector, listener, all = false) => {
  selector = typeof selector === "string" ? select(selector, all) : selector;

  if (selector) {
    all || selector.length > 1
      ? selector.forEach((element) =>
          element.addEventListener(eventType, listener)
        )
      : selector.addEventListener(eventType, listener);
  }
};

export { select, on };
