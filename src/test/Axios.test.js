import {axiosInstance} from "../utils/axios";

describe('axios api request', () => {
    it('should have a response data', async () => {
        const reports = await axiosInstance.get('/').then(res => res.data);
        expect(reports).toBeTruthy()
        expect(Array.isArray(reports)).toBeTruthy();
    });

    it('should be able to get specific data', async () => {
        const params = {
            min: "2021-10-01T09:05",
            max: "2021-10-26T09:05"
        }
        const reports = await axiosInstance.get('/', {params}).then(res => res.data);

        expect(reports).toBeTruthy();
        expect(Array.isArray(reports)).toBeTruthy();
    });
})