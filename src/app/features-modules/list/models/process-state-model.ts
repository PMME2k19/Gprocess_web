import { ProcessModel } from "./process-model";
import { ProcessResumeModel } from "./process-resume-model";

export class ProcessStateModel {
    processes: ProcessModel [] = [];
    resume: ProcessResumeModel [] = [];
}
