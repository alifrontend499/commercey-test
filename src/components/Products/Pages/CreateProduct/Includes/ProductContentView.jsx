import React from 'react'

// bootstrap
import {
    Col
} from 'react-bootstrap'

import ProductDetailsFields from './FormProduct__Details'
import ProductPriceFields from './FormProduct__Price'
import ProductDescriptionFields from './FormProduct__Description'
import ProductStockFields from './FormProduct__Stock'
import ProductDimensionsFields from './FromProduct__Dimensions'
import ProductSEOFields from './FormProduct__SEO'

export default function ProductContentView(props) {
    const { formik, parentProps, parentCategories, brands, getShortDesc, getLongDesc, defaultValueForShortDesc, defaultValueForLongDesc } = props
    return (
        <div className="pfc-content media-body">
            <div className="inner">
                {/* app card */}
                <div className="app-card mb-3" id="tab_basicInfo">
                    {/* card heading */}
                    <div className="app-header-wrapper heading-sm mb-1">
                        {/* heading */}
                        <p className="app-heading text-capitalize">Basic Info</p>
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
                        <p className="app-heading text-capitalize">Images</p>
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
                        <p className="app-heading text-capitalize">Description</p>
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

                    <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20-LR pad-20-T">
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
                        <p className="app-heading text-capitalize">Inventory</p>
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
                        <p className="app-heading text-capitalize">Dimensions</p>
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
                        <p className="app-heading text-capitalize">SEO</p>
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
