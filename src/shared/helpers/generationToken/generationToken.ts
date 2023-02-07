function resetCode(min = 10000, max = 99999) {
  return Math.floor(Math.random() * max) + min;
}

function generationHashCode(code: string) {
  return String(
    code.split('').reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0)
  );
}

function getToken() {
  return generationHashCode(String(resetCode(1000000, 9999999)));
}

export { resetCode, getToken };
