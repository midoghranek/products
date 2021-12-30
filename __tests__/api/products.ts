import products from "../../pages/api/products";
import { createMocks } from "node-mocks-http";

describe("/api/products", () => {
  test("Get Products API", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });
    await products(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().length).toBeGreaterThan(0);
  });
});
