export function mapNodeAsString(nodeValueSpace) {
    if (nodeValueSpace) {
        const {nodeSpaceId, xId, yId, worldId, name, description, operator, power, watchedSpaces} = nodeValueSpace;
        const watchedSpacesText = watchedSpaces && watchedSpaces.map(space => mapNodeAsString(space));
        let base = `{xid: ${xId ? xId : 0}, yid: ${yId ? yId : 0}, name: \"${name ? name : ''}\"`;
        const tail = "}";
        base = worldId > 0 ? base + `, worldId: ${worldId}` : base;
        base = nodeSpaceId > 0 ? base + `, nodeSpaceId: ${nodeSpaceId}` : base;
        base = description ? base + `, description: \"${description}\"` : base;
        base = operator ? base + `, operator: \"${operator}\"` : base;
        base = power > 0 ? base + `, power: ${power}` : base;
        base = watchedSpaces && watchedSpaces.length > 0 ? `, watchedSpaces: [${watchedSpacesText}]` : base;
        return base + tail;
    }
    return "";
};