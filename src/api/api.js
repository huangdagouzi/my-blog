import { get } from './axios';

export const getBlogsList = (p) => get(`/front/list?${p}`);//查询博客列表
export const getBanner = () => get(`/front/banner`);//查询banner