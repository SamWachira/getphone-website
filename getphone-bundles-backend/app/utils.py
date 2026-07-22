import re


def normalize_mobile_number(raw_number: str) -> str:
    """
    Normalize a mobile number to the format Hormuud expects.

    Strips whitespace, dashes, plus signs, and the 252 country code prefix.
    Returns a clean local-format number like '610000000'.
    """
    number = raw_number.strip().replace(" ", "").replace("-", "").replace("+", "")

    # Strip Somalia country code if present (e.g., 252610000000 -> 610000000)
    if number.startswith("252") and len(number) > 9:
        number = number[3:]

    # Strip leading zero if present (e.g., 0610000000 -> 610000000)
    if number.startswith("0") and len(number) == 10:
        number = number[1:]

    return number


def is_valid_mobile_number(number: str) -> bool:
    """
    Validate that a normalized mobile number is a valid Hormuud (61, 77) or Somnet (68) MSISDN.

    Rules:
    - Exactly 9 digits
    - Starts with 61, 77 (Hormuud) or 68 (Somnet)
    """
    return bool(re.fullmatch(r"^(61|77|68)[0-9]{7}$", number))


def resolve_network(number: str) -> str:
    """
    Resolve the network carrier from a normalized 9-digit MSISDN.

    - 61, 77 -> 'hormuud'
    - 68 -> 'somnet'
    """
    normalized = normalize_mobile_number(number)
    if normalized.startswith("61") or normalized.startswith("77"):
        return "hormuud"
    elif normalized.startswith("68"):
        return "somnet"
    return "unknown"
