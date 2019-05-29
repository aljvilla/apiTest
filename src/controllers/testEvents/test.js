import { commonEmitter } from '../../helpers/EmitterClass';

export default (req, res) => {
  commonEmitter.emit('testEvent', { success: true });
  return res.json({ success: true });
};
