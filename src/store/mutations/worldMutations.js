import {mapNodeAsString} from "@/store/helpers/mapNodeAsString";

export const addNodeToWorld = addNodeToWorldObject => {
    console.log(`what is the node to add: `, addNodeToWorldObject.node);
    return `mutation {
                addNodeToWorld(worldId: ${addNodeToWorldObject.worldId}, node: ${mapNodeAsString(
        addNodeToWorldObject.node)}){
                    worldId
                    name
                    description
                    nodes {
                        nodeValueSpaceId
                        name
                        description
                    }
                }
              }`;
};

