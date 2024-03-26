import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import * as fs from 'fs';

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 min from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(payload: {username:string, password: string}) {
  // Verify credentials && get the user
  const rawJson = fs.readFileSync('users.json', 'utf8')
  const jsonData = JSON.parse(rawJson)

  const user = jsonData.users.filter((item: {name:string}) => item.name === payload.username)[0]
  if (user && user.password !== payload.password) {
    return null
  }

  // Create the session
  const expires = new Date(Date.now() + 60 * 1000);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });

  return user
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  else {
    const user = await decrypt(session)
    return user
  }
}

export async function signUp(payload: any) {
  const rawJson = fs.readFileSync('users.json', 'utf8')
  const jsonData = JSON.parse(rawJson)

  jsonData.users.push(payload)
  fs.writeFileSync('users.json', JSON.stringify(jsonData))
  
  return 'success'
}

export async function updateUser(payload: any) {
  //Get db
  const rawJson = fs.readFileSync('users.json', 'utf8')
  const jsonData = JSON.parse(rawJson)

  // Search User
  const user = jsonData.users.filter((item: {name:string}) => item.name === payload.name_old)[0]
  if (user && user.password !== payload.password_old) {
    return null
  }

  // Update User
  const index = jsonData.users.findIndex((item: {name:string}) => item.name === payload.name_old)
  jsonData.users[index] = {
    name: payload.name,
    phone: payload.phone,
    password: payload.password_new
  }
  fs.writeFileSync('users.json', JSON.stringify(jsonData))

  // Update Session
  const response = await login({ username: payload.name, password: payload.password_new})
  return response
}