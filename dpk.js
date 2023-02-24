const crypto = require('crypto');

const TRIVIAL_PARTITION_KEY = '0';
const MAX_PARTITION_KEY_LENGTH = 256;

const createDigestibleHash = (data) => {
  return crypto.createHash('sha3-512').update(data).digest('hex');
}

exports.deterministicPartitionKey = (event) => {
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = createDigestibleHash(data)
    }
  }
  candidate = typeof candidate !== 'string' ? JSON.stringify(candidate) : candidate;
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createDigestibleHash(candidate)
  }
  return candidate;
};
