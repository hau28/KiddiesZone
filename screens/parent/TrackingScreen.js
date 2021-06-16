import React, { useRef, useState } from "react";

import { colors, sizes } from "../../constants";
import {
  Card,
  Impress,
  Row,
  ScreenView,
  Space,
  RoundImpress,
} from "../../components/Wrapper";
import { TextInput } from "../../components/TextInput";
import { AutoIcon, Button, ImageButton } from "../../components/Button";
import { HorizontalList } from "../../components/HorizontalList";
import Carousel from "react-native-snap-carousel";
import { View, Text } from "react-native";
import {
  Heading2,
  Heading3,
  Body,
  Heading1,
} from "../../components/Typography";
import { IconManager } from "../../utils/image";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { hexToRgba } from "../../utils/color";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const dummyArray = ["item1", "item2", "item3"];

const children = [
  {
    age: 5,
    gender: "male",
    name: "Ngô Công Hậu",
    height: "120",
    weight: "35",
  },
  {
    age: 3,
    gender: "female",
    name: "Phan Huy Tiến",
    height: "110",
    weight: "53",
  },
];

const history = [
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
];
export const TrackingScreen = ({ navigation }) => {
  const carouselChild = useRef();
  const carouselHeight = useRef();
  const carouselWeight = useRef();
  const [scheme, setScheme] = useState(colors.blue);
  const historyItem = ({ item }) => {
    return (
      <View
        style={{
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginTop: sizes.base,
            alignSelf: "stretch",
            height: 1,
            backgroundColor: colors.white50,
            marginBottom: sizes.base / 2,
          }}
        />
        <TouchableOpacity
          style={{
            alignItems: "center",
          }}
        >
          <Space tight>
            <Heading2 color={colors.white50}>{item.date}</Heading2>
            <Row>
              <Space>
                <Space tight>
                  <AutoIcon
                    white
                    source={IconManager.height}
                    height={sizes.h2 - 6}
                  />
                  <Body style={{ color: colors.white }}>{item.height}</Body>
                </Space>
                <Space tight>
                  <AutoIcon
                    white
                    source={IconManager.weight}
                    height={sizes.h2 - 6}
                  />
                  <Body style={{ color: colors.white }}>{item.height}</Body>
                </Space>
              </Space>
            </Row>
          </Space>
        </TouchableOpacity>
      </View>
    );
  };
  const childCard = ({ item, index }) => {
    return (
      <View
        style={{
          justifyContent: "center",
        }}
      >
        <View
          style={{
            borderRadius: sizes.base,
            backgroundColor: item.gender === "male" ? colors.blue : colors.pink,
            padding: sizes.base,
            alignItems: "center",
            paddingVertical: sizes.base * 2,
          }}
        >
          <ImageButton
            color={colors.white}
            source={IconManager.roundadd}
            height={46}
            containerStyle={{
              position: "absolute",
              alignSelf: "flex-end",
              padding: sizes.base * 1.5,
            }}
          />
          <Space>
            <RoundImpress>
              <Heading1>{item.age}</Heading1>
            </RoundImpress>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Space tight>
                <AutoIcon
                  white
                  source={IconManager[item.gender]}
                  height={sizes.h2 - 4}
                />
                <Heading2 white>{item.name}</Heading2>
              </Space>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Space loose>
                <Space tight>
                  <AutoIcon
                    white
                    source={IconManager.height}
                    height={sizes.h2 - 6}
                  />
                  <Body white>{`${item.height}cm`}</Body>
                </Space>
                <Space tight>
                  <AutoIcon
                    white
                    source={IconManager.weight}
                    height={sizes.h2 - 6}
                  />
                  <Body white>{`${item.weight}kg`}</Body>
                </Space>
              </Space>
            </View>
          </Space>
        </View>
      </View>
    );
  };
  const heightChart = ({ item, index }) => {
    return (
      <LineChart
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              data: [
                Math.random() * 160,
                Math.random() * 160,
                Math.random() * 160,
                Math.random() * 160,
                Math.random() * 160,
                Math.random() * 160,
              ],
            },
          ],
        }}
        width={sizes.short - sizes.base * 2} // from react-native
        height={220}
        chartConfig={{
          backgroundGradientFrom: colors.white,
          backgroundGradientTo: colors.white,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: () => hexToRgba(scheme, 1),
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginLeft: -sizes.base / 2,
          borderRadius: 16,
        }}
      />
    );
  };
  const weightChart = ({ item, index }) => {
    return (
      <LineChart
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              data: [
                Math.random() * 50,
                Math.random() * 50,
                Math.random() * 50,
                Math.random() * 50,
                Math.random() * 50,
                Math.random() * 50,
              ],
            },
          ],
        }}
        width={sizes.short - sizes.base * 2} // from react-native
        height={220}
        chartConfig={{
          backgroundGradientFrom: colors.white,
          backgroundGradientTo: colors.white,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: () => hexToRgba(scheme, 1),
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginLeft: -sizes.base / 2,
          borderRadius: 16,
        }}
      />
    );
  };
  const handleSelectChild = (index) => {
    if (children[index].gender === "male") {
      setScheme(colors.blue);
    }
    if (children[index].gender === "female") {
      setScheme(colors.pink);
    }
  };
  return (
    <ScreenView isMainScreen title="Sức khỏe" navigation={navigation}>
      <Space>
        <Carousel
          ref={(c) => {
            carouselChild.current = c;
          }}
          data={children}
          renderItem={childCard}
          sliderWidth={sizes.short - sizes.base * 2}
          itemWidth={sizes.short - sizes.base * 2}
          onSnapToItem={handleSelectChild}
        />
        <Card title="Chỉ số BMI" style={{ alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: sizes.base * 1.5,
            }}
          >
            <View style={{ alignItems: "center", marginRight: sizes.base * 4 }}>
              <Impress color={scheme}>
                <Heading3 white>20,1</Heading3>
              </Impress>
              <Heading3 style={{ color: scheme }}>Bình thường</Heading3>
            </View>
            <AutoIcon
              color={scheme}
              source={IconManager.bmi.normal}
              height={120}
            />
          </View>
          <Body>
            Chỉ số BMI còn được gọi là chỉ số khối lượng cơ thể (Body Mass
            Index). Dựa vào chỉ số BMI của một người có thể biết được người đó
            béo, gầy hay có cân nặng lý tưởng. Được đề ra lần đầu tiên vào năm
            1832 bởi một nhà khoa học người Bỉ.
          </Body>
        </Card>
        <Card bgColor={scheme} title="Lịch sử cập nhật">
          <FlatList
            data={history}
            renderItem={historyItem}
            keyExtractor={(item) => item.id}
            style={{ height: 250 }}
          />
          <ImageButton
            color={colors.white}
            source={IconManager.roundadd}
            height={46}
            containerStyle={{
              position: "absolute",
              alignSelf: "flex-end",
              padding: sizes.base * 1.5,
            }}
          />
        </Card>
        <Card style={{ alignItems: "center" }}>
          <Space>
            <Row
              style={{
                alignSelf: "stretch",
                justifyContent: "space-between",
              }}
            >
              <Heading1 style={{ color: scheme }}>2021</Heading1>
              <Body style={{ color: scheme, fontSize: sizes.h3 }}>
                Chiều cao
              </Body>
            </Row>
            <Carousel
              ref={(c) => {
                carouselHeight.current = c;
              }}
              data={dummyArray}
              renderItem={heightChart}
              sliderWidth={sizes.short - sizes.base * 2}
              itemWidth={sizes.short - sizes.base * 2}
            />
          </Space>
        </Card>
        <Card style={{ alignItems: "center" }}>
          <Space>
            <Row
              style={{
                alignSelf: "stretch",
                justifyContent: "space-between",
              }}
            >
              <Heading1 style={{ color: scheme }}>2021</Heading1>
              <Body style={{ color: scheme, fontSize: sizes.h3 }}>
                Cân nặng
              </Body>
            </Row>
            <Carousel
              ref={(c) => {
                carouselWeight.current = c;
              }}
              data={dummyArray}
              renderItem={weightChart}
              sliderWidth={sizes.short - sizes.base * 2}
              itemWidth={sizes.short - sizes.base * 2}
            />
          </Space>
        </Card>
      </Space>
    </ScreenView>
  );
};

export default TrackingScreen;
