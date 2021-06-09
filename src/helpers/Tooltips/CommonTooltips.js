// bootstrap
import { Tooltip } from "react-bootstrap";

// TOOLTIPS
// delete
export const renderTooltipDelete = (props) => (
    <Tooltip {...props}>Delete</Tooltip>
);

// edit
export const renderTooltipEdit = (props) => <Tooltip {...props}>Edit</Tooltip>;

// close
export const renderTooltipClose = (props) => (
    <Tooltip {...props}>Close</Tooltip>
);

// close modal
export const renderTooltipCloseModal = (props) => (
    <Tooltip {...props}>Close Modal</Tooltip>
);
