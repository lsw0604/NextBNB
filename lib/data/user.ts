import { readFileSync, writeFileSync } from "fs";
import { StoredUsedType } from "../../types/user";

const getList = () => {
  const userBuffer = readFileSync("data/user.json");
  const userString = userBuffer.toString();

  if (!userString) {
    return [];
  }
  const users: StoredUsedType[] = JSON.parse(userString);
  return users;
};

const exist = ({ email }: { email: string }) => {
  const users = getList();
  return users.some((user) => user.email === email);
};

const write = async (users: StoredUsedType[]) => {
  writeFileSync("data/user.json", JSON.stringify(users));
};

export default { getList, exist, write };