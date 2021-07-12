import React from 'react'

// icons : feather
import FeatherIcon from 'feather-icons-react';

export default function ProductsFormLeftBar(props) {
    const { formik, handleTabLinkClick } = props

    return (
        <div className="pfc-left-bar align-self-start">
            <div className="inner">
                {/* fraction */}
                <div className="frac">
                    <p className="lb-head">product information</p>
                    {/* link */}
                    <a href="#tab_basicInfo" data-target="#tab_basicInfo" onClick={ev => handleTabLinkClick(ev, "#tab_basicInfo")} className={`lb-link d-flex justify-content-between active ${(
                        (formik.touched.productName && formik.errors.productName) ||
                        (formik.touched.SKU && formik.errors.SKU) ||
                        (formik.touched.status && formik.errors.status) ||
                        (formik.touched.categoryId && formik.errors.categoryId) ||
                        (formik.touched.brandId && formik.errors.brandId)) ?
                        "has-error" : ""
                        }`}>
                        <span>Basic Info</span>
                        {/* icon */}
                        {
                            (
                                (formik.touched.productName && formik.errors.productName) ||
                                (formik.touched.SKU && formik.errors.SKU) ||
                                (formik.touched.status && formik.errors.status) ||
                                (formik.touched.categoryId && formik.errors.categoryId) ||
                                (formik.touched.brandId && formik.errors.brandId)
                            ) ? (
                                <FeatherIcon
                                    icon="alert-circle"
                                    size="14"
                                    className="icon ml-auto" />
                            ) : null
                        }
                    </a>
                    {/* link */}
                    <a href="#tab_images" data-target="#tab_images" onClick={ev => handleTabLinkClick(ev, "#tab_images")} className={`lb-link d-flex justify-content-between`}>
                        <span>Images</span>
                    </a>
                    {/* link */}
                    <a href="#tab_description" data-target="#tab_description" onClick={ev => handleTabLinkClick(ev, "#tab_description")} className={`lb-link d-flex justify-content-between ${(
                        (formik.touched.shortDescription && formik.errors.shortDescription) ||
                        (formik.touched.longDescription && formik.errors.longDescription)) ?
                        "has-error"
                        : ""
                        }`}>
                        <span>Description</span>
                        {
                            (
                                (formik.touched.shortDescription && formik.errors.shortDescription) ||
                                (formik.touched.longDescription && formik.errors.longDescription)
                            ) &&
                            <FeatherIcon
                                icon="alert-circle"
                                size="14"
                                className="icon ml-auto" />
                        }
                    </a>
                    {/* link */}
                    <a href="#tab_pricing" data-target="#tab_pricing" onClick={ev => handleTabLinkClick(ev, "#tab_pricing")} className={`lb-link d-flex justify-content-between ${(
                        (formik.touched.costPrice && formik.errors.costPrice) ||
                        (formik.touched.price && formik.errors.price) ||
                        (formik.touched.promoPrice && formik.errors.promoPrice)) ?
                        "has-error"
                        : ""
                        }`}>
                        <span>Pricing</span>
                        {
                            (
                                (formik.touched.costPrice && formik.errors.costPrice) ||
                                (formik.touched.price && formik.errors.price) ||
                                (formik.touched.promoPrice && formik.errors.promoPrice)
                            ) &&
                            <FeatherIcon
                                icon="alert-circle"
                                size="14"
                                className="icon ml-auto" />
                        }
                    </a>
                    {/* link */}
                    <a href="#tab_inventory" data-target="#tab_inventory" onClick={ev => handleTabLinkClick(ev, "#tab_inventory")} className={`lb-link d-flex justify-content-between ${(
                        (formik.touched.stock && formik.errors.stock) ||
                        (formik.touched.lowStock && formik.errors.lowStock) ||
                        (formik.touched.maxOrderQuantity && formik.errors.maxOrderQuantity) ||
                        (formik.touched.minOrderQuantity && formik.errors.minOrderQuantity)) ?
                        "has-error"
                        : ""
                        }`}>
                        <span>Inventory</span>
                        {
                            (
                                (formik.touched.stock && formik.errors.stock) ||
                                (formik.touched.lowStock && formik.errors.lowStock) ||
                                (formik.touched.maxOrderQuantity && formik.errors.maxOrderQuantity) ||
                                (formik.touched.minOrderQuantity && formik.errors.minOrderQuantity)
                            ) ? (
                                <FeatherIcon
                                    icon="alert-circle"
                                    size="14"
                                    className="icon ml-auto" />
                            ) : null
                        }
                    </a>
                    {/* link */}
                    <a href="#tab_dimenstions" data-target="#tab_dimenstions" onClick={ev => handleTabLinkClick(ev, "#tab_dimenstions")} className={`lb-link d-flex justify-content-between ${(
                        (formik.touched.weight && formik.errors.weight) ||
                        (formik.touched.width && formik.errors.width) ||
                        (formik.touched.height && formik.errors.height) ||
                        (formik.touched.depth && formik.errors.depth)) ?
                        "has-error"
                        : ""
                        }`}>
                        <span>Dimensions</span>
                        {
                            (
                                (formik.touched.weight && formik.errors.weight) ||
                                (formik.touched.width && formik.errors.width) ||
                                (formik.touched.height && formik.errors.height) ||
                                (formik.touched.depth && formik.errors.depth)
                            ) ? (
                                <FeatherIcon
                                    icon="alert-circle"
                                    size="14"
                                    className="icon ml-auto" />
                            ) : null
                        }
                    </a>
                </div>

                {/* fraction */}
                <div className="frac">
                    <p className="lb-head">SEO</p>
                    {/* link */}
                    <a href="#tab_seo" data-target="#tab_seo" onClick={ev => handleTabLinkClick(ev, "#tab_seo")} className={`lb-link d-flex justify-content-between ${(
                        (formik.touched.metaTitle && formik.errors.metaTitle) ||
                        (formik.touched.metaDescription && formik.errors.metaDescription)) ?
                        "has-error"
                        : ""
                        }`}>
                        <span>SEO</span>
                        {
                            (
                                (formik.touched.metaTitle && formik.errors.metaTitle) ||
                                (formik.touched.metaDescription && formik.errors.metaDescription)
                            ) ? (
                                <FeatherIcon
                                    icon="alert-circle"
                                    size="14"
                                    className="icon ml-auto" />
                            ) : null
                        }
                    </a>
                </div>
            </div>
        </div>
    )
}
