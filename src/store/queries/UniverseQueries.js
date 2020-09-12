export const universes = `query {universes {
                                universeId
                                name
                                description
                                user {
                                    username
                                }
                                worlds {
                                    name
                                    description
                                    nodes {
                                        XId
                                        YId
                                        strategy
                                    }
                                }
                              }
                            }`;

export const getUniversesForUser = (username) => `query {getUniversesForUser(username: \"${username}\") {
                                 universeId
                                name
                                description
                                user{
                                    username
                                }
                                worlds {
                                    worldId
                                    name
                                    description
                                    nodes {
                                        name
                                        description
                                        XId
                                        YId
                                        watchedSpaces {
                                            name
                                            description
                                            XId
                                            YId
                                            dataType
                                            strategy
                                            power
                                        }
                                        dataType
                                        strategy
                                        power
                                    }
                                }
                            }}`;