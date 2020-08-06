import axios from "axios";

export default function (query, jwt = null) {
    const headersWithAuth = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
    };
    const headersForAuth = {
        "Content-Type": "application/json",
    };
    return axios({
        url: process.env.VUE_APP_GRAPHQL_SERVER_URL,
        method: "POST",
        data: JSON.stringify({
            query
        }),
        headers: jwt ? headersWithAuth : headersForAuth
    });
}