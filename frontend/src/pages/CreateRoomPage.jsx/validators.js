import * as Yup from 'yup';

export const CreateRoomSchema = Yup.object().shape({
  nickname: Yup.string().required(),
});
