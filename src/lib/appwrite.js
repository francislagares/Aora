import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

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

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
    );

    if (!newAccount) throw new Error();

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwrite.databaseId,
      appwrite.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      },
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
};
