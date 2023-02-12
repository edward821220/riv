import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  src: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    src: "https://storage.googleapis.com/meshmallow-dev/temp/demo.mp4",
  });
}
