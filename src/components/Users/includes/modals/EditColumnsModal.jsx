import React, { useEffect } from 'react'

// bootstrap
import {
    OverlayTrigger,
} from 'react-bootstrap'

// icons : feather
import FeatherIcon from 'feather-icons-react';

// tooltips
import { renderTooltipClose } from 'helpers/Tooltips/CommonTooltips'

export default function EditColumnsModal(props) {
    useEffect(() => {

        return () => {

        }
    }, [props])
    return (
        <div className="app-modal-content modal_add-user">
            {/* close icon */}
            <div className="close-icon">
                <OverlayTrigger
                    placement={"bottom"}
                    overlay={renderTooltipClose}
                >
                    <button
                        className="st-round-btn st-btn-transparent st-btn-sm d-flex align-items-center justify-content-center"
                        onClick={props.closeModal && props.closeModal}
                    >
                        <FeatherIcon
                            icon="x"
                            size="17"
                            className="icon st-text-primary" />
                    </button>
                </OverlayTrigger>
            </div>

            {/* EDIT COLUMNS */}
            <div className="add-user-form">
                {/* heading */}
                <div className="app-modal-title-wrapper mb-3 mb-lg-4">
                    <p className="app-modal-title text-capitalize">edit columns</p>
                </div>

                {/* label item */}
                <div className="item mb-2">
                    <label className="st-checkbox d-inline-flex cursor-pointer">
                        <input type="checkbox" className="d-none" />
                        <span className="box d-flex align-items-center justify-content-center border">
                            <FeatherIcon
                                icon="check"
                                size="15"
                                className="icon position-relative" />
                        </span>
                        <span className="text ms-2">User</span>
                    </label>
                </div>

                {/* label item */}
                <div className="item mb-2">
                    <label className="st-checkbox d-inline-flex cursor-pointer">
                        <input type="checkbox" className="d-none" />
                        <span className="box d-flex align-items-center justify-content-center border">
                            <FeatherIcon
                                icon="check"
                                size="15"
                                className="icon position-relative" />
                        </span>
                        <span className="text ms-2">Email</span>
                    </label>
                </div>

                {/* label item */}
                <div className="item mb-2">
                    <label className="st-checkbox d-inline-flex cursor-pointer">
                        <input type="checkbox" className="d-none" />
                        <span className="box d-flex align-items-center justify-content-center border">
                            <FeatherIcon
                                icon="check"
                                size="15"
                                className="icon position-relative" />
                        </span>
                        <span className="text ms-2">Type</span>
                    </label>
                </div>

                {/* label item */}
                <div className="item mb-2">
                    <label className="st-checkbox d-inline-flex cursor-pointer">
                        <input type="checkbox" className="d-none" />
                        <span className="box d-flex align-items-center justify-content-center border">
                            <FeatherIcon
                                icon="check"
                                size="15"
                                className="icon position-relative" />
                        </span>
                        <span className="text ms-2">Two Factors</span>
                    </label>
                </div>

                {/* label item */}
                <div className="item mb-2">
                    <label className="st-checkbox d-inline-flex cursor-pointer">
                        <input type="checkbox" className="d-none" />
                        <span className="box d-flex align-items-center justify-content-center border">
                            <FeatherIcon
                                icon="check"
                                size="15"
                                className="icon position-relative" />
                        </span>
                        <span className="text ms-2">Last Active</span>
                    </label>
                </div>

                {/* label item */}
                <div className="item mb-2">
                    <label className="st-checkbox d-inline-flex cursor-pointer">
                        <input type="checkbox" className="d-none" />
                        <span className="box d-flex align-items-center justify-content-center border">
                            <FeatherIcon
                                icon="check"
                                size="15"
                                className="icon position-relative" />
                        </span>
                        <span className="text ms-2">Status</span>
                    </label>
                </div>



                <div className="btns d-flex justify-content-end pt-3">
                    <button className="st-btn st-btn-primary no-min-width">
                        Apply
                    </button>
                </div>

            </div>

        </div>
    )
}
