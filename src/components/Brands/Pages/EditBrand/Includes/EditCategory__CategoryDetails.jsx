import React from 'react'

export default function EditCategory__CategoryDetails(props) {
    const { parentCategories } = props
    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.categoryName && props.formik.errors.categoryName) ? "has-msg msg-error" : ""}`}>
                <label>Category Name <span>*</span></label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Category Name"
                        id="categoryName"
                        {...props.formik.getFieldProps('categoryName')} />
                    {
                        /* form message */
                        (props.formik.touched.categoryName && props.formik.errors.categoryName) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.categoryName}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.parentCategoryName && props.formik.errors.parentCategoryName) ? "has-msg msg-error" : ""}`}>
                <label>Parent Category</label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="parentCategoryName"
                        {...props.formik.getFieldProps('parentCategoryName')}>
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
                        (props.formik.touched.parentCategoryName && props.formik.errors.parentCategoryName) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.parentCategoryName}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.status && props.formik.errors.status) ? "has-msg msg-error" : ""}`}>
                <label>Status</label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="status"
                        {...props.formik.getFieldProps('status')}>
                        <option disabled value="">Select Status</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
                    {
                        /* form message */
                        (props.formik.touched.status && props.formik.errors.status) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.status}</p>
                            </div>
                        )
                    }
                </div>
            </div>

        </React.Fragment>
    )
}
