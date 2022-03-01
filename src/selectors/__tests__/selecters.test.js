const { getFriendCount, removeFriend, getFriendNames } = require("selectors/helpers");

const data = [
  { name: "Betty White", uid: "1" },
  { name: "Freddy Mercury", uid: "2" },
  { name: "James Holden", uid: "3" },
  { name: "Tom Cruise", uid: "4" },
];

describe('Selector tests', () => {

  test("returns count of friends", () => {
    const count = getFriendCount(data);

    expect(count).toBe(4);
  });

  it("get correct friends names", () => {
    const names = getFriendNames(data);
    expect(names).toContain("Betty White");
  });

  it("removes unwanted friends", () => {
    const tom = { name: "Tom Cruise", uid: "4" };
    expect(data).toContainEqual(tom);

    const bestFriends = removeFriend(data, "4");
    expect(bestFriends.length).toBe(3);

    expect(bestFriends).not.toContainEqual(tom);
  });

});
