// AXIOS
import axios from "axios";

// cancel token
const CancelToken = axios.CancelToken;

// api url
import { apiUrl_forProducts } from "./constants";

// get products
export let cancelGetProductsApi;
export async function getProducts(token, query = "") {
    if (token) {
        const products = await axios.get(apiUrl_forProducts + "products?" + query, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelGetProductsApi = c;
            }),
        });
        return products;
    } else {
        console.log("Please add required parameters");
    }
}

// add product
export let cancelAddProductApi;
export async function addProduct(token, productData) {
    if (token, productData) {
        const emails = await axios.post(apiUrl_forProducts + "product",
            {
                product_name: productData.product_name,
                sku: productData.sku,
                status: productData.status,
                cost_price: productData.cost_price,
                price: productData.price,
                promo_price: productData.promo_price,
                category_id: productData.category_id,
                brand_id: productData.brand_id,
                short_description: productData.short_description,
                long_description: productData.long_description,
                stock: productData.stock,
                low_stock: productData.low_stock,
                max_order_quantity: productData.max_order_quantity,
                min_order_quantity: productData.min_order_quantity,
                weight: productData.weight,
                width: productData.width,
                depth: productData.depth,
                height: productData.height,
                meta_title: productData.meta_title,
                meta_description: productData.meta_description,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            {
                cancelToken: new CancelToken(function executor(c) {
                    // An executor function receives a cancel function as a parameter
                    cancelAddProductApi = c;
                }),
            }
        );
        return emails;
    } else {
        console.log("Please add required parameters");
    }
}

// get product details
export let cancelGetProductDetailsApi;
export async function getProductDetails(token, prodId) {
    if (token && prodId) {
        const products = await axios.get(apiUrl_forProducts + "product/" + prodId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelGetProductDetailsApi = c;
            }),
        });
        return products;
    } else {
        console.log("Please add required parameters");
    }
}

// add product
export let cancelEditProductApi;
export async function editProduct(token, productData) {
    if (token, productData) {
        const emails = await axios.put(apiUrl_forProducts + "product/" + productData.product_id,
            {
                product_name: productData.product_name,
                description: productData.description,
                status: productData.status,
                parent_id: productData.parent_id,
                meta_title: productData.meta_title,
                meta_keywords: productData.meta_keywords,
                meta_description: productData.meta_description,
                image: productData.image,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            {
                cancelToken: new CancelToken(function executor(c) {
                    // An executor function receives a cancel function as a parameter
                    cancelEditProductApi = c;
                }),
            }
        );
        return emails;
    } else {
        console.log("Please add required parameters");
    }
}

// delte product
export let cancelDeleteProductApi;
export async function deleteProduct(token, prodId) {
    if (token && prodId) {
        const products = await axios.delete(apiUrl_forProducts + "product/" + prodId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelDeleteProductApi = c;
            }),
        });
        return products;
    } else {
        console.log("Please add required parameters");
    }
}