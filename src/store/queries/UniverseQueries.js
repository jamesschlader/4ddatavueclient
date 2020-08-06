export const universes = `query {universes {
                                name
                                description
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