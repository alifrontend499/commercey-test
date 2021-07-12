import React from 'react'

// bootstrap
import {
    Col
} from 'react-bootstrap'

// fields
import EmailDetails from './FormEmails__Details'
import EmailDescription from './FormEmails__Description'

export default function EmailsFormContentView(props) {
    const { formik, emailEvents, getHTML_editorResult } = props

    return (
        <React.Fragment>
            {/* app card */}
            <div className="app-card mb-3 mb-lg-4">
                {/* card heading */}
                <div className="app-header-wrapper heading-sm mb-1">
                    {/* heading */}
                    <p className="app-heading text-capitalize">Email Details</p>
                </div>
                <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20-LR pad-20-T">
                    <Col xs={12} md={9} lg={6} className="px-0">
                        <EmailDetails
                            formik={formik}
                            emailEvents={emailEvents}
                        />
                    </Col>
                </div>
            </div>

            {/* app card */}
            <div className="app-card mb-3 mb-lg-4">
                {/* card heading */}
                <div className="app-header-wrapper heading-sm mb-1">
                    {/* heading */}
                    <p className="app-heading text-capitalize">Email Content</p>
                </div>
                <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20">
                    <Col xs={12} md={9} lg={10} className="px-0">
                        <EmailDescription
                            formik={formik}
                            getResult={getHTML_editorResult}
                        />
                    </Col>
                </div>
            </div>
        </React.Fragment>
    )
}
