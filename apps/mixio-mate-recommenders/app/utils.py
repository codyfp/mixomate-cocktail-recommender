def ok_resp(body, code):
    return body, code

def err_resp(msg, reason, code):
    err = message(False, msg)
    err["error_reason"] = reason
    return err, code


def internal_err_resp():
    err = message(False, "Something went wrong during the process!")
    err["error_reason"] = "server_error"
    return err, 500
