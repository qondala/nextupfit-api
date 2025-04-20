import { AccordionContent } from "../../types/program.activity-content.definition";

export class ActivityContentBuilder {

  obj: AccordionContent;

  constructor() {
    this.obj = {
      elements: []
    }
  }
  
  get(): AccordionContent {
    return this.obj;
  }
}
