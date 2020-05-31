import { gqlClient } from '@/utils';
import { IMetroStationClient, IApartment } from '@/types';
import gql from 'graphql-tag';
import { apartmentDefaultSchemas } from './helper';

class ApartmentClient {
  static queryStationsNearby = async (
    lng: number,
    lat: number,
    radius: number = 500,
  ): Promise<IMetroStationClient[]> => {
    const { data } = await gqlClient.query({
      query: gql`
        query($coordinates: [Float]!, $radius: Int!) {
          queryStationsNearbyCoordinates(coordinates: $coordinates, radius: $radius) {
            stationId
            stationName
            city
            coordinates
            lines {
              lineId
              lineName
              city
            }
            distance
          }
        }
      `,
      variables: {
        coordinates: [lng, lat],
        radius,
      },
    });
    return data.queryStationsNearbyCoordinates;
  };

  static queryApartmentsNearbyMetroStation = async (
    stationId: string,
    radius: number = 500,
    limit: number = 50,
  ): Promise<IApartment[]> => {
    return (
      await gqlClient.query({
        query: gql`
          query($stationId: String!, $radius: Int!, $limit: Int!) {
            queryApartmentsNearbyStation(stationId: $stationId, radius: $radius, limit: $limit) {
              ${apartmentDefaultSchemas}
            }
          }
        `,
        variables: {
          stationId,
          radius,
          limit,
        },
      })
    ).data.queryApartmentsNearbyStation;
  };

  static queryApartmentsNearbyCoordinates = async (
    coordinates: [number, number],
    radius: number = 500,
    limit: number = 50,
  ): Promise<IApartment[]> => {
    return (
      await gqlClient.query({
        query: gql`
          query($coordinates: [Float]!, $radius: Int!, $limit: Int!){
            queryApartmentsNearbyCoordinates(coordinates: $coordinates, radius: $radius, limit: $limit) {
              ${apartmentDefaultSchemas}
            }
          }
        `,
        variables: {
          coordinates,
          radius,
          limit,
        },
      })
    ).data.queryApartmentsNearbyCoordinates;
  };
}

export { ApartmentClient };
