export function getFriendCount(list) {
  if (!list) {
    return -1;
  }

  return list.length;
}

export function removeFriend(list, uid) {
  if (!list) {
    return [];
  }

  return list
    .filter(item => item.uid !== uid);
}

export function getFriendNames(list) {
  if (!list) {
    return [];
  }

  return list.map(item => item.name);
}