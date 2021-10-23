import {render} from "@testing-library/react";
import {Input} from "../components";

describe("Input Component", () => {
    it('should rendered input', function () {
        const {getByTestId} = render(<Input/>);
        const input = getByTestId("input");
        expect(input).toBeTruthy();
    });


    it('should have type', () => {
        const {getByTestId} = render(<Input type={'text'}/>);
        const input = getByTestId("input");
        expect(input.type).toEqual('text');
    });
})

