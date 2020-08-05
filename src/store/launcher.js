import axios from "axios";

export default function (query) {
    return axios({
        url: process.env.VUE_APP_GRAPHQL_SERVER_URL,
        method: "POST",
        data: JSON.stringify({
            query
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
}