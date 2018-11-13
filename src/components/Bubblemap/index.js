import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";

import mapData from "./china.json";

function getComponent(userData) {
  const cols = {
    longitude: {
      sync: true,
      range: [0, 1]
    },
    latitude: {
      sync: true,
      range: [0, 1]
    }
  };
  // 绘制世界地图背景
  const ds = new DataSet();
  const worldMap = ds.createView("back").source(mapData, {
    type: "GeoJSON"
  }); // 可视化用户数据

  
  const userDv = ds
    .createView()
    .source(userData)
    .transform({
      geoDataView: worldMap,
      field: "name",
      type: "geo.region",
      as: ["longitude", "latitude"]
    })
    .transform({
      type: "map",
      callback: function (obj) {
        obj.trend = obj.value;
        return obj;
      }
    });
  const xRange = worldMap.range("longitude");
  const yRange = worldMap.range("latitude");
  const ratio = (xRange[1] - xRange[0]) / (yRange[1] - yRange[0]);
  const h = window.innerHeight;
  const w = h * ratio;

  class App extends React.Component {
    constructor() {
      super();
      this.state = {
        width: 800,
        height: (800 - 80) / ratio,
        cols: {
          longitude: {
            sync: true,
            range: [0, 1]
          },
          latitude: {
            sync: true,
            range: [0, 1]
          }
        }
      };
    }

    componentDidMount() {
      const self = this;

      window.onresize = function () {
        const nw = parseInt(
          window.getComputedStyle(document.getElementById("mountNode"), null)[
          "width"
          ]
        );
        const nh = (nw - 80) / ratio; // 80 是 左边的 padding

        self.setState({
          width: nw,
          height: nh
        });
      };
    }

    render() {
      return (
        <Chart
          height={this.state.height}
          width={this.state.width}
          data
          scale={this.state.cols}
          padding={[0, 0, 0, 80]}
        >
          <Tooltip showTitle={false} />
          <Legend name="trend" position="left" />
          <View data={worldMap}>
            <Geom
              type="polygon"
              tooltip={false}
              position="longitude*latitude"
              style={{
                fill: "#fff",
                stroke: "#ccc",
                lineWidth: 1
              }}
            />
          </View>
          <View
            data={userDv}
            scale={{
              name: {
                alias: "区域"
              },
              trend: {
                alias: "用户"
              }
            }}
          >
            <Geom
              type="polygon"
              position="longitude*latitude"
              animate={{
                leave: {
                  animation: "fadeOut"
                }
              }}
              opacity="value"
              tooltip="name*trend"
              color={["trend", ["#C45A5A", "#14647D"]]}
              size={0}
            >
              <Label
                content="name"
                offset={0}
                textStyle={{
                  fill: "#545454",
                  fontSize: 10
                }}
              />
            </Geom>
          </View>
          <Geom
            type="polygon"
            position="x*y"
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
            color={["count", ["rgb(200, 200, 255)", "rgb(0, 0, 255)"]]}
          />
        </Chart>
      );
    }
  }
  return App;
}

class Bubblemap extends React.Component {

  userData = [
    {
      name: "青海",
      value: 86.8
    },
    {
      name: "广西",
      value: 106.3
    },
    {
      name: "贵州",
      value: 94.7
    },
    {
      name: "重庆",
      value: 98
    },
    {
      name: "北京",
      value: 98.4
    },
    {
      name: "福建",
      value: 97.2
    },
    {
      name: "安徽",
      value: 98.3
    },
    {
      name: "广东",
      value: 96.7
    },
    {
      name: "西藏",
      value: 95.8
    },
    {
      name: "新疆",
      value: 101.3
    },
    {
      name: "海南",
      value: 94.8
    },
    {
      name: "宁夏",
      value: 96.6
    },
    {
      name: "陕西",
      value: 86.3
    },
    {
      name: "山西",
      value: 102.1
    },
    {
      name: "湖北",
      value: 101.3
    },
    {
      name: "湖南",
      value: 107.6
    },
    {
      name: "四川",
      value: 99.9
    },
    {
      name: "云南",
      value: 130.1
    },
    {
      name: "河北",
      value: 106.5
    },
    {
      name: "河南",
      value: 93.4
    },
    {
      name: "辽宁",
      value: 101.4
    }
  ];


  render() {
    const App = getComponent(this.userData);
    return (
      <div>
        <App />
      </div>
    );
  }
}

export default Bubblemap;