const CANADIAN_AREA_CODES = new Set([
  "204","226","236","249","250","263","289",
  "306","343","354","365","367","368","382","387",
  "403","416","418","428","431","437","438","450","460","468","474",
  "506","514","519","548","579","581","584","587",
  "604","613","639","672","683",
  "705","709","742","753","778","780","782",
  "807","819","825","867","873","879",
  "902","905",
]);

export function isValidCanadianPhone(input) {
  const digits = String(input || "").replace(/\D/g, "");
  const national =
    digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (national.length !== 10) return false;
  const area = national.slice(0, 3);
  const exchange = national.slice(3, 6);
  if (!/^[2-9]/.test(area) || !/^[2-9]/.test(exchange)) return false;
  return CANADIAN_AREA_CODES.has(area);
}