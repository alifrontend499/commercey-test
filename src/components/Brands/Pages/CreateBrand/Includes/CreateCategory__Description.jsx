import React from 'react'

// html editor
import HTML_Editor from 'utlis/helpers/HTML_Editor'

export default function CreateCategory__Description(props) {
    const { defaultValue, getResult } = props

    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap`}>
                <label>Description</label>
                <div className="media-body">
                    <HTML_Editor
                        defaultValue={defaultValue}
                        getResult={getResult}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}
