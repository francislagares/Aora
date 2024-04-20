import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
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
const storage = new Storage();

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
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');

    return session;
  } catch (error) {
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
    const videos = await databases.listDocuments(
      appwrite.databaseId,
      appwrite.videoCollectionId,
      [Query.search('title', query)],
    );

    if (!videos) throw new Error('Something went wrong');

    return videos.documents;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const getUserVideos = async (userId: string) => {
  try {
    const videos = await databases.listDocuments(
      appwrite.databaseId,
      appwrite.videoCollectionId,
      [Query.equal('creator', userId)],
    );

    if (!videos) throw new Error('No videos found for this user');

    return videos.documents;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const createVideo = async (form: any) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video'),
    ]);

    const newPost = await databases.createDocument(
      appwrite.databaseId,
      appwrite.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      },
    );

    return newPost;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const uploadFile = async (file: any, type: string) => {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      appwrite.storageId,
      ID.unique(),
      asset,
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export async function getFilePreview(fileId: string, type: string) {
  let fileUrl;

  try {
    if (type === 'video') {
      fileUrl = storage.getFileView(appwrite.storageId, fileId);
    } else if (type === 'image') {
      fileUrl = storage.getFilePreview(
        appwrite.storageId,
        fileId,
        2000,
        2000,
        'top',
        100,
      );
    } else {
      throw new Error('Invalid file type');
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
