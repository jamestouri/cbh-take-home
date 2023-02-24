const { deterministicPartitionKey } = require('./dpk');

describe('deterministicPartitionKey', () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe('0');
  });
});

describe('deterministicPartitionKey', () => {
  it('Returns the partitionKey when input is under 256 length', () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: 2552 });
    expect(trivialKey).toBe('2552');
  });
});

describe('deterministicPartitionKey', () => {
  it('Returns a digested value when input is over 256 length', () => {
    const partKey = '2'.repeat(270);
    const trivialKey = deterministicPartitionKey({ partitionKey: partKey });
    expect(trivialKey).toBe(
      'd80209879751f5c7f0c13c09c8b1d25352389621cab12f3a27792db0bf9513aeedcf1769697a449315eb86fa827b9ac95f9083f3c2d6455f01da3790f1d0b39c'
    );
  });
});

describe('deterministicPartitionKey', () => {
  it('Returns a digested value when input is over 256 length', () => {
    const trivialKey = deterministicPartitionKey({ notPartition: '2342342' });
    expect(trivialKey).toBe(
      '18683f04297abf5b640b5ba079fd6a443eec576edb71d605181abe33aa514226d2e0315286440d2cf8beb8ce9415e4eef087f07280e820810d9b61264e8fefc8'
    );
  });
});
