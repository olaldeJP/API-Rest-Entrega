import { NewError, ErrorType } from "./errorsManagers.Middlewares.js";
export async function validAdmin(req) {
  if (req.user.role === "admin") {
    return true;
  } else {
    return false;
  }
}
export async function validPremium(req) {
  if (req.user.role === "premium") {
    req["isPremium"] = true;
  } else {
    req["isPremium"] = false;
  }
}
export async function validAdminAndPremium(req, res, next) {
  try {
    await validAdmin(req);
    await validPremium(req);
    if (req.isPremium || req.isAdmin) {
      next();
    } else {
      throw new NewError(ErrorType.UNAUTHORIZED_USER, "UNAUTHORIZED USER ");
    }
  } catch (error) {
    next(error);
  }
}
