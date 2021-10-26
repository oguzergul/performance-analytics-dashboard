import {render, cleanup} from "@testing-library/react";
import {Button} from "../components";

afterEach(cleanup)

describe("Button Component", () => {
    it('should rendered button', function () {
        const {getByTestId} = render(<Button/>);
        const button = getByTestId("button");
        expect(button).toBeTruthy();
    });

    it('should have label', function () {
        const {getByTestId} = render(<Button name="test me"/>);
        expect(getByTestId('button')).toHaveTextContent('test me');
    });
})

