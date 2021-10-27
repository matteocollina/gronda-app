import { render, screen } from "@testing-library/react";
import { getRandomColor } from "../utils";

describe("Utils", () => {

  describe("getRandomColor", () => {
    it("is hexidecimal color", () => {
      expect(getRandomColor()[0]).toEqual("#")
    });

    it("has 6 digits", () => {
        expect(getRandomColor().substring(1).length).toEqual(6)
    });


  })

});