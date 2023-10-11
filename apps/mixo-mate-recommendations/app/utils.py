def ok_resp(body, code):
    return body, code

def err_resp(msg, code):
    return msg, code

def internal_err_resp(error):
    msg = f"{type(error).__name__} - {error}"
    return msg, 500
