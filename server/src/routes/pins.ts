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
  console.log(req.query);
  if (req.query.staticMap) {
    const pins = await Pin.find().map((parent) => {
      return parent.map((pin: any | IPin) => {
        return Object.assign(
          { mapUrl: staticMapApi(pin.long, pin.lat) },
          pin._doc
        );
      });
    });
    res.status(200).json(pins);
  } else {
    try {
      res.status(200).json(await Pin.find());
    } catch (error) {
      console.log(error);
      throw new Error("Error");
    }
  }
});

export default router;
