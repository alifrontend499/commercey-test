// AXIOS
import axios from "axios";

// cancel token
const CancelToken = axios.CancelToken;

// api url
import { apiUrl_forEmail } from "./constants";

// get emails
export let cancelGetEmailsApi;
export async function getEmails(token, query = "") {
    if (token) {
        const emails = await axios.get(apiUrl_forEmail + "list?" + query, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelGetEmailsApi = c;
            }),
        });
        return emails;
    } else {
        console.log("Please add required parameters");
    }
}

// get email detail
export let cancelGetEmailDetailsApi;
export async function getEmailDetails(token, emailTemplateId) {
    if (token, emailTemplateId) {
        const emails = await axios.get(apiUrl_forEmail + "detail/" + emailTemplateId, {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelGetEmailDetailsApi = c;
            }),
        });
        return emails;
    } else {
        console.log("Please add required parameters");
    }
}

// get events
export let cancelGetEmailEventsApi;
export async function getEmailEvents(token) {
    if (token) {
        const emails = await axios.get(apiUrl_forEmail + "emailevents/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelGetEmailEventsApi = c;
            }),
        });
        return emails;
    } else {
        console.log("Please add required parameters");
    }
}

// add email
export let cancelAddEmailTemplateApi;
export async function addEmailTemplate(token, emailData) {
    if (token, emailData) {
        const emails = await axios.post(apiUrl_forEmail + "add",
            {
                template_title: emailData.template_title,
                email_subject: emailData.email_subject,
                email_from: emailData.email_from,
                cc_email: emailData.cc_email,
                bcc_email: emailData.bcc_email,
                email_body: emailData.email_body,
                send_email_to: emailData.send_email_to,
                event_id: emailData.event_id,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            {
                cancelToken: new CancelToken(function executor(c) {
                    // An executor function receives a cancel function as a parameter
                    cancelAddEmailTemplateApi = c;
                }),
            }
        );
        return emails;
    } else {
        console.log("Please add required parameters");
    }
}

// update email
export let cancelEditEmailTemplateApi;
export async function editEmailTemplate(token, emailData) {
    if (token, emailData) {
        const emails = await axios.put(apiUrl_forEmail + "edit/" + emailData.template_id,
            {
                template_title: emailData.template_title,
                email_subject: emailData.email_subject,
                email_from: emailData.email_from,
                cc_email: emailData.cc_email,
                bcc_email: emailData.bcc_email,
                email_body: emailData.email_body,
                send_email_to: emailData.send_email_to,
                event_id: emailData.event_id,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            {
                cancelToken: new CancelToken(function executor(c) {
                    // An executor function receives a cancel function as a parameter
                    cancelEditEmailTemplateApi = c;
                }),
            }
        );
        return emails;
    } else {
        console.log("Please add required parameters");
    }
}

// delete email
export let cancelDeleteEmailTemplateApi;
export async function deleteEmailTemplate(token, emailId) {
    if (token, emailId) {
        const emails = await axios.delete(apiUrl_forEmail + "delete/" + emailId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }, {
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelDeleteEmailTemplateApi = c;
            }),
        });
        return emails;
    } else {
        console.log("Please add required parameters");
    }
}