import Queue from 'bull';
import {ExiprationCompletePublisher} from '../events/publishers/expiration-complete-publisher';
import {natsWrapper} from '../nats-wrapper'

interface UserPayload {
  userId: string;
}

const UserexpirationQueue = new Queue<UserPayload>('user:expiration', {
  redis: {
    host: process.env.REDIS_HOST
  }
});
UserexpirationQueue.process(async job => {
  console.log("I want to piblish an expiration event", job.data.userId)
  new ExiprationCompletePublisher(natsWrapper.client).publish({
    userId: job.data.userId,
    
  })
});

export { UserexpirationQueue };
