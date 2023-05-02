import { SharedMap } from './shared-map';

describe('SharedMap', () => {

  let map: SharedMap = SharedMap.getInstance();

  it('should be created', () => {
    expect(map).toBeTruthy();
  });

  describe('when try to put data inside the map', () => {

    const key = 'key';
    const data = { foo: 'bar' };
    const data2 = { foo: 'bar2' };
    const owner = 'john-doe';

    beforeAll(() => map = SharedMap.getInstance());

    it('should add data when missing', () => {
      expect(map.keys()).not.toContain(key);

      map.put(owner, key, data);

      expect(map.keys()).toContain(key);
      expect(map.get(key)).toBeDefined();
      expect(map.owned(owner).size).toEqual(1);
      expect(map.get(key)).toEqual(expect.objectContaining(data));
    });

    it('should update data when already present', () => {
      expect(map.keys().size).toEqual(1);
      expect(map.owned(owner).keys()).toContain(key);
      expect(map.get(key)).toEqual(expect.objectContaining(data));

      map.put(owner, key, data2);

      expect(map.get(key)).toBeDefined();
      expect(map.owned(owner).size).toEqual(1);
      expect(map.get(key)).toEqual(expect.objectContaining(data2));
    });

    it('should throw an error if ownership is violated', () => {
      const anotherOwner = 'buffalo-bill';
      expect(map.keys()).toContain(key);

      expect(() => map.put(anotherOwner, key, data))
        .toThrowError(`Key "${key}" already present: user "${anotherOwner}" is not allowed to edit someone else's data`);
    });
  });

  describe('when try to delete data from the map', () => {

    const key = 'key';
    const key2 = 'key2';
    const data = { foo: 'bar' };
    const data2 = { foo: 'bar2' };
    const owner = 'john-doe';

    beforeAll(() => {
      map = SharedMap.getInstance();
      map.put(owner, key, data);
      map.put(owner, key2, data2);
    });

    it('should delete data when present', () => {
      expect(map.keys().size).toEqual(2);
      expect(map.keys()).toContain(key);

      const deleted = map.delete(owner, key);

      expect(deleted).toBeTruthy();
      expect(map.keys()).not.toContain(key);
      expect(map.owned(owner).get(key)).not.toBeDefined();
      expect(map.all().get(key)).not.toBeDefined();
    });

    it('should returb false if data is not present', () => {
      expect(map.keys().size).toEqual(1);
      expect(map.owned(owner).keys()).toContain(key2);
      expect(map.get(key2)).toEqual(expect.objectContaining(data2));

      const deleted = map.delete(owner, 'key3');

      expect(deleted).toBeFalsy();
      expect(map.get(key2)).toBeDefined();
      expect(map.owned(owner).size).toEqual(1);
      expect(map.get(key2)).toEqual(expect.objectContaining(data2));
    });

    it('should throw an error if ownership is violated', () => {
      const anotherOwner = 'buffalo-bill';
      expect(map.keys()).toContain(key2);

      expect(() => map.delete(anotherOwner, key2))
        .toThrowError(`Unable to delete data for key "${key2}": user "${anotherOwner}" is not allowed to delete someone else's data`);
    });
  });
});
