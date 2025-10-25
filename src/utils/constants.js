export const BASE_URL =
  location.hostname === "localhost"
    ? "http://localhost:3001"
    : import.meta.env.VITE_API_URL;

export const LOGO =
  "https://static.whatsapp.net/rsrc.php/v4/yc/r/hUUuVTz6ZVi.png";
