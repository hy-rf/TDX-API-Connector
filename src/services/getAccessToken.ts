import database from "./database";
export default async function getAccessToken() {
  const db = database();
  const today = new Date();
  const dayToStore = `${today.getFullYear()}-${today.getMonth() + 1
    }-${today.getDate()}`;
  const tokenInfo = db.collection("setting").doc(dayToStore);
  if (!(await tokenInfo.get()).data()) {
    return "No token";
  }
  return (await tokenInfo.get()).data();
}
