const toolshopApiPage = {};

toolshopApiPage.jsonHeaders = {
  accept: "application/json",
  "Content-Type": "application/json",
};

toolshopApiPage.registerEndpoint = "users/register";
toolshopApiPage.loginEndpoint = "users/login";
toolshopApiPage.productsEndpoint = "products?page=1";
toolshopApiPage.cartsEndpoint = "carts";

toolshopApiPage.addProductToCartEndpoint = (cartId) =>
  `carts/${cartId}/product/quantity`;

toolshopApiPage.invoicesEndpoint = "invoices";

toolshopApiPage.authHeaders = (accessToken) => ({
  accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${accessToken}`,
});

module.exports = toolshopApiPage;
