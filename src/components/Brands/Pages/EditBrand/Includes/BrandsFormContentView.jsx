import React from 'react'

// bootstrap
import {
    Col
} from 'react-bootstrap'

// includes
import BrandDetailsFields from './FormBrands__Details'

export default function BrandsFormContentView(props) {
    const { formik } = props

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
                        <BrandDetailsFields
                            formik={formik}
                        />
                    </Col>
                </div>
            </div>
        </React.Fragment>
    )
}
