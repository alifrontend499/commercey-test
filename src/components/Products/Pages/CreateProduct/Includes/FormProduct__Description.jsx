import React from 'react'

// html editor
import HTML_Editor from 'utlis/helpers/HTML_Editor'

export default function FormProduct__Description(props) {
    const { defaultValueForShortDesc, defaultValueForLongDesc, getShortDesc, getLongDesc } = props

    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap mb-3`}>
                <label>
                    Short Description
                    {/* <span>*</span> */}
                </label>
                <div className="media-body">
                    <HTML_Editor
                        defaultValue={defaultValueForShortDesc}
                        getResult={getShortDesc}
                    />
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap`}>
                <label>
                    Long Description
                    {/* <span>*</span> */}
                </label>
                <div className="media-body">
                    <HTML_Editor
                        defaultValue={defaultValueForLongDesc}
                        getResult={getLongDesc}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}
