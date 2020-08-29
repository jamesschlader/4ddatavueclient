import axios from "axios";

export default function (query, jwt) {
    const headersWithAuth = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
    };
    const headersForAuth = {
        "Content-Type": "application/json",
    };
    const headers = jwt ? headersWithAuth : headersForAuth;
    return axios({
        url: process.env.VUE_APP_GRAPHQL_SERVER_URL,
        method: "POST",
        data: JSON.stringify({
            query
        }),
        headers
    });
}