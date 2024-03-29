import React, { useMemo, useState } from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";

import { bedTypes } from "../../../lib/staticData";
import { BedType } from "../../../types/room";

import Button from "../../common/Button";
import Selector from "../../common/Selector";
import Counter from "../../common/Counter";

import { useDispatch } from "react-redux";
import { registerRoomActions } from "../../../store/registerRoom";

const Container = styled.li`
  width: 100%;
  padding: 28px 0;
  border-top: 1px solid ${palette.gray_dd};
  &:last-child {
    border-bottom: 1px solid ${palette.gray_dd};
  }
  
  .register-room-bed-type-top {
    display: flex;
    justify-content: space-between;
  }
  .register-room-bed-type-bedroom {
    font-size: 19px;
    color: ${palette.gray_48};
  }
  .register-room-bed-type-selector-wrapper {
    margin-top: 28px;
    width: 320px;
  }
  .register-room-bed-type-counters {
    width: 320px;
    margin-top: 28px;
  }
  .register-room-bed-type-counter {
    width: 290px;
    margin-bottom: 18px;
  }
  .register-room-bed-type-bedroom-counts {
    font-size: 19px;
    color: ${palette.gray_76};
    max-width: 240px;
    word-break: keep-all;
  }
`;

interface IProps {
  bedroom: { 
    id: number; 
    beds: { 
      type: BedType; 
      count: number; 
    }[]
  }
};

const RegisterRoomBedTypes: React.FC<IProps> = ({ bedroom }) => {
  const [opened, setOpened] = useState(false);
  const initialBedOptions = bedroom.beds.map((bed) => bed.type);
  const [activeBedOptions, setActiveBedOptions] = useState<BedType[]>(
    initialBedOptions
  );
  const dispatch = useDispatch();

  const lastBedOptions = useMemo(() => {
    return bedTypes.filter((bedType) => !activeBedOptions.includes(bedType));
  }, [activeBedOptions, bedroom]);

  const bedsText = useMemo(() => {
    const texts = bedroom.beds.map((bed) => `${bed.type} ${bed.count}개`);
    return texts.join(",");
  }, [bedroom]);

  console.log("activeBedOptions : ", activeBedOptions);

  const totalBedsCount = useMemo(() => {
    let total = 0;
    bedroom.beds.forEach((bed) => {
      total += bed.count;
    });
    return total;
  }, [bedroom]);

  const toggleOpened = () => setOpened(!opened);  
  
  const onChangeBedTypeCount = (value: number, type: BedType) =>
    dispatch(
      registerRoomActions.setBedTypeCount({
        bedroomId: bedroom.id,
        type,
        count: value,
      })
    );

  return (
    <Container>
      <div className="register-room-bed-type-top">
        <div className="register-room-bed-type-bedroom-texts">
          <p className="register-room-bed-type-bedroom">{bedroom.id}번 침실</p>
          <p className="register-room-bed-type-bedroom-counts">
             침대 {totalBedsCount} 개<br />
             {bedsText}
          </p>
        </div>
        <Button onClick={toggleOpened} width="161px">
          {opened && "완료"}
          {!opened && (totalBedsCount === 0 ? "침대 추가하기" : "침대 수정하기")}
        </Button>
      </div>
      {opened && (
        <div className="register-room-bed-type-selector-wrapper">
          {activeBedOptions.map((type) => (
            <div className="register-room-bed-type-counter" key={type}>
              <Counter 
                label={type}
                value={
                  bedroom.beds.find((bed) => bed.type === type)?.count || 0
                }
                key={type}
                onChange={(value) => {
                  onChangeBedTypeCount(value, type)
                }}
              />
            </div>
          ))}
          <Selector
            type="register"
            options={lastBedOptions}
            defaultValue="다른 침대 추가"
            value="다른 침대 추가"
            disabledOptions={["다른 침대 추가"]}
            useValidation={false}
            onChange={(e) =>
              setActiveBedOptions([
                ...activeBedOptions,
                e.target.value as BedType,
              ])
            }
          />
        </div>
      )}
    </Container>
  );
};

export default RegisterRoomBedTypes;