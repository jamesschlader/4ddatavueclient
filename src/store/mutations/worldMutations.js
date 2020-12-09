import {mapNodeAsString} from "@/store/helpers/mapNodeAsString";
import {mapValueAsString} from "@/store/helpers/mapValueAsString";

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
                        value {
                            nodeValueId
                            stringValue
                            doubleValue
                            createDate
                            nodeValueSpace {nodeSpaceId}
                        }
                    }
                }
              }`;
};

export const addValueToNode = (nodeValueDTO) => {
    return `mutation {
        addValueToNode(nodeId: ${nodeValueDTO.nodeValueSpace.nodeSpaceId}, value: ${mapValueAsString(nodeValueDTO)} ){
            nodeValueId
            stringValue
            doubleValue
            createDate
            nodeValueSpace {nodeSpaceId}
        }
    }`;
};

export const addManyNodesToWorld = nodes => {
    return `mutation {addManyNodesToWorld(nodes: [${nodes.map(node => mapNodeAsString(node))} ]){
            worldId
            name
            description
            nodes {
                nodeSpaceId
                XId
                YId
                value {
                    nodeValueId
                    stringValue
                    doubleValue
                    createDate
                    nodeValueSpace {nodeSpaceId}
                }
            }
        }
    }`;
};

