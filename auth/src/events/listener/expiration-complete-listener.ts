import {
  Listener,
  Subjects,
 ExirationCompleteEvent,
  PremiumStatus
} from '@nasddatax/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { User } from '../../models/users';


export class ExpirationCompleteListener extends Listener<ExirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete
  queueGroupName = queueGroupName

  async onMessage(data:ExirationCompleteEvent['data'], msg: Message ) {
    const user = await User.findById(data.userId);

    if (!user) {
      throw new Error('User not found')
    }

    // if(user.status === PremiumStatus.FreePackage  ){
      user.set({
        status: PremiumStatus.FreePackage
      });
    //}

    

    await user.save();

    msg.ack();

  }
}
