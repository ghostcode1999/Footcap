import allProducts from "../data/products.js";
import {
  select,
  on,
  addClass,
  removeClass,
  toggleClass,
  onScroll,
  onLoad,
} from "./utils/helpers.js";

(function () {
  /*
    #Initialize AOS
-------------------------------*/
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });

  /*
    #Initialize Products Glightbox
-------------------------------*/
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /*
    #Toggle is-preloader class on body element when loaded
-------------------------------*/
  onLoad(addClass(document.body, "is-preloaded"));

  /*
    #Toggle primary navbar
-------------------------------*/
  const navToggler = select("[data-nav-toggler]");
  const navCloseBtn = select("[data-nav-close-btn]");
  const overlay = select("[data-overlay]");

  const navElems = [navToggler, navCloseBtn, overlay];

  on("click", navElems, () => toggleClass(navToggler, "is-active"));

  /*
    #Generate products HTML
-------------------------------*/
  const productsList = select(".products-list");
  let productsInnerHTML = "";

  allProducts.forEach((product) => {
    productsInnerHTML += `
        <li class="product-item | is-active" data-badge="${
          product.filter
        }" data-aos="fade-up">
              <div class="product-card">
                <figure class="card-banner">
                  <img src="${product.img}" alt="${
      product.title
    }" loading="lazy" width="312" height="350"/>
                  ${
                    product.badge
                      ? `<span class='card-badge'>${product.badge}</span>`
                      : ""
                  }
                  <ul class="card-action-list">
                    <li class="card-action-item">
                      <div class="card-action-tooltip" id="card-label-1">Add to Cart</div>
                      <button class="card-action-btn" aria-labelledby="card-label-1">
                        <i class="fa fa-cart-plus fa-xs"></i>
                      </button>
                    </li>
                    <li class="card-action-item">
                      <div class="card-action-tooltip" id="card-label-2">Add to Wishlist</div>
                      <button class="card-action-btn" aria-labelledby="card-label-2">
                        <i class="fa fa-heart fa-xs"></i>
                      </button>
                    </li>
                    <li class="card-action-item">
                      <div class="card-action-tooltip" id="card-label-3">Quick View</div>
                      <button class="card-action-btn" aria-labelledby="card-label-3">
                        <i class="fa fa-eye fa-xs"></i>
                      </button>
                    </li>
                    <li class="card-action-item">
                      <div class="card-action-tooltip" id="card-label-4">Compare</div>
                      <button class="card-action-btn" aria-labelledby="card-label-4">
                        <i class="fa fa-repeat fa-xs"></i>
                      </button>
                    </li>
                  </ul>
                </figure>
                <div class="card-content">
                  <div class="card-cat">
                    <a href="#">${product.category1}</a> /
                    <a href="#">${product.category2}</a>
                  </div>
                  <a href="#" class="card-title">${product.title}</a>
                  <div class="card-price">
                  <data value="${product.price}" class="card-price">$${
      product.price
    }</data>

    ${
      product.oldPrice
        ? `<data value="${product.oldPrice}" class="card-old-price">
            <del>$${product.oldPrice}</del></data>`
        : ""
    }
    </div>
                </div>
              </div>
            </li>
        `;
  });
  productsList.innerHTML = productsInnerHTML;

  /*
    #Filter products
-------------------------------*/
  const productsFilters = select(".filter-btn", true);
  const products = select(".products-list .product-item", true);

  function filterProducts(filterButton) {
    const filter = filterButton.dataset.filter;

    // Add is-active class to clicked button
    removeClass(select(".filter-btn", true), "is-active");
    addClass(filterButton, "is-active");

    // If no filter, show all products
    if (filter === "*") {
      addClass(products, "is-active");
      return;
    }

    // Else show only filtered products
    products.forEach((product) => {
      product.dataset.badge === filter
        ? addClass(product, "is-active")
        : removeClass(product, "is-active");
    });
  }

  on("click", productsFilters, function () {
    filterProducts(this);
  });

  /*
    #Toggle has-scrolled class on body element when scrolling
-------------------------------*/
  onScroll(window, () => {
    scrollY > 100
      ? addClass(document.body, "has-scrolled")
      : removeClass(document.body, "has-scrolled");
  });

  /*
    #Back to top button
-------------------------------*/
  const backTopBtn = select("[data-back-top-btn]");

  on("click", backTopBtn, () => {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
})();
