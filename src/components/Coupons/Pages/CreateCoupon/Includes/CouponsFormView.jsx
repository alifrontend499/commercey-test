import React from 'react'

// bootstrap
import {
    Col
} from 'react-bootstrap'

// fields
import DetailsFields from './FormFields__Details'

export default function CouponsFormView(props) {
    const { formik, parentProps } = props

    return (
        <div className="form-content">
            {/* app card */}
            <div className="app-card mb-3" id="tab_basicInfo">
                {/* card heading */}
                <div className="app-header-wrapper heading-sm mb-1">
                    {/* heading */}
                    <p className="app-heading text-capitalize st-text-light">Basic Info</p>
                </div>

                <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20-LR pad-20-T">
                    <Col xs={12} md={9} lg={8} className="px-0">
                        <DetailsFields
                            formik={formik}
                            parentProps={parentProps}
                        />
                    </Col>
                </div>
            </div>
        </div>
    )
}
