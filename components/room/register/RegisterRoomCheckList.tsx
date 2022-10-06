import { isEmpty } from "lodash";
import React, { useMemo } from "react";
import styled from "styled-components";
import { useSelector } from "../../../store";
import RegisterRoomCheckStep from "./RegisterRoomCheckStep";
import RegisterRoomFooter from "./RegisterRoomFooter";
import RegisterRoomSubmitFooter from "./RegisterRoomSubmitFooter";

const Container = styled.div`
  padding: 62px 30px 100px;
  min-height: 100vh;
  .register-room-checklist-info {
    margin-bottom: 39px;
  }
  ul {
    display: inline-flex;
    flex-direction: column;
  }
`;

const RegisterRoomCheckList: React.FC = () => {
  const registerRoom = useSelector((state) => state.registerRoom);

  const isBuildingTypeActive = () => {
    const { 
      largeBuildingType, 
      buildingType, 
      roomType, 
      isSetUpForGuest, 
    } = registerRoom;

    if (
      !largeBuildingType || 
      !buildingType || 
      !roomType || 
      isSetUpForGuest === null
    ) {
      return false;
    }
    return true;
  };

  const isRoomTypeActive = useMemo(() => {
    const { 
      maximumGuestCount, 
      bedroomCount, 
      bedCount, 
      bedList, 
      publicBedList, 
    } = registerRoom;
    if (
      !isBuildingTypeActive ||
      !maximumGuestCount || 
      !bedroomCount || 
      !bedCount
    ) {
      return false;
    }
    return true;
  }, []);

  const isBathroomActive = useMemo(() => {
    const { bathroomCount, bathroomType } = registerRoom;
    if (!isRoomTypeActive ||!bathroomCount || bathroomType === null) {
      return false;
    }
    return true;
  }, []);

  const isLocationActive = useMemo(() => {
    const {
      latitude,
      longitude,
      country,
      city,
      district,
      streetAddress,
      detailAddress,
      postcode
    } = registerRoom;

    if (
      !isBathroomActive ||
      !latitude ||
      !longitude ||
      !country ||
      !city ||
      !district ||
      !streetAddress ||
      !postcode
    ) {
      return false;
    }
    return true;
  }, []);

  const isAmenitiesActive = useMemo(() => {
    const { amenities }= registerRoom;

    if (!isLocationActive) {
      return false;
    }
    return true;
  }, []);

  const isConveniencesActive = useMemo(() => {
    if (!isAmenitiesActive) {
      return false;
    }
    return true;
  }, []);

  const isPhotoActive = useMemo(() => {
    const { photos } = registerRoom;

    if (!isConveniencesActive || isEmpty(photos)) {
      return false;
    }
    return true;
  }, []);

  const isDescriptionActive = useMemo(() => {
    const { description } = registerRoom;
    if (!isPhotoActive || !description) {
      return false;
    }
    return true;
  }, []);

  const isTitleActive = useMemo(() => {
    const { title } = registerRoom;
    if (!isDescriptionActive || !title) {
      return false;
    }
    return true;
  }, []);

  const isPriceActive = useMemo(() => {
    const { price } = registerRoom;
    if (!isTitleActive || !price) {
      return false;
    }
    return true;
  }, []);

  const isDateActive = useMemo(() => {
    const { startDate, endDate } = registerRoom;
    if (!isPriceActive || !startDate || !endDate) {
      return false;
    }
    return true;
  }, []);

  const stepInProgress = useMemo(() => {
    if (!isBuildingTypeActive) {
      return "building";
    }
    if (!isRoomTypeActive) {
      return "bedrooms";
    }
    if (!isBathroomActive) {
      return "bathroom";
    }
    if (!isLocationActive) {
      return "location";
    }
    if (!isAmenitiesActive) {
      return "amenities";
    }
    if (!isConveniencesActive) {
      return "conveniences";
    }
    if (!isPhotoActive) {
      return "photo";
    }
    if (!isDescriptionActive) {
      return "description";
    }
    if (!isTitleActive) {
      return "title";
    }
    if (!isPriceActive) {
      return "price";
    }
    if (!isDateActive) {
      return "date";
    }
    return ""
  }, []);

  return (
    <Container>
      <p className="register-room-checklist-info">
        숙소를 등록한 후 언제든 숙소를 수정할 수 있습니다.
      </p>
      <ul>
        <RegisterRoomCheckStep
          step="숙소유형"
          href="/room/register/building"
          disabled={!isBuildingTypeActive}
          inProgress={stepInProgress === "building"}
        />
        <RegisterRoomCheckStep
          step="숙소종류"
          href="/room/register/bedrooms"
          disabled={!isRoomTypeActive}
          inProgress={stepInProgress === "bedrooms"}
        />
        <RegisterRoomCheckStep
          step="욕실"
          href="/room/register/bathroom"
          disabled={!isBathroomActive}
          inProgress={stepInProgress === "bathroom"}
        />
        <RegisterRoomCheckStep
          step="위치"
          href="/room/register/location"
          disabled={!isLocationActive}
          inProgress={stepInProgress === "location"}
        />
        <RegisterRoomCheckStep
          step="편의 시설"
          href="/room/register/amenities"
          disabled={!isAmenitiesActive}
          inProgress={stepInProgress === "amenities"}
        />
        <RegisterRoomCheckStep
          step="공용공간"
          href="/room/register/convenience"
          disabled={!isConveniencesActive}
          inProgress={stepInProgress === "conveniences"}
        />
        <RegisterRoomCheckStep
          step="사진"
          href="/room/register/photo"
          disabled={!isPhotoActive}
          inProgress={stepInProgress === "photo"}
        />
        <RegisterRoomCheckStep
          step="설명"
          href="/room/register/description"
          disabled={!isDescriptionActive}
          inProgress={stepInProgress === "description"}
        />
        <RegisterRoomCheckStep
          step="제목"
          href="/room/register/title"
          disabled={!isTitleActive}
          inProgress={stepInProgress === "title"}
        />
        <RegisterRoomCheckStep
          step="요금"
          href="/room/register/price"
          disabled={!isPriceActive}
          inProgress={stepInProgress === "price"}
        />
        <RegisterRoomCheckStep
          step="예약 날짜"
          href="/room/register/date"
          disabled={!isDateActive}
          inProgress={stepInProgress === "date"}
        />
      </ul>
      {isDateActive ? (
        <RegisterRoomSubmitFooter />
      ) : (
        <RegisterRoomFooter 
          prevHref="/room/register/date"
          nextHref={`/room/register/${stepInProgress}`}
        />
      )}
    </Container>
  );
};

export default RegisterRoomCheckList;