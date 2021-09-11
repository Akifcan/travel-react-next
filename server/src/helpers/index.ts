import { Model } from "mongoose";

export const isImage = (type: string): boolean => {
  if (type.includes("image")) return true;
  else return false;
};

export const isUnique = async (
  schema: Model<any>,
  query: Object
): Promise<boolean> => {
  const result = await schema.findOne(query);
  console.log(result);
  if (result) {
    return false;
  } else {
    return true;
  }
};

export const staticMapApi = (long: number, lat: number) => {
  const api_key: string =
    "pk.eyJ1IjoiYWtpZmNhbiIsImEiOiJjazZhMWZxaDQwMHh2M2twaTRqenJ6M3VuIn0.mbCFqcaQPilg3aWu_l0V6Q";
  return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${long},${lat},8,0/600x600?access_token=${api_key}`;
};
