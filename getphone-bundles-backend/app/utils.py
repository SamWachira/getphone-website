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
    Validate that a normalized mobile number meets Hormuud's format.

    Rules:
    - Exactly 9 digits
    - Must not start with 0
    """
    return bool(re.fullmatch(r"[1-9][0-9]{8}", number))
