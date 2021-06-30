// bootstrap
import { Tooltip } from "react-bootstrap";

// TOOLTIPS
// delete
export const renderTooltipDelete = (props) => (
    <Tooltip {...props}>Delete Product</Tooltip>
);

// edit
export const renderTooltipEdit = (props) => <Tooltip {...props}>Edit Product</Tooltip>;
