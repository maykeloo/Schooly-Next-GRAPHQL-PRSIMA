import jwt_decode from "jwt-decode";

interface JWT {
  exp: string;
  iat: string;
  userId: string;
}

const getToken = async () => {
  const token = await localStorage.getItem("token");
  try {
    if (token) return jwt_decode(token) as JWT;
  } catch (error) {
    return null;
  }
};

export default getToken;
