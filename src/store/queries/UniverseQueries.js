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