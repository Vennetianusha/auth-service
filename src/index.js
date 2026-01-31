require("dotenv").config();
const app = require("./app");

const PORT = process.env.API_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
