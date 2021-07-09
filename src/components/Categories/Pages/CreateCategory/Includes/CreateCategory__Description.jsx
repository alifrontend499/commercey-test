import React from 'react'

// html editor
import HTML_Editor from 'utlis/helpers/HTML_Editor'

export default function CreateCategory__Description(props) {
    const { getResult } = props

    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap ${(props.formik.touched.description && props.formik.errors.description) ? "has-msg msg-error" : ""}`}>
                <label>Description</label>
                <div className="media-body">
                    <HTML_Editor
                        defaultValue={props.formik.values.description}
                        getResult={getResult}
                    />

                    {
                        /* form message */
                        (props.formik.touched.description && props.formik.errors.description) && (
                            <div className="st-form-msg position-absolute" style={{ bottom: -18 }}>
                                <p className="st-fs-12">{props.formik.errors.description}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
