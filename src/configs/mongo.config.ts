import { ConfigService } from "@nestjs/config";
import { TypegooseModuleOptions } from "nestjs-typegoose";

export async function getMongoConfig(
  configService: ConfigService
): Promise<TypegooseModuleOptions> {
  return {
    uri: getDbConnectionString(configService),
    ...getMongoOptions(),
  };
}

function getDbConnectionString(configService: ConfigService) {
  return (
    "mongodb://" +
    `${configService.get("DB_USERNAME")}:${configService.get("DB_PASSWORD")}` +
    `@${configService.get("DB_HOST")}:${configService.get("DB_PORT")}` +
    `/${configService.get("MONGO_AUTH_DATABASE")}`
  );
}

function getMongoOptions() {
  return {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };
}
