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
        obj.percent = obj.percent;
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

      // window.onresize = function () {

      //   const getStyle = (element, attr) => {
      //     if (element.currentStyle) {
      //       return element.currentStyle[attr];
      //     } else {
      //       return getComputedStyle(element, false)[attr];
      //     }
      //   }

      //   let width = getStyle(document.getElementById("mountNode"),'width');
      //   const nw = parseInt(width);
      //   const nh = (nw - 80) / ratio; // 80 是 左边的 padding

      //   self.setState({
      //     width: nw,
      //     height: nh
      //   });
        
      // };
    }

     

    render() {
      return (
        <Chart
          height={this.state.height}
          width={this.state.width}
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
              },
              percent: {
                alias: "占比"
              },
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
              tooltip="name*trend*percent"
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

  render() {

    const { userData } = this.props;
    const App = getComponent(userData);
    return (
      <div>
        <App />
      </div>
    );
  }
}

export default Bubblemap;