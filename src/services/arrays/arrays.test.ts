import { getArrayOfNumbers, splitRange } from "./index";

describe("service/arrays", () => {
  describe("getArrayOfNumbers()", () => {
    it("from 1 to 3 is [1,2,3]", () => {
      const arr = getArrayOfNumbers(1, 3);
      expect(arr.length).toBe(3);
      for (let i = 0; i < 3; i++) {
        expect(arr[i]).toBe(i + 1);
      }
    });
  });

  describe("splitRange()", () => {
    it("without delimiter", () => {
      const start = 1;
      const end = 5;

      const { firstPart, secondPart, hasDelimiter } = splitRange({
        start,
        end,
        maxCount: 3,
        current: 1,
      });
      expect(hasDelimiter).toBeFalsy();
      expect(firstPart[0]).toBe(start);
      expect(firstPart[firstPart.length - 1]).toBe(end);
      expect(secondPart.length).toBe(0);
    });

    it("with delimiter, a range in the first part", () => {
      const start = 1;
      const end = 6;
      const maxCount = 3;
      const { firstPart, secondPart, hasDelimiter } = splitRange({
        start,
        end,
        maxCount,
        current: 2,
      });
      expect(hasDelimiter).toBeTruthy();
      expect(firstPart.length).toBe(maxCount);
      expect(secondPart[0]).toBe(end);
      expect(secondPart.length).toBe(1);
    });

    it("with delimiter, a range in the second part", () => {
      const start = 1;
      const end = 6;
      const maxCount = 3;
      const current = 4;
      const { firstPart, secondPart, hasDelimiter } = splitRange({
        start,
        end,
        maxCount,
        current,
      });
      expect(hasDelimiter).toBeTruthy();
      expect(firstPart[0]).toBe(current - maxCount + 2);
      expect(firstPart.length).toBe(maxCount);
      expect(secondPart[0]).toBe(end);
      expect(secondPart.length).toBe(1);
    });

    it("with delimiter, shifting a first part", () => {
      const start = 1;
      const end = 20;
      const maxCount = 3;
      const current = 5;
      const { firstPart, secondPart, hasDelimiter } = splitRange({
        start,
        end,
        maxCount,
        current,
      });
      expect(hasDelimiter).toBeTruthy();
      expect(firstPart[0]).toBe(current - maxCount + 2);
      expect(firstPart.length).toBe(maxCount);
      expect(secondPart[0]).toBe(end);
      expect(secondPart.length).toBe(1);
    });
  });
});
