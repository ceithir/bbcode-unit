const convert = require("./converter");

test("non-sensical entries are returned as is", () => {
  expect(convert("1000efhkfuef")).toBe("1000efhkfuef");
});

describe("height", () => {
  it("converts cm into imperial", () => {
    expect(convert("160cm")).toBe(`5' 3"`);
    expect(convert("210 cm")).toBe(`6' 11"`);
  });
  it("converts imperial into cm", () => {
    expect(convert(`5' 3"`)).toBe("160cm");
    expect(convert(`6'11"`)).toBe("211cm");
  });
  it("converts m into imperial", () => {
    expect(convert("1.60m")).toBe(`5' 3"`);
    expect(convert("2.10 m")).toBe(`6' 11"`);
  });
});
