import {Publisher, UserUpdatedEvent, Subjects} from '@nasddatax/common';


export class UserUpdatedPublisher extends Publisher<UserUpdatedEvent> {
  subject: Subjects.UserUpdated = Subjects.UserUpdated;
}
