export function mapNodeAsString(nodeValueSpace) {
    if (nodeValueSpace) {
        const {nodeSpaceId, xId, yId, worldId, name, description, dataType, power, strategy, watchedSpaces} = nodeValueSpace;
        const watchedSpacesText = watchedSpaces && watchedSpaces.map(space => mapNodeAsString(space));
        let base = `{nodeSpaceId: ${nodeSpaceId}, xid: ${xId ? xId : 0}, yid: ${yId ? yId : 0}`;
        const tail = "}";
        base = name ? base + `, \"${name}\"` : base;
        base = worldId > 0 ? base + `, worldId: ${worldId}` : base;
        base = description ? base + `, description: \"${description}\"` : base;
        base = dataType ? base + `, dataType: \"${dataType}\"` : base;
        base = power > 0 ? base + `, power: ${power}` : base;
        base = strategy ? base + `, strategy: \"${strategy}\"` : base;
        base = watchedSpaces && watchedSpaces.length > 0 ? base + `, watchedSpaces: [${watchedSpacesText}]` : base;
        return base + tail;
    }
    return "";
};