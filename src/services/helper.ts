export const apartmentDefaultSchemas = `
            id
            houseUrl
            city
            communityName
            communityUrl
            houseType
            houseId
            price
            area
            pricePerSquareMeter
            tags
            coordinates
            title
            water
            electricity
            createdAt
            createdTime
            distance
            computed {
                rankingOfPPSM
                rankingOfPrice
                rankingOfArea
                averagePPSM
                averagePrice
                averageArea
                medianPPSM
                medianPrice
                medianArea
                lowestPPSM
                lowestPrice
                total
                updatedAt
                range
            }
`;
