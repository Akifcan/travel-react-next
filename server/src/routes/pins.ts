import { Router, Response, Request } from "express";
import Pin, { IPin } from "../models/Pin";
import { staticMapApi } from "../helpers";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const pins = await Pin.create(req.body);
    res.status(201).json(pins);
  } catch (error) {
    console.log(error);
    throw new Error("Error");
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    if (req.query.staticMap) {
      const lookup = await Pin.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "username",
            foreignField: "username",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            title: 1,
            desc: 1,
            username: 1,
            createdAt: 1,
            _id: 0,
            lat: 1,
            long: 1,
            user: {
              _id: 1,
              avatar: 1,
            },
          },
        },
      ]);
      const pins = lookup.map((pin) => {
        return Object.assign({ mapUrl: staticMapApi(pin.long, pin.lat) }, pin);
      });
      res.status(200).json(pins);
    } else {
      res.status(200).json(await Pin.find());
    }
  } catch (error) {
    throw new Error("Error");
  }
});

export default router;
