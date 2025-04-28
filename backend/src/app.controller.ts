import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { Public } from "src/common/decorators";

@Controller("/")
export class AppController {
  @Get()
  @Public()
  greeting(@Res() res: Response) {
    res.setHeader("Content-Type", "text/html");
    res.send(
      `<html><body  style="display: flex; flex-direction:column; justify-content: center; align-items: center; height: 100vh; margin: 0; gap:20px">
      <h1>Welcome to Company Dashboard App server!</h1>
      <a href='/api'>API Documentation</a>
      </body></html>`
    );
  }
}
