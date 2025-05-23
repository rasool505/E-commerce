
// Main Base URL 
export const baseURL = "http://localhost:8000/api";

// Auth URLs
export const registerURL = "/auth/register";
export const loginURL = "/auth/login";

// Products URL
export const productsURL = "/products";
export const productURL = "/products/product";

// Categories URL
export const categoriesURL = "/categories";

//ads URL
export const adsURL = "/ads";

// Users URL
export const usersURL = "/users";
export const userURL = "/users/me";
export const adduserURL = "/users/add/user";
export const dliveryURL = "/users/dlivery";

// Carts URLs
export const cartsURL = "/carts";
export const allDeliveryCartsURL = "/all/delivery";
export const cartDeliveredURL = "/carts/delivered";
export const cartCancelledURL = "/carts/cancelled";

// Search URL
export const searchURL = "/search/products";

/**
 *  Auth No Authorization,
 *  Products:
 *  1- Create New Product (only admin)
 *  2- Get All Products (only admin)
 *  3- Get Products By Category Id (any)
 *  4- Update And Delete Product (only admin),
 *  Categories All URLs (only Admin),
 *  Users:
 *  1- Get All Users (only admin)
 *  2- Update User (only admin and user himself),
 *  Carts:
 *  1- Get All Carts (only admin)
 *  2- Create New Cart (any)
 *  3- Get All Carts Of Delivery (only delivery and admin)
 *  4- Assigned To Delivery (only admin)
 *  5- Delete Cart (only admin)
 *  6- Cart Is Delivered (only delivery and admin)
 *  7- Cart Is Cancelled (only delivery and admin),
 *  Role: 
 *  0- Admin
 *  1- User
 *  2- Delivery
 *  3- Writer,
 */