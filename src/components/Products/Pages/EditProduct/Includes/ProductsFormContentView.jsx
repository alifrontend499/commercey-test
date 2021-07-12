import React from 'react'

// bootstrap
import {
    Col
} from 'react-bootstrap'

import ProductDetailsFields from './FormProducts__Details'
import ProductPriceFields from './FormProducts__Price'
import ProductDescriptionFields from './FormProducts__Description'
import ProductStockFields from './FormProducts__Stock'
import ProductDimensionsFields from './FromProducts__Dimensions'
import ProductSEOFields from './FormProducts__SEO'

export default function ProductsFormContentView(props) {
    const { formik, parentProps, parentCategories, brands, getShortDesc, getLongDesc, defaultValueForShortDesc, defaultValueForLongDesc } = props
    return (
        <div className="pfc-content media-body">
            <div className="inner">
                {/* card heading */}
                <div className="app-header-wrapper heading-md mb-2" style={{ marginTop: -1, lineHeight: 'normal' }}>
                    {/* heading */}
                    <p className="app-heading text-capitalize">Product Information</p>
                    <p className="desc st-fs-15 mt-1">Add details aboun the product</p>
                </div>

                {/* app card */}
                <div className="app-card mb-3" id="tab_basicInfo">
                    {/* card heading */}
                    <div className="app-header-wrapper heading-sm mb-1">
                        {/* heading */}
                        <p className="app-heading text-capitalize st-text-light">Basic Info</p>
                    </div>

                    <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20-LR pad-20-T">
                        <Col xs={12} md={9} lg={8} className="px-0">
                            <ProductDetailsFields
                                formik={formik}
                                parentProps={parentProps}
                                parentCategories={parentCategories}
                                brands={brands}
                            />
                        </Col>
                    </div>
                </div>

                {/* app card */}
                <div className="app-card mb-3" id="tab_images">
                    {/* card heading */}
                    <div className="app-header-wrapper heading-sm mb-1">
                        {/* heading */}
                        <p className="app-heading text-capitalize st-text-light">Images</p>
                    </div>

                    <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20-LR pad-20-T">
                        <Col xs={12} md={9} lg={8} className="px-0">

                        </Col>
                    </div>
                </div>

                {/* app card */}
                <div className="app-card mb-3" id="tab_description">
                    {/* card heading */}
                    <div className="app-header-wrapper heading-sm mb-1">
                        {/* heading */}
                        <p className="app-heading text-capitalize st-text-light">Description</p>
                    </div>

                    <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20">
                        <Col xs={12} md={9} lg={10} className="px-0">
                            <ProductDescriptionFields
                                formik={formik}
                                parentProps={parentProps}

                                defaultValueForShortDesc={defaultValueForShortDesc}
                                defaultValueForLongDesc={defaultValueForLongDesc}
                                getShortDesc={getShortDesc}
                                getLongDesc={getLongDesc}
                            />
                        </Col>
                    </div>
                </div>

                {/* app card */}
                <div className="app-card mb-3" id="tab_pricing">
                    {/* card heading */}
                    <div className="app-header-wrapper heading-sm mb-1">
                        {/* heading */}
                        <p className="app-heading text-capitalize">Pricing</p>
                    </div>

                    <div className="app-card-content bg st-text-light-white border st-border-light bg-white st-default-rounded-block pad-20-LR pad-20-T">
                        <Col xs={12} md={9} lg={8} className="px-0">
                            <ProductPriceFields
                                formik={formik}
                                parentProps={parentProps}
                            />
                        </Col>
                    </div>
                </div>

                {/* app card */}
                <div className="app-card mb-3" id="tab_inventory">
                    {/* card heading */}
                    <div className="app-header-wrapper heading-sm mb-1">
                        {/* heading */}
                        <p className="app-heading text-capitalize st-text-light">Inventory</p>
                    </div>

                    <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20-LR pad-20-T">
                        <Col xs={12} md={9} lg={8} className="px-0">
                            <ProductStockFields
                                formik={formik}
                                parentProps={parentProps}
                            />
                        </Col>
                    </div>
                </div>

                {/* app card */}
                <div className="app-card mb-3" id="tab_dimenstions">
                    {/* card heading */}
                    <div className="app-header-wrapper heading-sm mb-1">
                        {/* heading */}
                        <p className="app-heading text-capitalize st-text-light">Dimensions</p>
                    </div>

                    <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20-LR pad-20-T">
                        <Col xs={12} md={9} lg={8} className="px-0">
                            <ProductDimensionsFields
                                formik={formik}
                                parentProps={parentProps}
                            />
                        </Col>
                    </div>
                </div>

                {/* app card */}
                <div className="app-card mb-3" id="tab_seo">
                    {/* card heading */}
                    <div className="app-header-wrapper heading-sm mb-1">
                        {/* heading */}
                        <p className="app-heading text-capitalize st-text-light">SEO</p>
                    </div>

                    <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20-LR pad-20-T">
                        <Col xs={12} md={9} lg={8} className="px-0">
                            <ProductSEOFields
                                formik={formik}
                                parentProps={parentProps}
                            />
                        </Col>
                    </div>
                </div>


            </div>
        </div>
    )
}
