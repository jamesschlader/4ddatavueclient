import {mapNodeAsString} from "@/store/helpers/mapNodeAsString";

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
                                        user {
                                            username
                                        }
                                        description
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
                                        }
                                        }`;

export const addNewWorldToExistingUniverse = dto => {
    const nodes = dto.nodes.filter(node => node.nodeSpaceId && node).map(node => mapNodeAsString(node));
    let base = `mutation { addWorldToUniverse( worldDTO: { name: \"${dto.name}\"`;
    base = dto.universeId > 0 ? base + `, universeId: ${dto.universeId}` : base;
    base = dto.worldId > 0 ? base + `, worldId: ${dto.worldId}` : base;
    base = dto.description ? base + `, description: \"${dto.description}\"` : base;
    console.log(`about to add the nodes into the mutation. Here they are: `, nodes);
    base = dto.nodes.length > 0 ? base + `, nodes: [${nodes}]` : base;
    const tail = `}){
                        universeId
                        name
                        description
                        user {
                            username
                        }
                        worlds {
                            worldId
                            name
                            description
                            nodes {
                                nodeSpaceId
                                name
                                description
                            }
                        }
                    }
               }`;
    return base + tail;
};

export const editWorld = dto => {
    const nodes = dto.nodes.filter(node => node.nodeSpaceId && node).map(node => mapNodeAsString(node));
    return `mutation {
                    editWorld (
                        worldDTO: {
                            worldId: \"${dto.worldId}\",
                            name: \"${dto.name}\",
                            description: \"${dto.description}\",
                            nodes: [${nodes}],
                            universeId: ${dto.universeId}
                        }
                    ) {
                        worldId
                        name
                        description
                        nodes {
                            nodeSpaceId
                            name
                            description
                        }
                        universe {
                            universeId
                        }
                    }
                }`;
};

export const editUniverse = dto => {
    return `mutation {
                editUniverse (universe: {universeId: ${dto.universeId}, name: \"${dto.name}\", description: \"${dto.description}\"}) {
                       universeId
                       name
                       user {
                            username
                        }
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
};

