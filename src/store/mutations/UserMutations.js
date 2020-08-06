export const signupMutation = userData => `mutation {
                            signup(request: \"${userData.username}\", password: \"${userData.password}\"){ jwt }
                        }`;