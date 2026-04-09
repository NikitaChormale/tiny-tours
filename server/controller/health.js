 const getHome=(req, res) => {
  res.send("welcome to Tiny Tours");
};
const getHealth =(req, res) => {
 res.send({
  status: "ok",
  message: "server is healthy",
 });
}
export{getHome,getHealth};