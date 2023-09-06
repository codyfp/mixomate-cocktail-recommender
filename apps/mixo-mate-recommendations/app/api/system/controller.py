from flask_restx import Namespace, Resource

from app.utils import ok_resp

api = Namespace("system", description="System monitoring")

@api.route("/")
class System(Resource):
    def get(self):
        return ok_resp({ "healthy": True }, 200)
