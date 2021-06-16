import React, { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { View } from "react-native";
import { Text } from "react-native-elements";
import Animated, { Easing } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { ImageButton } from "../../components/Button";
import { Frame } from "../../components/Wrapper";
import { sizes } from "../../constants";
import {
  cleanTrashItem,
  clearAllTrashItems,
  createTrashItem,
} from "../../redux/actions/trashItems";
import { IconManager, ImageManager } from "../../utils/image";

const calcMarginVertical = (flex) => {
  return (sizes.short * flex) / 5;
};

const calcMarginHorizontal = (flex) => {
  return (sizes.long * flex) / 5;
};

const Trash = ({
  trashKey,
  onPress,
  onChangeStateLanding,
  left,
  stopBottom,
  image,
}) => {
  const initialBottom = 5;
  const bottomAnim = useRef(
    new Animated.Value(calcMarginVertical(initialBottom))
  ).current;

  let isLanding = false;

  useEffect(() => {
    animate();
  }, [bottomAnim]);

  const animate = () => {
    bottomAnim.setValue(calcMarginVertical(initialBottom));
    Animated.timing(bottomAnim, {
      toValue: calcMarginVertical(stopBottom),
      duration: 2000,
      easing: Easing.linear,
    }).start(() => {
      // console.log(bottomAnim);
      isLanding = true;
      onChangeStateLanding(isLanding);
    });
  };

  return (
    <Animated.View
      style={{ position: "absolute", bottom: bottomAnim, left: left }}
    >
      <ImageButton
        small
        source={image}
        onPress={() => {
          onPress(trashKey);

          isLanding = false;
          onChangeStateLanding(isLanding);
        }}
      />
    </Animated.View>
  );
};

const TrashRain = ({ countLandingItems, setCountLandingItems }) => {
  const dispatch = useDispatch();
  // const [trashItems, setTrashItems] = useState([]);
  const trashItems = useSelector((state) => state.trashItems);

  const [count, setCount] = useState(0);

  const limitLandingItems = 10;

  // const trashItemsRef = useRef();
  // trashItemsRef.current = trashItems;

  const countLandingRef = useRef();
  countLandingRef.current = countLandingItems;

  useEffect(() => {
    if (countLandingItems == limitLandingItems) {
      Alert.alert("Thong bao", "Game over!");
      return;
    }

    const interval = setInterval(() => {
      console.log(countLandingItems);
      if (countLandingItems < limitLandingItems) createItems();
      else return;
    }, 500);

    return () => clearInterval(interval);
  }, [trashItems]);

  useEffect(() => {}, []);

  const cleanTrash = (index) => {
    // const newTrashItems = trashItemsRef.current.filter(
    //   (item) => item.key != index
    // );
    // console.log(newTrashItems);

    dispatch(cleanTrashItem(index));
  };

  const handleChangeStateLanding = (isLanding) => {
    if (countLandingItems < limitLandingItems) {
      // why 0 0 0 0 1 2 ... ???
      // console.log(countLandingItems);
      if (isLanding) setCountLandingItems(countLandingRef.current + 1);
      else setCountLandingItems(countLandingRef.current - 1);
    }
  };

  const getRandomTrashIcon = () => {
    var keys = Object.keys(IconManager.trash);
    return IconManager.trash[keys[(keys.length * Math.random()) << 0]];
  };

  const createItems = () => {
    setCount(count + 1);
    const imagePath = getRandomTrashIcon();

    const randomHorizontal = Math.random() * 4.5;
    const trashLeft = calcMarginHorizontal(randomHorizontal);

    const minPos = 0;
    const maxPos = 2;
    const stopBottom = Math.random() * (maxPos - minPos) + minPos;

    const newTrashItem = {
      component: (
        <Trash
          key={count}
          trashKey={count}
          onPress={(trashKey) => cleanTrash(trashKey)}
          onChangeStateLanding={(isLanding) =>
            handleChangeStateLanding(isLanding)
          }
          left={trashLeft}
          stopBottom={stopBottom}
          image={imagePath}
        />
      ),
      key: count,
    };

    dispatch(createTrashItem(newTrashItem));
    // setTrashItems([...trashItems, newTrashItem]);
  };

  return (
    <View style={{ width: "100%", height: "100%" }}>
      {trashItems.map((item) => item.component)}
    </View>
  );
};

const TrashGame = ({ navigation }) => {
  const [countLandingItems, setCountLandingItems] = useState(0);

  const dispatch = useDispatch();

  return (
    <Frame background={ImageManager.ground}>
      <View
        style={{
          position: "absolute",
          top: calcMarginVertical(0),
          left: calcMarginHorizontal(0),
          margin: 16,
        }}
      >
        <ImageButton
          small
          source={IconManager.back}
          onPress={() => {
            navigation.goBack();
            dispatch(clearAllTrashItems());
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          top: calcMarginVertical(0),
          right: calcMarginHorizontal(0),
          marginRight: 16,
        }}
      >
        <Text
          style={{ fontSize: 48, fontWeight: "bold" }}
        >{`${countLandingItems}/10`}</Text>
      </View>
      {/* {TrashRain()} */}
      <TrashRain
        countLandingItems={countLandingItems}
        setCountLandingItems={setCountLandingItems}
      />
    </Frame>
  );
};

export default TrashGame;
