import request from '@/utils/request';

export async function getProvince() {
  return request('/api/cascader/province');
}

export async function getCity(province) {
  return request(`/api/cascader/city/${province}`);
}

export async function getArea(city) {
  return request(`/api/cascader/area/${city}`);
}
