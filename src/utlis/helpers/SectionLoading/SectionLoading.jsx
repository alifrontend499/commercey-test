import React, { memo } from 'react'

// bootstrap
import {
    Spinner,
} from 'react-bootstrap'

function SectionLoading(props) {
    return (
        <div>
            <div className={`section-loading-container d-flex justify-content-center ${props.sectionClassName ? props.sectionClassName : ""}`}>
                <Spinner animation="border" className={`st-text-primary ${props.spinnerClassName ? props.spinnerClassName : ""}`} />
            </div>
        </div>
    )
}

export default memo(SectionLoading)