// AXIOS
import axios from "axios";

// cancel token
const CancelToken = axios.CancelToken;

// api url
import { apiUrl_forBrands } from "./constants";

// get brands
export let cancelGetBrandsApi;
export async function getBrands(token, query = "") {
    if (token) {
        const brands = await axios.get(apiUrl_forBrands + "brands?" + query, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelGetBrandsApi = c;
            }),
        });
        return brands;
    } else {
        console.log("Please add required parameters");
    }
}

// add brand
export let cancelAddBrandApi;
export async function addBrand(token, brandData) {
    if (token, brandData) {
        const emails = await axios.post(apiUrl_forBrands + "brand",
            {
                manufacturer_name: brandData.brand_name,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            {
                cancelToken: new CancelToken(function executor(c) {
                    // An executor function receives a cancel function as a parameter
                    cancelAddBrandApi = c;
                }),
            }
        );
        return emails;
    } else {
        console.log("Please add required parameters");
    }
}

// get brand details
export let cancelGetBrandDetailsApi;
export async function getBrandDetails(token, brandId) {
    if (token && brandId) {
        const brands = await axios.get(apiUrl_forBrands + "brand/" + brandId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelGetBrandDetailsApi = c;
            }),
        });
        return brands;
    } else {
        console.log("Please add required parameters");
    }
}

// add brand
export let cancelEditBrandApi;
export async function editBrand(token, brandData) {
    if (token, brandData) {
        const emails = await axios.put(apiUrl_forBrands + "brand/" + brandData.brand_id,
            {
                manufacturer_name: brandData.brand_name,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            {
                cancelToken: new CancelToken(function executor(c) {
                    // An executor function receives a cancel function as a parameter
                    cancelEditBrandApi = c;
                }),
            }
        );
        return emails;
    } else {
        console.log("Please add required parameters");
    }
}

// delte brand
export let cancelDeleteBrandApi;
export async function deleteBrand(token, brandId) {
    if (token && brandId) {
        const brands = await axios.delete(apiUrl_forBrands + "brand/" + brandId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelDeleteBrandApi = c;
            }),
        });
        return brands;
    } else {
        console.log("Please add required parameters");
    }
}