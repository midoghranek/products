import "@testing-library/jest-dom/extend-expect";
jest.mock("next/dist/client/router", () => require("next-router-mock"));

import AbortController from "abort-controller";
import { fetch, Headers, Request, Response } from "cross-fetch";

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;
global.AbortController = AbortController;
