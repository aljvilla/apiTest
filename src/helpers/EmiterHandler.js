import { commonEmitter } from './EmitterClass';
commonEmitter.on('testEvent', (data) => {
  console.log('an event occurred!', data);
});