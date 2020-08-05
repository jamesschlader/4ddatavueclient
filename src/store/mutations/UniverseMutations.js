export const createUniverse = universe => `mutation {
                createUniverse( universe: { name: \"${universe.name}\", description: \"${universe.description}\" }) 
                    {name description universeId }
                }`;

