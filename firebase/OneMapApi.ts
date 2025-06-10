export const getToken = () => {
  const url = "https://www.onemap.gov.sg/api/auth/post/getToken";

  // Prepare the data payload
  const data = {
    email: process.env.ONEMAP_EMAIL,
    password: process.env.ONEMAP_EMAIL_PASSWORD,
  };
  return fetch(url, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    method: "POST",
  });
};
export const getLongLat = (location: string, token: string) => {
  const url = `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${location}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `${token}`, // API token for authorization
    },
  });
};
