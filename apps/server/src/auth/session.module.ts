import { Module } from "@nestjs/common";
import { SessionsService } from "./session.service.js";

@Module({
    providers: [SessionsService],
    exports: [SessionsService]
})
export class SessionModule {}