import { NewError, ErrorType } from "./errorsManagers.Middlewares.js";
export async function validAdmin(req) {
  if (req.user.role === "admin") {
    req["isAdmin"] = true;
    return true;
  } else {
    req["isAdmin"] = false;
    return false;
  }
}
export async function validPremium(req) {
  if (req.user.role === "premium") {
    req["isPremium"] = true;
    return true;
  } else {
    req["isPremium"] = false;
    return false;
  }
}
export async function validAdminAndPremium(req, res, next) {
  try {
    await validAdmin(req);
    await validPremium(req);
    if (req.isPremium || req.isAdmin) {
      return next();
    } else {
      throw new NewError(ErrorType.UNAUTHORIZED_USER, "UNAUTHORIZED USER ");
    }
  } catch (error) {
    next(error);
  }
}
