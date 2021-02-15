import { Subjects, Publisher, ExirationCompleteEvent } from '@nasddatax/common';


export class ExiprationCompletePublisher extends Publisher<ExirationCompleteEvent>{
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}