export default function (link) {
  return /^http+s?/.test(link) ? link : `https://${link}`;
}
