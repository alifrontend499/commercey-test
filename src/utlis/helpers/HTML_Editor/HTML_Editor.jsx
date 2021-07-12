import React, { Component } from 'react'

// quill editor
import ReactQuill from 'react-quill';

// styles
import 'react-quill/dist/quill.snow.css';
import "./styles/HTML_Editor-styles.scss"

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

export default class HTML_Editor extends Component {
    constructor(props) {
        super(props)

        // state
        this.state = {
            value: ''
        }

        // functions bindings
        this.valueChanged = this.valueChanged.bind(this)
    }

    // when component mounts
    componentDidMount() {
        if (this.props.defaultValue) {
            this.setState({ value: this.props.defaultValue })
        }
    }

    // when props changes
    componentDidUpdate(prevProp, prevState) {
        if (this.props.defaultValue !== prevState.value) {
            this.setState({ value: this.props.defaultValue })
        }
    }

    // when editor values changes
    valueChanged = (data) => {
        this.setState({ value: data })

        // sending props back to the parent component
        this.props?.getResult(data)
    }

    render() {
        const state = this.state

        return (
            <ReactQuill
                theme="snow"
                value={state.value}
                onChange={this.valueChanged}

                modules={modules}
            // formats={formats}
            />
        )
    }
}
