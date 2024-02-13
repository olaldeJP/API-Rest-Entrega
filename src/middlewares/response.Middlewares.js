export async function respuestasMejoradas(req, res, next) {
  res["created"] = (payload) => {
    res.status(201).json({ status: "success", payload });
  };
  res["result"] = (payload) => {
    res.status(200).json({ status: "success", payload });
  };
  res["accepted"] = () => {
    res.status(202).json({ status: "success" });
  };
  next();
}
