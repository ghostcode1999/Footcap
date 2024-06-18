import { select, on } from "./utils/helpers.js";

/*-------------------------------
    #Toggle primary navbar
-------------------------------*/
const navToggler = select("[data-nav-toggler]");
const overlay = select("[data-overlay]");
const navLinks = select("[data-nav-link]", true);

on("click", navToggler, function () {
  this.classList.add("is-active");
});

on("click", overlay, function () {
  navToggler.classList.remove("is-active");
});

on("click", navLinks, () => navToggler.classList.remove("is-active"));
