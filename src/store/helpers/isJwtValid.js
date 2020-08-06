import jwt from "jsonwebtoken";

export default function (token) {
    try {
        return jwt.decode(token, {algorithms: ["HS256"]}, (err, decoded) => {
            if (err) {
                console.log(`got an error from jsonwebtoken: `, err);
                return false;
            }
            return decoded.User.credentialsNonExpired;
        });
    } catch (error) {
        localStorage.removeItem("jwt");
        return false;
    }
}