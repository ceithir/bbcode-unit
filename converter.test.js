const convert = require("./converter");

test("non-sensical entries are returned as is", () => {
  expect(convert("1000efhkfuef")).toBe("1000efhkfuef");
});

test("values are trimmed", () => {
  expect(convert("  160cm   ")).toBe(`5' 3"`);
});

describe("height", () => {
  it("converts cm into imperial", () => {
    expect(convert("160cm")).toBe(`5' 3"`);
    expect(convert("210 cm")).toBe(`6' 11"`);
  });
  it("converts imperial into cm", () => {
    expect(convert(`5' 3"`)).toBe("160 cm");
    expect(convert(`6'11"`)).toBe("211 cm");
  });
  it("converts m into imperial", () => {
    expect(convert("1.60m")).toBe(`5' 3"`);
    expect(convert("2.10 m")).toBe(`6' 11"`);
  });
  it("converts weirdly formatted m into imperial", () => {
    expect(convert("1m60")).toBe(`5' 3"`);
    expect(convert("2m 10")).toBe(`6' 11"`);
    expect(convert("1m")).toBe(`3' 3"`);
  });
  it("converts weirdly formatted inches into cm", () => {
    expect(convert(`5' 3`)).toBe("160 cm");
  });
});

describe("temperature", () => {
  it("converts Celsius into Fahrenheit", () => {
    expect(convert("29° C")).toBe("84.20°F");
    expect(convert("18 °C")).toBe("64.40°F");
    expect(convert("36.5°C")).toBe("97.70°F");
  });
  it("converts Fahrenheit into Celsius", () => {
    expect(convert("85° F")).toBe("29.44°C");
    expect(convert("65 °F")).toBe("18.33°C");
    expect(convert("97.7°F")).toBe("36.50°C");
  });
  it("can do without the degree symbol", () => {
    expect(convert("85F")).toBe("29.44°C");
    expect(convert("18C")).toBe("64.40°F");
  });
});
