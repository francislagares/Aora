import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from 'react-native-appwrite';

export const appwrite = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.francislagares.aora',
  projectId: '661d414a25e911fd3c58',
  databaseId: '661d43046cf81230494c',
  userCollectionId: '661d432a173e3aa11d45',
  videoCollectionId: '661d434a472f639f4898',
  storageId: '661d45df2506fb6ec5c5',
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = appwrite;

const client = new Client();

client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  username: string,
) => {
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
      databaseId,
      userCollectionId,
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
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal('accountId', currentAccount.$id)],
    );

    if (!currentAccount) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const getAllVideos = async () => {
  try {
    const videos = await databases.listDocuments(databaseId, videoCollectionId);

    return videos.documents;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const getLatestVideos = async () => {
  try {
    const videos = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))],
    );

    return videos.documents;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const searchVideos = async (query: string) => {
  try {
    const posts = await databases.listDocuments(
      appwrite.databaseId,
      appwrite.videoCollectionId,
      [Query.search('title', query)],
    );

    if (!posts) throw new Error('Something went wrong');

    return posts.documents;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
