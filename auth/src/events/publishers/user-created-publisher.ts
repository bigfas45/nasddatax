import {Publisher, UserCreatedEvent, Subjects} from '@nasddatax/common';


export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}
