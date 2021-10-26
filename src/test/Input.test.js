import {render} from "@testing-library/react";
import {Input} from "../components";

describe("Input Component", () => {
    it('should rendered input', function () {
        const {getByTestId} = render(<Input/>);
        const input = getByTestId("input");

        expect(input).toBeTruthy();
    });


    it('should have type prop', () => {
        const {getByTestId} = render(<Input type={'text'}/>);
        const input = getByTestId("input");

        expect(input.type).toBeTruthy();
        expect(input.type).toEqual('text');
        expect(typeof input.type).toEqual("string");
    });

    it('should have value prop', () => {
        const {getByTestId} = render(<Input value="test"/>);
        const input = getByTestId("input");

        expect(input.value).toBeTruthy();
        expect(input).toHaveProperty("value");
        expect(input.value).toEqual("test");
    });
})

