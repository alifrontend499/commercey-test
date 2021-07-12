import React, { memo } from 'react'

function FormCategories__Details(props) {
    const { parentCategories, formik } = props
    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.categoryName && formik.errors.categoryName) ? "has-msg msg-error" : ""}`}>
                <label>
                    Category Name
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Category Name"
                        id="categoryName"
                        {...formik.getFieldProps('categoryName')} />
                    {
                        /* form message */
                        (formik.touched.categoryName && formik.errors.categoryName) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.categoryName}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.parentCategoryName && formik.errors.parentCategoryName) ? "has-msg msg-error" : ""}`}>
                <label>Parent Category</label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="parentCategoryName"
                        {...formik.getFieldProps('parentCategoryName')}>
                        <option disabled value="">Select Parent Category</option>
                        {
                            (parentCategories && parentCategories.length) ? parentCategories.map(item => (
                                <option
                                    key={item.category_id}
                                    value={item.category_id}>{item.category_name}</option>
                            )) : null
                        }
                    </select>
                    {
                        /* form message */
                        (formik.touched.parentCategoryName && formik.errors.parentCategoryName) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.parentCategoryName}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.status && formik.errors.status) ? "has-msg msg-error" : ""}`}>
                <label>Status</label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="status"
                        {...formik.getFieldProps('status')}>
                        <option disabled value="">Select Status</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
                    {
                        /* form message */
                        (formik.touched.status && formik.errors.status) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.status}</p>
                            </div>
                        )
                    }
                </div>
            </div>

        </React.Fragment>
    )
}


export default memo(FormCategories__Details)