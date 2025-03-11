export const generateToken = (user, message, statusCode, res) => {
  const cookieExpireDays = Number(process.env.COOKIE_EXPIRE) || 7; // Default to 7 days if missing

  const token = user.generateJsonWebToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
