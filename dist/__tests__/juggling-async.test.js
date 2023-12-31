"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const juggling_async_main_1 = require("../juggling-async-main");
const http_1 = __importDefault(require("http"));
jest.mock("http", () => ({
    get: jest.fn(),
}));
describe("fetchData", () => {
    beforeEach(() => {
        http_1.default.get.mockImplementation((url, callback) => {
            //mockImplementation jest method that is used to define a personalized implmentation to a mock function
            const mockResponse = {
                on: jest.fn((event, handler) => {
                    if (event === "data") {
                        handler("some data"); // Simulates receiving some data
                    }
                    if (event === "end") {
                        handler(); // Simulates the end of the data reception
                    }
                }),
            };
            callback(mockResponse);
            return { on: jest.fn() }; // Returnting an object with property on. its value is a jest mock function
        });
    });
    it("should accumulate data from multiple URLs", () => __awaiter(void 0, void 0, void 0, function* () {
        const urls = ["http://example.com/1", "http://example.com/2"];
        const data = yield (0, juggling_async_main_1.fetchData)(urls);
        expect(data).toEqual(["some data", "some data"]);
    }));
    it("should handle errors in HTTP requests", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockNetworkError = new Error("Test network error");
        http_1.default.get.mockImplementationOnce(() => {
            const mockRequest = {
                on: jest.fn((event, callback) => {
                    if (event === "error") {
                        callback(mockNetworkError);
                    }
                }),
            };
            return mockRequest;
        });
        const urls = ["http://example.com/1"];
        yield expect((0, juggling_async_main_1.fetchData)(urls)).rejects.toThrow("Test network error");
    }));
    it("should handle errors in HTTP response", () => __awaiter(void 0, void 0, void 0, function* () {
        http_1.default.get.mockImplementationOnce((url, callback) => {
            const mockResponse = {
                on: jest.fn((event, handler) => {
                    if (event === "error") {
                        handler(new Error("Response error")); // Simulate an error as a response to HTTP
                    }
                }),
            };
            callback(mockResponse);
            return { on: jest.fn() };
        });
        const urls = ["http://example.com/1"];
        yield expect((0, juggling_async_main_1.fetchData)(urls)).rejects.toThrow("Response error");
    }));
});
