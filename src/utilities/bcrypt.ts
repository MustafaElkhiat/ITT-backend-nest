/**
 * @Project : backend-nest
 * @File : src/utilities/bcrypt.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/15/2023
 * @Time : 1:08 PM
 */
import * as bcrypt from 'bcrypt';

export const encodePassword = async (rawPassword: string) => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(rawPassword, salt);
};
export const validatePassword = (rawPassword: string, hashedPassword: string) =>
  bcrypt.compareSync(rawPassword, hashedPassword);
