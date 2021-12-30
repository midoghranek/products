import categories from "../../pages/api/categories";
import { createMocks } from "node-mocks-http";

describe("/api/categories", () => {
  test("Get Products API", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });
    await categories(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().length).toBeGreaterThan(0);
  });
});
