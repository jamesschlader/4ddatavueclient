import {mapNodeAsString} from "@/store/helpers/mapNodeAsString";

export function mapValueAsString(nodeValue) {
    let base = `{ nodeValueId: ${nodeValue.nodeValueId}, value: "${nodeValue.value}", 
              nodeValueSpace: ${mapNodeAsString(nodeValue.nodeValueSpace)}`;
    const tail = "}";
    base = nodeValue.operator ? base + `, operator: "${nodeValue.operator}"` : base;
    base = nodeValue.power ? base + `, power: ${nodeValue.power}` : base;
    base = nodeValue.nodeValuesSpacesToReduce ?
        base +
        `, nodeValuesSpacesToReduce: [${nodeValue.nodeValuesSpacesToReduce}]` : base;
    console.log(`here's the nodeValue string: ${base + tail}`);
    return base + tail;
}