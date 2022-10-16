import {useMutation, useQuery} from 'react-query'
import * as Api from '../../api'
import queryClient from '../../queryClient'
import {AddSocUser, EditSocUser, SocUser} from '../../types'

const P = 'user'

export const mutationKeys = {
  add: [P, 'add'],
  edit: [P, 'edit'],
}

const queryKeys = {
  get: [P],
}

const fetchUser = async (): Promise<SocUser | null> => {
  const response = await Api.authFetch(Api.userUrl())

  if (!response.ok) {
    return null
  }

  return (await response.json()) as SocUser
}

const addUser = async (addUser: AddSocUser) => {
  const result = await Api.authPost<AddSocUser>(Api.userUrl(), addUser)

  if (!result.ok) {
    throw Error('Nepodarilo sa pridať používateľa')
  }

  return (await result.json()) as SocUser
}

const editUser = async (editUser: EditSocUser) => {
  const result = await Api.authPut<EditSocUser>(Api.userUrl(), editUser)

  if (!result.ok) {
    throw Error('Nepodarilo sa zmeniť tvoj profil')
  }

  return (await result.json()) as SocUser
}

export const useGetUser = (enabled: boolean | undefined) => {
  return useQuery(queryKeys.get, () => fetchUser(), {
    enabled,
  })
}

export const useAddUser = () => {
  return useMutation(
    mutationKeys.add,
    (addUserRequest: AddSocUser) => addUser(addUserRequest),
    {
      onSuccess: (data) => {
        queryClient.setQueryData('user', data)
      },
    },
  )
}

export const useEditUser = () => {
  return useMutation(
    mutationKeys.edit,
    (editUserRequest: EditSocUser) => editUser(editUserRequest),
    {
      onSuccess: (data) => {
        queryClient.setQueryData('user', data)
      },
    },
  )
}
