/**
 *  Accordion content type definition
 */
export interface AccordionContentItem {
  title: string;
  text: string;
  mediaUrl?: string;
}

export interface AccordionContent {
  elements: AccordionContentItem[]
}


/**
 *  Carousel content type definition
 */
export interface CarouselContentItem {
  title: string;
  text: string;
  mediaUrl?: string;
}

export interface CarouselContent {
  elements: CarouselContentItem[]
}
