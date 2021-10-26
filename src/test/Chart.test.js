import {render} from "@testing-library/react";
import {Chart} from "../components";

describe("Chart Component", () => {
    const dummyChartData = [
        {set: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], labels: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]}
    ]
    it('should rendered chart', () => {
        const {getByTestId} = render(<Chart dataList={dummyChartData} type="line"/>);
        const chart = getByTestId("chart");

        expect(chart).toBeTruthy();
    });
})

