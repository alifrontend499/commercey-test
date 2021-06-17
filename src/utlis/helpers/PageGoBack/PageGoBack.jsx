import React, { memo } from 'react'

// react router
import { useHistory } from 'react-router-dom'

// icons : feather
import FeatherIcon from 'feather-icons-react';

function PageGoBack(props) {
    let history = useHistory()

    // go back buttons
    const goBack = () => {
        history.goBack()
    }

    return (
        <div className={
            `back-button-wrapper ${!props.noBottomMargin ? "mb-2" : ""} ${props.wrapperClassName}`
        }>
            <p
                className={
                    `st-text-primary d-inline-flex align-items-center cursor-pointer st-fs-15 ${props.pClassName}`
                }
                onClick={goBack}>
                <FeatherIcon
                    icon="arrow-left"
                    size="14"
                    className={`icon me-1 ${props.iconClassName}`} />
                <span className={`${props.spanClassName}`}>Back</span>
            </p>
        </div>
    )
}

export default memo(PageGoBack)