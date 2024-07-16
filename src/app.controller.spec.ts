import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "./app.module";
import { AppService } from "./app.service";

describe("AppModule", () => {
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it("should be defined", () => {
    expect(app).toBeDefined();
  });

  describe("AppService", () => {
    let appService: AppService;

    beforeEach(() => {
      appService = app.get<AppService>(AppService);
    });

    it("should be defined", () => {
      expect(appService).toBeDefined();
    });

    it("should return a welcome message", () => {
      expect(appService.getHello()).toBeTruthy();
    });
  });
});
