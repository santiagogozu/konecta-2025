import {authenticateUser} from "../service/authService.js";

export const login = async (req, res) => {
  const {correo, password} = req.body;
  const result = await authenticateUser(correo, password);

  if (!result.success) {
    return res.status(401).json({message: result.message});
  }

  res.json({token: result.token, rol: result.rol});
};
