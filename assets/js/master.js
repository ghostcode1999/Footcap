import allProducts from "../data/products.js";
import {
  select,
  on,
  addClass,
  removeClass,
  toggleClass,
} from "./utils/helpers.js";

(function () {
  /*
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

  /*
    #Generate products HTML
-------------------------------*/
  const productsList = select(".products-list");
  let productsInnerHTML = "";

  allProducts.forEach((product) => {
    productsInnerHTML += `
        <li class="product-item | is-active" data-badge="${product.filter}">
              <div class="product-card">
                <figure class="card-banner">
                  <img src="${product.img}" alt="Shoes" />
                  ${
                    product.badge
                      ? `<span class='card-badge'>${product.badge}</span>`
                      : ""
                  }
                  <ul class="card-action-list">
                    <li class="card-action-item">
                      <div class="card-action-tooltip">Add to Cart</div>
                      <button class="card-action-btn">
                        <i class="fa fa-cart-plus fa-xs"></i>
                      </button>
                    </li>
                    <li class="card-action-item">
                      <div class="card-action-tooltip">Add to Wishlist</div>
                      <button class="card-action-btn">
                        <i class="fa fa-heart fa-xs"></i>
                      </button>
                    </li>
                    <li class="card-action-item">
                      <div class="card-action-tooltip">Quick View</div>
                      <button class="card-action-btn">
                        <i class="fa fa-eye fa-xs"></i>
                      </button>
                    </li>
                    <li class="card-action-item">
                      <div class="card-action-tooltip">Compare</div>
                      <button class="card-action-btn">
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
      if (product.dataset.badge === filter) {
        addClass(product, "is-active");
      } else {
        removeClass(product, "is-active");
      }
    });
  }

  on("click", productsFilters, function () {
    filterProducts(this);
  });
})();
