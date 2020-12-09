export const getAllNodesByWorldId = worldId => {
    return `query {
            getAllNodesByWorldId(worldId: ${worldId}){
            nodeSpaceId
            XId
            YId
            value {
                nodeValueId
                stringValue
                doubleValue
                createDate
            }
            watchedSpaces {
                nodeSpaceId
                XId
                YId
            }
            listeners {
                nodeSpaceId
                XId
                YId
            }
            strategy
            power
            dataType
        }
    } `;
};