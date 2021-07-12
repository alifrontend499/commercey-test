import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';

// styles
import 'react-quill/dist/quill.snow.css';

import "./styles/HTML_Editor-styles.scss"

function HTML_Editor(props) {
    const [value, setValue] = useState('');


    // setting default editor value
    useEffect(() => {
        if (props.defaultValue) {
            setValue(props.defaultValue)
        }
    }, [props])


    // editor's toolbox modules
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'align': [] }, { 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    }

    // editor's toolbox format
    // const formats = [
    //     'header',
    //     'bold', 'italic', 'underline', 'strike', 'blockquote',
    //     'list', 'bullet',
    //     'link', 'image'
    // ]

    // when editor values changes
    const valueChanged = (data) => {
        setValue(data)

        // sending props back to the parent component
        props.getResult && props.getResult(data)
    }

    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={valueChanged}

            modules={modules}
        // formats={formats}
        />
    );
}


export default HTML_Editor