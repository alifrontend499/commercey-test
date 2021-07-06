// bootstrap
import { Tooltip } from "react-bootstrap";

// TOOLTIPS
// delete
export const renderTooltipDelete = (props) => (
    <Tooltip {...props}>Delete Coupon</Tooltip>
);

// edit
export const renderTooltipEdit = (props) => <Tooltip {...props}>Edit Coupon</Tooltip>;
