import {gql} from '@apollo/client';

// get status
export const GET_STATUSES = gql`
  query GetStatuses {
    statuses {
      ID
      NamaStatus
    }
  }
`;

// get urgency
export const GET_EMERGENCY = gql`
  query GetEmergencys {
    emergencies {
      ID
      EmergencyName
    }
  }
`;

// get maintenance request data
export const GET_MAINTENANCE_REQUEST = gql`
  query GetMaintenaceRequest {
    maintenanceRequests {
      ID
      Status
      Emergency
      Title
      Description
      IsResolved
      Date
    }
  }
`;

// add maintenance request data
export const ADD_MAINTENANCE_REQUEST = gql`
  mutation AddMaintenanceRequest(
    $Status: Int!
    $Emergency: Int!
    $Title: String!
    $Description: String!
    $Date: String!
    $IsResolved: Boolean!
  ) {
    addMaintenanceRequest(
      Status: $Status
      Emergency: $Emergency
      Title: $Title
      Description: $Description
      Date: $Date
      IsResolved: $IsResolved
    ) {
      ID
      Title
      Description
      Date
      IsResolved
    }
  }
`;

// update maintenance request data
export const UPDATE_MAINTENANCE_REQUEST = gql`
  mutation UpdateMaintenanceRequest(
    $id: Int!
    $Status: Int
    $Emergency: Int
    $Title: String
    $Description: String
    $Date: String
    $IsResolved: Boolean
  ) {
    updateMaintenanceRequest(
      id: $id
      Status: $Status
      Emergency: $Emergency
      Title: $Title
      Description: $Description
      Date: $Date
      IsResolved: $IsResolved
    ) {
      ID
      Status
      Emergency
      Title
      Description
      Date
      IsResolved
    }
  }
`;
