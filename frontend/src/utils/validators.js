export function validateNote(e) {
  if (e.target.value.length === 0) return true;
  const regex = /[!"#$%&/()=?¿¡]/g;
  if (regex.test(e.target.value)) {
    e.target.value = e.target.value.slice(0, -1);
    return false;
  }

  return true;
}
