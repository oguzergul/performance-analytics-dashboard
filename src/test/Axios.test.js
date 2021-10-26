import {axiosInstance} from "../utils/axios";

describe('axios api request', () => {
    it('should have a response data', function () {
        axiosInstance.get('/').then(res => {
            expect(res.data).toBeTruthy()
        })
    });

    it('should be abel to get specific data', function () {
        const min = "2021-10-01T09:05";
        const max = "2021-10-26T09:05";
        axiosInstance.get('/', {
            params: {
                min: min,
                max: max
            }
        }).then(res => {
            expect(res.data).toBeTruthy();
            expect(typeof res.data).toBe('object');
        })
    });
})