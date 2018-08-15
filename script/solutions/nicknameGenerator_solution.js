function nicknameGenerator(name) {
  var nickname = "";
  var vowels = "aeiou";

  if (vowels.indexOf(name[2]) >= 0) {
    nickname = name.slice(0,4);
  } else {
    nickname = name.slice(0,3);
  }

  return nickname;
}
