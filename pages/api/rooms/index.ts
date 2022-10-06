import { NextApiResponse, NextApiRequest } from "next";
import isEmpty from "lodash/isEmpty";
import { StoredRoomType } from "../../../types/room";
import Data from "../../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const {
        largeBuildingType,
        buildingType,
        roomType,
        isSetUpForGuestCount,
        maximumGuestCount,
        bedroomCount,
        bedCount,
        bedList,
        publicBedList,
        bathroomCount,
        bathroomType,
        latitude,
        longitude,
        country,
        city,
        district,
        streetAddress,
        detailAddress,
        postcode,
        amenities,
        convenience,
        photos,
        description,
        title,
        price,
        startDate,
        endDate,
        hostId
      } = req.body;
      if (
        !largeBuildingType ||
        !buildingType ||
        !roomType ||
        isSetUpForGuestCount === null ||
        !maximumGuestCount ||
        !bedroomCount ||
        !bedCount ||
        !bedList ||
        !publicBedList ||
        !bathroomCount ||
        bathroomType === null ||
        !latitude ||
        !longitude ||
        !country ||
        !city ||
        !district ||
        !streetAddress ||
        (detailAddress !== "" && !detailAddress) ||
        !postcode ||
        !amenities ||
        !convenience ||
        !photos ||
        !description ||
        !title ||
        !price ||
        !startDate ||
        !endDate ||
        !hostId
      ) {
        res.statusCode = 400;
        res.send("필수 값이 없습니다.");
      }
      const rooms = Data.room.getList();
      if (isEmpty(rooms)) {
        const newRoom: StoredRoomType = {
          id: 1,
          ...req.body,
          createAt: new Date(),
          updateAt: new Date(),
        };
        Data.room.write([newRoom]);
        res.statusCode = 201;
        return res.end();
      }
      const newRoom: StoredRoomType = {
        id: rooms[rooms.length - 1].id + 1,
        ...req.body,
        createAt: new Date(),
        updateAt: new Date(),
      }
      Data.room.write([...rooms, newRoom]);
      res.statusCode = 201;
      res.end();
    } catch (e) {
      console.log(e);
      return res.send(e.message);
    }
  } 
  res.statusCode = 405;
  return res.end();
};