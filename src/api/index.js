import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

export const UserData = query => {
    return request({
        url: './user.json',
        method: 'get',
        params: query
    });
};
export const UserMData = query => {
    return request({
        url: './userm.json',
        method: 'get',
        params: query
    });
};
export const Table0Data = query => {
    return request({
        url: './可视化管理首页.json',
        method: 'get',
        params: query
    });
};
export const Table1Data = query => {
    return request({
        url: './数据源管理.json',
        method: 'get',
        params: query
    });
};
export const Table2Data = query => {
    return request({
        url: './数据项管理.json',
        method: 'get',
        params: query
    });
};
export const Table3Data = query => {
    return request({
        url: './可视化查看.json',
        method: 'get',
        params: query
    });
};
export const Table4Data = query => {
    return request({
        url: './可视化数据项.json',
        method: 'get',
        params: query
    });
};
export const GraphData = query => {
    return request({
        url: './graph.json',
        method: 'get',
        params: query
    });
};
export const testData = query => {
    return request({
        url: './test.json',
        method: 'get',
        params: query
    });
};