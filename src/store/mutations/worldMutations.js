import {mapNodeAsString} from "@/store/helpers/mapNodeAsString";

export const addNodeToWorld = (addNodeToWorldObject) => {
    console.log(`what is the node to add: `, addNodeToWorldObject);
    return `mutation {
                addNodeToWorld(node: ${mapNodeAsString(addNodeToWorldObject)}){
                    worldId
                    name
                    description
                    nodes {
                        nodeSpaceId
                        XId
                        YId
                    }
                }
              }`;
};

