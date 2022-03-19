import { eventDefinition } from "./EventDefinition";
import { resultSwimmerData } from "./ResultSwimmerData";

export interface ResultDataInterface {
    eventDefinition: eventDefinition;
    swimmerResults: resultSwimmerData[];
}

