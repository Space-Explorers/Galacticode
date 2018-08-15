function isPalindrome(string) {
  if (string.length <= 1) {
    return true;
  } else if (string[0].toLowerCase() === string[string.length-1].toLowerCase()) {
    return isPalindrome(string.slice(1, string.length-1));
  } else {
    return false;
  }
}
