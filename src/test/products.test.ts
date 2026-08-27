import { describe, it, expect } from "vitest";
import { allProducts, productCategories } from "@/data/products";
import { COMPANY } from "@/data/company";

describe("Waris Brother Enterprises Product Catalog", () => {
  it("should have at least 69 products across 9 categories", () => {
    expect(allProducts.length).toBeGreaterThanOrEqual(69);
    expect(productCategories.length).toBe(9);
  });

  it("every product should have valid images, origin, grade, and specifications", () => {
    allProducts.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.image).toMatch(/^\/products\/items\/[a-z0-9-]+\.jpg$/);
      expect(p.origin).toBeTruthy();
      expect(p.grade).toBeTruthy();
      expect(p.form).toBeTruthy();
      expect(p.packaging).toBeTruthy();
      expect(p.description).toBeTruthy();
    });
  });

  it("every category should map correctly to its products", () => {
    productCategories.forEach((cat) => {
      expect(cat.products.length).toBeGreaterThan(0);
      cat.products.forEach((p) => {
        expect(p.category).toBe(cat.name);
      });
    });
  });

  it("company metadata should reflect Crystal Industries and APMC Market Vashi", () => {
    expect(COMPANY.name).toBe("Crystal Industries");
    expect(COMPANY.phone).toBe("+91 91572 91922");
    expect(COMPANY.address).toContain("APMC Market, Vashi, Navi Mumbai");
  });
});
