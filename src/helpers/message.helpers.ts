import { RawData } from "ws";
import { LoginUser, LoginUserAnswer } from "../interface/msgFrom.interface";

export function parseMessage(rawData: RawData): LoginUser | undefined {
  try {
    // Parse the initial JSON string
    const parsedData = JSON.parse(
      typeof rawData === "string" ? rawData : rawData.toString()
    );

    if (parsedData.data && typeof parsedData.data === "string") {
      parsedData.data = JSON.parse(parsedData.data);
    }

    console.log("Parsed data:", parsedData);
    return parsedData;
  } catch (error) {
    console.error("Error parsing data:", error);
  }
}

export function stringifyMessage(
  dataToSend: LoginUserAnswer["data"],
  regData: { type: string; id: number; data: string }
): string | undefined {
  try {
    // Parse the initial JSON string
    const strMainData = JSON.stringify(dataToSend);
    regData.data = strMainData;

    return JSON.stringify(regData);
  } catch (error) {
    console.error("Error parsing data:", error);
  }
}
