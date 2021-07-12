import React from 'react'

// bootstrap
import {
    Col
} from 'react-bootstrap'

// includes
import CategoryDetailsFields from './FormCategories__Details'
import CategoryDescriptionFields from './FormCategories__Description'
import CategorySEOFields from './FormCategories__SEO'

export default function CategoriesFormContentView(props) {
    const { formik, parentCategories, getResult } = props

    return (
        <React.Fragment>
            {/* app card */}
            <div className="app-card mb-3 mb-lg-4">
                {/* card heading */}
                <div className="app-header-wrapper heading-sm mb-1">
                    {/* heading */}
                    <p className="app-heading text-capitalize">Details</p>
                </div>

                <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20-LR pad-20-T">
                    <Col xs={12} md={9} lg={6} className="px-0">
                        <CategoryDetailsFields
                            formik={formik}
                            parentCategories={parentCategories}
                        />
                    </Col>
                </div>
            </div>

            {/* app card */}
            <div className="app-card mb-3 mb-lg-4">
                {/* card heading */}
                <div className="app-header-wrapper heading-sm mb-1">
                    {/* heading */}
                    <p className="app-heading text-capitalize">Description</p>
                </div>

                <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20">
                    <Col xs={12} md={9} className="px-0">
                        <CategoryDescriptionFields
                            formik={formik}
                            getResult={getResult}
                        />
                    </Col>
                </div>
            </div>

            {/* app card */}
            <div className="app-card mb-3 mb-lg-4">
                {/* card heading */}
                <div className="app-header-wrapper heading-sm mb-1">
                    {/* heading */}
                    <p className="app-heading text-capitalize">SEO</p>
                </div>

                <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20-LR pad-20-T">
                    <Col xs={12} md={9} lg={6} className="px-0">
                        <CategorySEOFields
                            formik={formik}
                        />
                    </Col>
                </div>
            </div>
        </React.Fragment>
    )
}
