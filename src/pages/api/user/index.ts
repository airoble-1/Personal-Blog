import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { getToken } from "next-auth/jwt";

export default nc().get(async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  const user = await prisma.user.findFirst({
    where: {
      id: token.id,
    },
  });
  res.json({ user });
});
