
import province from './cascader/province.json';
import city from './cascader/city.json';
import area from './cascader/area.json';

function getProvince(req, res) {
  return res.json(province);
}

function getCity(req, res) {
  let result = [];
  for(let i = 0; i < city.length; i++){
    if (city[i].provinceCode == req.params.province){
      result.push(city[i]);
    }
  }
  return res.json(result);
}

function getArea(req, res) {
  let result = [];
  for (let i = 0; i < area.length; i++) {
    if (area[i].cityCode == req.params.city) {
      result.push(area[i]);
    }
  }
  return res.json(result);
}

export default {
  'GET /api/cascader/province': getProvince,
  'GET /api/cascader/city/:province': getCity,
  'GET /api/cascader/area/:city': getArea,
};
