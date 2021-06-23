// AXIOS
import axios from "axios";

// cancel token
const CancelToken = axios.CancelToken;

// api url
import { apiUrl_forCategories } from "./constants";

// get categories
export let cancelGetCategoriesApi;
export async function getCategories(token, query = "") {
    if (token) {
        const categories = await axios.get(apiUrl_forCategories + "categories?" + query, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelGetCategoriesApi = c;
            }),
        });
        return categories;
    } else {
        console.log("Please add required parameters");
    }
}

// add category
export let cancelAddCategoryApi;
export async function addCategory(token, categoryData) {
    if (token, categoryData) {
        const emails = await axios.post(apiUrl_forCategories + "category",
            {
                category_name: categoryData.category_name,
                description: categoryData.description,
                status: categoryData.status,
                parent_id: categoryData.parent_id,
                meta_title: categoryData.meta_title,
                meta_keywords: categoryData.meta_keywords,
                meta_description: categoryData.meta_description,
                image: categoryData.image,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            {
                cancelToken: new CancelToken(function executor(c) {
                    // An executor function receives a cancel function as a parameter
                    cancelAddCategoryApi = c;
                }),
            }
        );
        return emails;
    } else {
        console.log("Please add required parameters");
    }
}

// get category details
export let cancelGetCategoryDetailsApi;
export async function getCategoryDetails(token, catId) {
    if (token && catId) {
        const categories = await axios.get(apiUrl_forCategories + "category/" + catId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelGetCategoryDetailsApi = c;
            }),
        });
        return categories;
    } else {
        console.log("Please add required parameters");
    }
}

// add category
export let cancelEditCategoryApi;
export async function editCategory(token, categoryData) {
    if (token, categoryData) {
        const emails = await axios.put(apiUrl_forCategories + "category/" + categoryData.category_id,
            {
                category_name: categoryData.category_name,
                description: categoryData.description,
                status: categoryData.status,
                parent_id: categoryData.parent_id,
                meta_title: categoryData.meta_title,
                meta_keywords: categoryData.meta_keywords,
                meta_description: categoryData.meta_description,
                image: categoryData.image,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            {
                cancelToken: new CancelToken(function executor(c) {
                    // An executor function receives a cancel function as a parameter
                    cancelEditCategoryApi = c;
                }),
            }
        );
        return emails;
    } else {
        console.log("Please add required parameters");
    }
}

// delte category
export let cancelDeleteCategoryApi;
export async function deleteCategory(token, catId) {
    if (token && catId) {
        const categories = await axios.delete(apiUrl_forCategories + "category/" + catId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelDeleteCategoryApi = c;
            }),
        });
        return categories;
    } else {
        console.log("Please add required parameters");
    }
}