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
                                        nodeSpaceId
                                        XId
                                        YId
                                        strategy
                                    }
                                }
                              }
                            }`;

export const getUniversesForUser = () => `query {getUniversesForUser {
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
                                        nodeSpaceId
                                        XId
                                        YId
                                        watchedSpaces {
                                            nodeSpaceId
                                            XId
                                            YId
                                            dataType
                                            strategy
                                            power
                                        }
                                        dataType
                                        strategy
                                        power
                                        value {
                                            stringValue
                                        }
                                        world {
                                            worldId
                                            name
                                        }
                                    }
                                }
                            }}`;