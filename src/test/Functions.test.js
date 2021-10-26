import {parseDates} from "../helpers/date";

it('should return parsed date', () => {
    const date = "2021-10-01T09:05";
    expect(parseDates(date)).toBe('10/01/2021');
});

