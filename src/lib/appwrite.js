import { Client } from 'react-native-appwrite';

export const appwrite = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.francislagares.aora',
  projectId: '661d414a25e911fd3c58',
  databaseId: '661d43046cf81230494c',
  userCollectionId: '661d432a173e3aa11d45',
  videoCollectionId: '661d434a472f639f4898',
  storageId: '661d45df2506fb6ec5c5',
};

const client = new Client();

client
  .setEndpoint(appwrite.endpoint)
  .setProject(appwrite.projectId)
  .setPlatform(appwrite.platform);
