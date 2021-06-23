// bootstrap
import { Tooltip } from "react-bootstrap";

// TOOLTIPS
// delete
export const renderTooltipDelete = (props) => (
    <Tooltip {...props}>Delete User</Tooltip>
);

// edit
export const renderTooltipEdit = (props) => <Tooltip {...props}>Edit User</Tooltip>;
