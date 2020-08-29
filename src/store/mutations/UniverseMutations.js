export const createUniverse = universe => `mutation {
                createUniverse( 
                    universe: { 
                        name: \"${universe.name}\", 
                        description: \"${universe.description}\", 
                        username: \"${universe.username}\"}
                    ) {
                        name 
                        description
                        universeId
                        worlds{
                            worldId
                            name
                            description
                            nodes{
                                name
                                description
                             }
                         }
                         user{
                            username
                         }
                     }
                }`;

export const addExistingWorldToNewUniverse = dto => `mutation {
                  addWorldToUniverse(
                                     universeDTO: {
                                        universeId: ${dto.universeId},
                                        name: \"${dto.name}\",
                                        description: \"${dto.description}\",
                                        username: \"${dto.username}\"
                                        },
                                        worldId: ${dto.worldId}
                                      ){
                                        universeId
                                        name
                                        description
                                         worlds {
                                            worldId
                                            name
                                            description
                                            nodes {
                                                name
                                                description
                                            }
                                          }
                                        }
                                        }`;

export const addNewWorldToExistingUniverse = dto => `mutation {
                    addWorldToUniverse(
                        universeId: ${dto.universeId},
                        worldDTO: {
                            worldId: ${dto.worldId},
                            name: \"${dto.name}\",
                            description: \"${dto.description}\"
                        }
                    ){
                        universeId
                        name
                        description
                        worlds {
                            worldId
                            name
                            description
                            nodes {
                                name
                                description
                            }
                        }
                    }}`;