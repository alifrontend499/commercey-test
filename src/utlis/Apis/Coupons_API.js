// AXIOS
import axios from "axios";

// cancel token
const CancelToken = axios.CancelToken;

// api url
import { apiUrl_forCoupons } from "./constants";

// get coupons
export let cancelGetCouponsApi;
export async function getCoupons(token, query = "") {
    if (token) {
        const coupons = await axios.get(apiUrl_forCoupons + "coupons?" + query, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelGetCouponsApi = c;
            }),
        });
        return coupons;
    } else {
        console.log("Please add required parameters");
    }
}

// add coupon
export let cancelAddCouponApi;
export async function addCoupon(token, couponData) {
    console.log("coupon data in side api ", couponData)
    if (token, couponData) {
        const emails = await axios.post(apiUrl_forCoupons + "coupon",
            {
                coupon_code: couponData.coupon_code,
                discount_percent: couponData.discount_percent,
                discount_value: couponData.discount_value,
                expiry_date: couponData.expiry_date,
                minimum_order_amount: couponData.minimum_order_amount,
                is_active: couponData.is_active,
                free_shipping: couponData.free_shipping,
                single_use: couponData.single_use,
                single_use_per_user: couponData.single_use_per_user,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            {
                cancelToken: new CancelToken(function executor(c) {
                    // An executor function receives a cancel function as a parameter
                    cancelAddCouponApi = c;
                }),
            }
        );
        return emails;
    } else {
        console.log("Please add required parameters");
    }
}

// get coupon details
export let cancelGetCouponDetailsApi;
export async function getCouponDetails(token, couponId) {
    if (token && couponId) {
        const coupons = await axios.get(apiUrl_forCoupons + "coupon/" + couponId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelGetCouponDetailsApi = c;
            }),
        });
        return coupons;
    } else {
        console.log("Please add required parameters");
    }
}

// add coupon
export let cancelEditCouponApi;
export async function editCoupon(token, couponData) {
    if (token, couponData) {
        const emails = await axios.put(apiUrl_forCoupons + "coupon/" + couponData.coupon_id,
            {
                coupon_code: couponData.coupon_code,
                discount_percent: couponData.discount_percent,
                discount_value: couponData.discount_value,
                expiry_date: couponData.expiry_date,
                minimum_order_amount: couponData.minimum_order_amount,
                is_active: couponData.is_active,
                free_shipping: couponData.free_shipping,
                single_use: couponData.single_use,
                single_use_per_user: couponData.single_use_per_user,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            {
                cancelToken: new CancelToken(function executor(c) {
                    // An executor function receives a cancel function as a parameter
                    cancelEditCouponApi = c;
                }),
            }
        );
        return emails;
    } else {
        console.log("Please add required parameters");
    }
}

// delte coupon
export let cancelDeleteCouponApi;
export async function deleteCoupon(token, couponId) {
    if (token && couponId) {
        const coupons = await axios.delete(apiUrl_forCoupons + "coupon/" + couponId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelDeleteCouponApi = c;
            }),
        });
        return coupons;
    } else {
        console.log("Please add required parameters");
    }
}