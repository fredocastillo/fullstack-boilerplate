/* eslint-disable react-hooks/rules-of-hooks */
import { useApiQuery } from '../hooks/use-api-query.hook';
import { useApiMutation } from '../hooks/use-api-mutation.hook';
import { useFileUpload } from '../hooks/use-file-upload.hook';
import { useFileDownload } from '../hooks/use-file-download.hook';
import { createAxiosInstance } from '../utils/create-axios-instance';

const serviceClient = createAxiosInstance('http://localhost:3000/api');
const serviceKey = 'userService';
const baseEndpoint = '/users';

export function useUserService() {
  const listUsers = () =>
    useApiQuery(serviceClient, ['users'], `${baseEndpoint}`);

  const getUser = (id: string | number) =>
    useApiQuery(serviceClient, ['user', id], `${baseEndpoint}/${id}`);

  const createUser = () =>
    useApiMutation(serviceClient, {
      serviceKey,
      method: 'POST',
      url: `${baseEndpoint}`,
    });

  const updateUser = () =>
    useApiMutation(serviceClient, {
      serviceKey,
      method: 'PUT',
      url: `${baseEndpoint}`,
    });

  const deleteUser = () =>
    useApiMutation(serviceClient, {
      serviceKey,
      method: 'DELETE',
      url: `${baseEndpoint}`,
    });

  const listUserProfiles = (userId: string | number) =>
    useApiQuery(
      serviceClient,
      ['userProfiles', userId],
      `${baseEndpoint}/${userId}/profiles`
    );

  const getUserProfile = (
    userId: string | number,
    profileId: string | number
  ) =>
    useApiQuery(
      serviceClient,
      ['userProfile', userId, profileId],
      `${baseEndpoint}/${userId}/profiles/${profileId}`
    );

  const uploadUserAvatar = () => {
    const upload = useFileUpload(serviceClient);
    const mutate = (file: File) =>
      upload.mutate({ url: `${baseEndpoint}/avatar`, file });

    return {
      ...upload,
      mutate,
    };
  };

  const downloadUserReport = () => {
    const download = useFileDownload(serviceClient);
    const mutate = (filename: string) =>
      download.mutate({ url: `${baseEndpoint}/report`, filename });

    return {
      ...download,
      mutate,
    };
  };

  return {
    listUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    listUserProfiles,
    getUserProfile,
    uploadUserAvatar,
    downloadUserReport,
  };
}
